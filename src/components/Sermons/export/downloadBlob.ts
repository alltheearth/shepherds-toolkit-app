export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function sanitizeFilename(name: string): string {
  return (name || 'sermao').trim().replace(/[^\w\-]+/g, '_').replace(/_+/g, '_');
}
