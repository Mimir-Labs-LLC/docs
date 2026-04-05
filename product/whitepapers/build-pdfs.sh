#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# Mimir Labs Whitepaper PDF Generator
# Converts all .md whitepapers to branded PDFs via pandoc + XeLaTeX
#
# Usage:
#   ./build-pdfs.sh              # Build all whitepapers
#   ./build-pdfs.sh 00 03 08    # Build specific papers by prefix
# ═══════════════════════════════════════════════════════════════════
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/pdf"
TEMPLATE="$SCRIPT_DIR/template.tex"

mkdir -p "$OUT_DIR"

# Determine which files to build
if [ $# -gt 0 ]; then
    FILES=()
    for prefix in "$@"; do
        match="$SCRIPT_DIR/${prefix}"-*.md
        # shellcheck disable=SC2086
        for f in $match; do
            [ -f "$f" ] && FILES+=("$f")
        done
    done
else
    FILES=("$SCRIPT_DIR"/[0-9][0-9]-*.md)
fi

if [ ${#FILES[@]} -eq 0 ]; then
    echo "No matching whitepaper files found."
    exit 1
fi

echo "Building ${#FILES[@]} whitepapers..."
echo ""

FAILURES=0
for md in "${FILES[@]}"; do
    base="$(basename "$md" .md)"
    pdf="$OUT_DIR/${base}.pdf"
    echo -n "  $base ... "

    if pandoc "$md" \
        --template="$TEMPLATE" \
        --pdf-engine=xelatex \
        --resource-path="$SCRIPT_DIR" \
        --from=markdown+yaml_metadata_block+pipe_tables+fenced_code_blocks+backtick_code_blocks+auto_identifiers+strikeout+raw_tex \
        --variable=linkcolor:mlaccent \
        --highlight-style=tango \
        --output="$pdf" 2>/dev/null; then
        echo "OK"
    else
        echo "FAILED"
        ((FAILURES++)) || true
    fi
done

echo ""
if [ $FAILURES -eq 0 ]; then
    echo "All PDFs generated in: $OUT_DIR/"
else
    echo "$FAILURES file(s) failed. Check errors above."
fi
