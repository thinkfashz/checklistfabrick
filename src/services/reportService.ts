import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Project, Phase, Post } from '../types';

// Extend jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const reportService = {
  generateProjectReport: (project: Project | null, phases: Phase[], recentPosts: Post[], area: number, totalEstimatedCost: number) => {
    if (!project) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- Header ---
    doc.setFillColor(20, 20, 20); // Dark background
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(250, 204, 21); // Fabrick Yellow
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CASAS FABRIS', 15, 20);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('REPORTE DE ESTADO DE PROYECTO', 15, 30);
    doc.text(new Date().toLocaleDateString(), pageWidth - 40, 30);

    // --- Project Info ---
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(18);
    doc.text(project.name.toUpperCase(), 15, 55);
    
    doc.setDrawColor(250, 204, 21);
    doc.setLineWidth(1);
    doc.line(15, 60, 60, 60);

    // Summary Grid
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PROGRESO GENERAL:', 15, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(`${project.progress}%`, 60, 75);

    doc.setFont('helvetica', 'bold');
    doc.text('FASE ACTUAL:', 15, 82);
    doc.setFont('helvetica', 'normal');
    doc.text(project.activePhase, 60, 82);

    doc.setFont('helvetica', 'bold');
    doc.text('DÍAS PARA ENTREGA:', 15, 89);
    doc.setFont('helvetica', 'normal');
    doc.text(project.deliveryCountdown.toString(), 60, 89);

    doc.setFont('helvetica', 'bold');
    doc.text('ÚLTIMA ACTUALIZACIÓN:', 15, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(project.lastUpdated, 60, 96);

    // --- Budget Section ---
    doc.setFillColor(245, 245, 245);
    doc.rect(15, 105, pageWidth - 30, 25, 'F');
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PRESUPUESTO ESTIMADO', 20, 115);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Superficie: ${area} m2`, 20, 122);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${totalEstimatedCost.toLocaleString('es-CL')} CLP`, pageWidth - 80, 122);

    // --- Phases Table ---
    doc.setFontSize(14);
    doc.text('FASES DE CONSTRUCCIÓN', 15, 145);
    
    const phaseData = phases.map(p => [
      p.name,
      p.status.toUpperCase(),
      `${p.progress}%`
    ]);

    doc.autoTable({
      startY: 150,
      head: [['Fase', 'Estado', 'Progreso']],
      body: phaseData,
      headStyles: { fillColor: [250, 204, 21], textColor: [20, 20, 20] },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      margin: { left: 15, right: 15 }
    });

    // --- Recent Activity ---
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('ACTIVIDAD RECIENTE', 15, finalY);

    const postData = recentPosts.slice(0, 5).map(p => [
      p.authorName,
      p.authorRole,
      p.content,
      new Date(p.timestamp).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: finalY + 5,
      head: [['Autor', 'Rol', 'Contenido', 'Fecha']],
      body: postData,
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
      columnStyles: {
        2: { cellWidth: 80 }
      },
      margin: { left: 15, right: 15 }
    });

    // --- Footer ---
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Casas Fabris - Reporte Generado Automáticamente - Página ${i} de ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save(`Reporte_CasasFabris_${project.name.replace(/\s+/g, '_')}.pdf`);
  }
};
