// Utility to export data as CSV
export function exportToCSV(filename: string, rows: any[][], header?: string[]) {
  const csvContent =
    (header ? header.join(",") + "\n" : "") +
    rows.map((r: any[]) => r.map((v: any) => '"' + String(v).replace(/"/g, '""') + '"').join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Utility to export data as PDF (simple table)
export function exportToPDF(filename: string, rows: any[][], header?: string[]) {
  // Dynamically import jsPDF for code splitting
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF();
    let y = 20;
    if (header) {
      header.forEach((h: string, i: number) => doc.text(h, 10 + i * 40, y));
      y += 10;
    }
    rows.forEach((row: any[]) => {
      row.forEach((cell: any, i: number) => doc.text(String(cell), 10 + i * 40, y));
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save(filename);
  });
}
