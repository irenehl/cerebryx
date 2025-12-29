'use client'

import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'

if (typeof window !== 'undefined' && 'Worker' in window) {
  GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString()
}

/**
 * Normalizes extracted text by cleaning up whitespace and formatting issues
 * and improving structure for better readability
 */
function normalizeExtractedText(raw: string): string {
  let text = raw
    .replace(/\u00a0/g, ' ') // Replace non-breaking spaces with regular spaces
    .replace(/[ \t]+/g, ' ') // Collapse multiple spaces/tabs into single space
    .trim()

  // Split into lines for processing
  const lines = text.split('\n')
  const processedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    // Skip empty lines (we'll add them strategically)
    if (!line) {
      // Only add empty line if previous line wasn't empty
      if (
        processedLines.length > 0 &&
        processedLines[processedLines.length - 1] !== ''
      ) {
        processedLines.push('')
      }
      continue
    }

    // Detect headers (lines that are short, all caps, or end with colons)
    const isHeader =
      (line.length < 80 &&
        /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s:]+$/.test(line)) ||
      (line.length < 60 && /^[A-ZÁÉÍÓÚÑ][^.!?]*:$/.test(line)) ||
      /^(PARTE|PART|CHAPTER|CAPÍTULO|SECCIÓN|SECTION)\s+\d+/i.test(line)

    // Detect code blocks (lines starting with common code patterns)
    const looksLikeCode =
      /^\s*(const|let|var|function|import|export|curl|```|require\(|await|async)/i.test(
        line
      ) || (/[{}();=]/.test(line) && line.length < 150)

    // Detect URLs
    const urlMatch = line.match(/https?:\/\/[^\s]+/)
    const hasUrl = !!urlMatch
    const isStandaloneUrl = hasUrl && urlMatch && urlMatch[0] === line

    // Normalize bullet points
    line = line.replace(/^[•◦·]\s*/, '- ').replace(/^\s*[-•◦·]\s*/, '- ')

    // Check if this is a bullet point
    const isBullet = /^-\s/.test(line)

    // Handle headers - add spacing before and after them
    if (isHeader) {
      // Add blank line before header if previous line wasn't empty
      if (
        processedLines.length > 0 &&
        processedLines[processedLines.length - 1] !== ''
      ) {
        processedLines.push('')
      }
      processedLines.push(line)
      // Add blank line after header
      processedLines.push('')
      continue
    }

    // Handle standalone URLs - put them on their own lines
    if (isStandaloneUrl) {
      if (
        processedLines.length > 0 &&
        processedLines[processedLines.length - 1] !== ''
      ) {
        processedLines.push('')
      }
      processedLines.push(line)
      processedLines.push('')
      continue
    }

    // Handle bullet lists - ensure proper spacing
    if (isBullet) {
      // Add blank line before bullet lists if previous line wasn't a bullet or empty
      if (
        processedLines.length > 0 &&
        !/^-\s/.test(processedLines[processedLines.length - 1]) &&
        processedLines[processedLines.length - 1] !== ''
      ) {
        processedLines.push('')
      }
      processedLines.push(line)
      continue
    }

    // Handle code-like content - add spacing before code blocks
    if (looksLikeCode) {
      const prevLine = processedLines[processedLines.length - 1]
      // Add spacing before code if previous line wasn't code or empty
      if (prevLine && prevLine !== '') {
        const prevIsCode =
          /^\s*(const|let|var|function|import|export|curl|```|require\(|await|async)/i.test(
            prevLine
          ) || /[{}();=]/.test(prevLine)
        if (!prevIsCode) {
          processedLines.push('')
        }
      }
      processedLines.push(line)
      // Check if next line is also code, if not add spacing after
      const nextLine = lines[i + 1]?.trim()
      if (nextLine) {
        const nextIsCode =
          /^\s*(const|let|var|function|import|export|curl|```|require\(|await|async)/i.test(
            nextLine
          ) || /[{}();=]/.test(nextLine)
        if (!nextIsCode && !isHeader) {
          processedLines.push('')
        }
      }
      continue
    }

    // Regular content - just add it
    processedLines.push(line)
  }

  // Join lines and clean up excessive blank lines
  text = processedLines
    .join('\n')
    .replace(/\n{4,}/g, '\n\n\n') // Max 2 blank lines
    .replace(/\n{3,}/g, '\n\n') // Max 1 blank line
    .trim()

  return text
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()

    const pdf = await getDocument({
      data: arrayBuffer,
      standardFontDataUrl: '/pdfjs_standard_fonts/',
    }).promise

    let fullText = ''

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent({
        normalizeWhitespace: true,
      })

      let pageText = ''
      for (const item of textContent.items) {
        const textItem = item as { str?: string; hasEOL?: boolean }
        const str = textItem.str

        if (!str) continue

        pageText += str

        // Respect line breaks from PDF structure
        const hasEOL = textItem.hasEOL === true
        pageText += hasEOL ? '\n' : ' '
      }

      // Add spacing between pages
      fullText += pageText + '\n\n'
    }

    return normalizeExtractedText(fullText)
  } catch (error) {
    throw new Error(
      'Failed to extract text from PDF. Please try a different file.'
    )
  }
}
