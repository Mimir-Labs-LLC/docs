import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

/**
 * Generate a PDF from structured document data using PDFKit.
 * No browser dependency — pure Node.js PDF generation.
 */
export async function generatePdf(html, outputPath) {
  // PDFKit generates from structured calls, not HTML.
  // We'll parse the HTML into a simplified document and render it.
  // For now, render the HTML to PDF using the built-in text layout.
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    info: {
      Title: "Mimir Labs Agreement",
      Author: "Mimir Labs LLC",
      Creator: "Contract Builder",
    },
  });

  return new Promise((resolve, reject) => {
    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    // Parse simple HTML tags into PDF commands
    renderHtmlToPdf(doc, html);

    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

function renderHtmlToPdf(doc, html) {
  // Strip head/style/script, extract body content
  let body = html.replace(/[\s\S]*<body[^>]*>/i, "").replace(/<\/body>[\s\S]*/i, "");

  // Convert HTML entities
  body = body.replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#9745;/g, "\u2611")
    .replace(/&#9744;/g, "\u2610")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&copy;/g, "\u00A9")
    .replace(/&nbsp;/g, " ");

  // Split into blocks by major tags
  const blocks = body.split(/(<h1[^>]*>|<h2[^>]*>|<h3[^>]*>|<p[^>]*>|<table[^>]*>|<ul[^>]*>|<div class="sig-block">|<div class="footer">|<div class="meta">|<div class="parties">)/i);

  const NAVY = "#1B3A4B";
  const BLACK = "#1a1a1a";
  const GRAY = "#666666";

  let inTable = false;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const content = (blocks[i + 1] || "").replace(/<[^>]+>/g, "").trim();

    if (/<h1/i.test(block)) {
      doc.fontSize(16).fillColor(NAVY).font("Helvetica-Bold").text(content, { align: "center" });
      doc.moveDown(0.3);
      i++;
    } else if (/<h2/i.test(block)) {
      doc.moveDown(0.8);
      if (doc.y > 650) doc.addPage();
      doc.fontSize(12).fillColor(NAVY).font("Helvetica-Bold").text(content);
      doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor("#dddddd").stroke();
      doc.moveDown(0.3);
      i++;
    } else if (/<h3/i.test(block)) {
      doc.moveDown(0.4);
      doc.fontSize(10.5).fillColor("#333333").font("Helvetica-Bold").text(content);
      doc.moveDown(0.2);
      i++;
    } else if (/<div class="meta"/i.test(block)) {
      const metaText = (blocks[i + 1] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      doc.fontSize(9.5).fillColor(GRAY).font("Helvetica").text(metaText, { align: "center" });
      doc.moveDown(0.8);
      i++;
    } else if (/<div class="parties"/i.test(block)) {
      // Find the party text until next major section
      let partyHtml = "";
      let j = i + 1;
      while (j < blocks.length && !/<h[123]|<div class="(sig|footer)/i.test(blocks[j])) {
        partyHtml += blocks[j];
        j++;
      }
      // Extract party names and roles
      const partyLines = partyHtml.replace(/<[^>]+>/g, "\n").split("\n").map(s => s.trim()).filter(Boolean);
      doc.fontSize(10.5).fillColor(BLACK).font("Helvetica");
      for (const line of partyLines) {
        if (/Mimir Labs|LLC|Provider|Processor/i.test(line) && line.length < 60) {
          doc.font("Helvetica-Bold").text(line);
          doc.font("Helvetica");
        } else {
          doc.text(line);
        }
      }
      doc.moveDown(0.5);
      i = j - 1;
    } else if (/<p/i.test(block)) {
      const pText = (blocks[i + 1] || "").replace(/<strong>/gi, "").replace(/<\/strong>/gi, "")
        .replace(/<span class="caps">/gi, "").replace(/<\/span>/gi, "")
        .replace(/<em>/gi, "").replace(/<\/em>/gi, "")
        .replace(/<[^>]+>/g, "").trim();
      if (pText) {
        if (doc.y > 680) doc.addPage();
        doc.fontSize(10.5).fillColor(BLACK).font("Helvetica").text(pText, { lineGap: 2 });
        doc.moveDown(0.3);
      }
      i++;
    } else if (/<ul/i.test(block)) {
      let ulHtml = "";
      let j = i + 1;
      while (j < blocks.length && !/<\/ul>/i.test(ulHtml)) {
        ulHtml += blocks[j];
        j++;
      }
      const items = ulHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      doc.fontSize(10.5).fillColor(BLACK).font("Helvetica");
      for (const li of items) {
        const text = li.replace(/<[^>]+>/g, "").trim();
        if (text) {
          doc.text(`  \u2022  ${text}`, { indent: 12, lineGap: 1 });
        }
      }
      doc.moveDown(0.3);
      i = j - 1;
    } else if (/<table/i.test(block)) {
      // Collect table HTML
      let tableHtml = "";
      let j = i + 1;
      while (j < blocks.length && !/<\/table>/i.test(tableHtml)) {
        tableHtml += blocks[j];
        j++;
      }
      // Parse rows
      const rows = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
      if (rows.length > 0 && doc.y > 600) doc.addPage();

      doc.fontSize(9).fillColor(BLACK);
      let isHeader = true;
      for (const row of rows) {
        const cells = (row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [])
          .map(c => c.replace(/<[^>]+>/g, "").trim());
        if (cells.length === 0) continue;

        const y = doc.y;
        const colWidth = (504 / cells.length);

        if (isHeader && /<th/i.test(row)) {
          doc.rect(54, y, 504, 16).fill("#f5f7f9");
          doc.fillColor("#333333").font("Helvetica-Bold");
        } else {
          doc.fillColor(BLACK).font("Helvetica");
          isHeader = false;
        }

        cells.forEach((cell, ci) => {
          doc.text(cell, 58 + ci * colWidth, y + 3, { width: colWidth - 8, height: 14 });
        });

        doc.y = y + 18;
        doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor("#cccccc").lineWidth(0.5).stroke();
      }
      doc.moveDown(0.5);
      i = j - 1;
    } else if (/<div class="sig-block"/i.test(block)) {
      if (doc.y > 550) doc.addPage();
      doc.moveDown(1);
      doc.fontSize(12).fillColor(NAVY).font("Helvetica-Bold").text("SIGNATURES");
      doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor("#dddddd").stroke();
      doc.moveDown(1);

      // Provider side
      doc.fontSize(10).font("Helvetica-Bold").fillColor(BLACK).text("Mimir Labs LLC");
      doc.moveDown(1.5);
      doc.moveTo(54, doc.y).lineTo(280, doc.y).strokeColor("#333333").lineWidth(0.5).stroke();
      doc.moveDown(0.2);
      doc.fontSize(8).fillColor(GRAY).font("Helvetica").text("Signature");
      doc.moveDown(0.5);
      doc.text("Name: Christopher Gaither");
      doc.text("Title: Founder & CEO");
      doc.text("Date: _______________");

      doc.moveDown(1);

      // Client side
      doc.fontSize(10).font("Helvetica-Bold").fillColor(BLACK).text("Client");
      doc.moveDown(1.5);
      doc.moveTo(54, doc.y).lineTo(280, doc.y).strokeColor("#333333").lineWidth(0.5).stroke();
      doc.moveDown(0.2);
      doc.fontSize(8).fillColor(GRAY).font("Helvetica").text("Signature");
      doc.moveDown(0.5);
      doc.text("Name: _______________");
      doc.text("Title: _______________");
      doc.text("Date: _______________");

      // Skip rest of sig block
      let j = i + 1;
      while (j < blocks.length && !/<div class="footer"/i.test(blocks[j])) j++;
      i = j - 1;
    } else if (/<div class="footer"/i.test(block)) {
      const footerText = (blocks[i + 1] || "").replace(/<[^>]+>/g, "").trim();
      doc.moveDown(1);
      doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor("#dddddd").stroke();
      doc.moveDown(0.3);
      doc.fontSize(8).fillColor("#999999").font("Helvetica").text(footerText, { align: "center" });
      i++;
    }
  }
}
