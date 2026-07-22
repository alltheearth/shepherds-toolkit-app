import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { sanitizeFilename } from './downloadBlob';

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const RENDER_SCALE = 2;

export async function exportWritingToPdf(element: HTMLElement, title: string): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: RENDER_SCALE,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

  const imgWidthMm = PAGE_WIDTH_MM;
  const pxPerMm = canvas.width / PAGE_WIDTH_MM;
  const pageHeightPx = Math.floor(PAGE_HEIGHT_MM * pxPerMm);

  let renderedHeightPx = 0;
  let pageIndex = 0;

  while (renderedHeightPx < canvas.height) {
    const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedHeightPx);

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeightPx;
    const ctx = pageCanvas.getContext('2d');
    if (!ctx) break;
    ctx.drawImage(canvas, 0, renderedHeightPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

    const imgData = pageCanvas.toDataURL('image/png');
    const sliceHeightMm = (sliceHeightPx * imgWidthMm) / canvas.width;

    if (pageIndex > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, sliceHeightMm);

    renderedHeightPx += sliceHeightPx;
    pageIndex++;
  }

  pdf.save(`${sanitizeFilename(title)}.pdf`);
}
