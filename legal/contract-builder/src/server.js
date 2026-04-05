import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { execFile } from "child_process";
import { generatePdf } from "./pdf.js";
import { renderDocument } from "./render.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORT = 3333;

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static(join(ROOT, "public")));

// ── API: Generate preview HTML ───────────────────────────────
app.post("/api/preview", (req, res) => {
  try {
    const { documentType, fields } = req.body;
    const html = renderDocument(documentType, fields);
    res.json({ html });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── API: Generate PDF ────────────────────────────────────────
app.post("/api/generate-pdf", async (req, res) => {
  try {
    const { documentType, fields } = req.body;
    const html = renderDocument(documentType, fields);
    const outputDir = join(ROOT, "output");
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

    const timestamp = new Date().toISOString().slice(0, 10);
    const clientSlug = (fields.clientName || "client").replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const filename = `${documentType}_${clientSlug}_${timestamp}.pdf`;
    const outputPath = join(outputDir, filename);

    await generatePdf(html, outputPath);
    res.json({ path: outputPath, filename });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── API: Send to BoldSign ────────────────────────────────────
app.post("/api/send-boldsign", async (req, res) => {
  const { pdfPath, signerName, signerEmail, documentTitle } = req.body;
  const apiKey = process.env.BOLDSIGN_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: "BOLDSIGN_API_KEY not set. Set it in your environment." });
  }

  try {
    const FormData = (await import("form-data")).default;
    const fetch = (await import("node-fetch")).default;

    const form = new FormData();
    form.append("Title", documentTitle || "Mimir Labs Agreement");
    form.append("Signers[0][Name]", signerName);
    form.append("Signers[0][EmailAddress]", signerEmail);
    form.append("Signers[0][SignerType]", "Signer");
    form.append("Signers[0][SignerOrder]", "1");
    form.append("Files", readFileSync(pdfPath), {
      filename: pdfPath.split(/[\\/]/).pop(),
      contentType: "application/pdf",
    });

    const response = await fetch("https://api.boldsign.com/v1/document/send", {
      method: "POST",
      headers: { "X-API-KEY": apiKey, ...form.getHeaders() },
      body: form,
    });

    const result = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: result.error || result.message || "BoldSign API error" });
    }
    res.json({ documentId: result.documentId, message: "Sent for signature" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n  Contract Builder running at ${url}\n`);
  // Open browser — hardcoded URL, no user input
  if (process.platform === "win32") {
    execFile("cmd", ["/c", "start", url]);
  } else if (process.platform === "darwin") {
    execFile("open", [url]);
  } else {
    execFile("xdg-open", [url]);
  }
});
