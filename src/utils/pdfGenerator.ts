import jsPDF from 'jspdf';
import { TeachingPlan } from '../types';

export function generatePDF(plan: TeachingPlan) {
  const doc = new jsPDF();
  let y = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - 2 * margin;

  // Helper functions
  const addTitle = (text: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(text, margin, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  };

  const addField = (label: string, value: string) => {
    const lines = doc.splitTextToSize(`${label}: ${value}`, contentWidth);
    doc.text(lines, margin, y);
    y += lineHeight * lines.length;
  };

  const addSection = (title: string, content: string) => {
    checkPageBreak();
    addTitle(title);
    const lines = doc.splitTextToSize(content, contentWidth);
    doc.text(lines, margin, y);
    y += lineHeight * lines.length + 5;
  };

  const checkPageBreak = () => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PLANO DE ENSINO', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 2;

  // Identification
  addTitle('1. Identificação do Componente Curricular');
  addField('Nome', plan.identification.name);
  addField('Abreviatura', plan.identification.abbreviation);
  addField('Carga Horária Presencial', plan.identification.presentialHours);
  addField('Carga Horária Teórica', plan.identification.theoreticalHours);
  addField('Carga Horária Prática', plan.identification.practicalHours);
  addField('Carga Horária de Extensão', plan.identification.extensionHours);
  addField('Carga Horária Total', plan.identification.totalHours);
  addField('Carga Horária Semanal', plan.identification.weeklyHours);
  addField('Professor', plan.identification.professorName);
  addField('SIAPE', plan.identification.siapeCode);
  y += lineHeight;

  // Ementa
  addSection('2. Ementa', plan.identification.syllabus);

  // Objectives
  addSection('3. Objetivos', plan.objectives);

  // Teaching Modality
  addSection('4. Modalidade de Ensino', plan.teachingModality);

  // Extension Activities
  checkPageBreak();
  addTitle('5. Atividades de Extensão');
  plan.extensionActivities.selectedActivities.forEach(activity => {
    doc.text(`• ${activity}`, margin, y);
    y += lineHeight;
  });
  addSection('Justificativa', plan.extensionActivities.justification);

  // Schedule
  checkPageBreak();
  addTitle('6. Cronograma');
  plan.schedule.forEach(entry => {
    checkPageBreak();
    addField(`${entry.date}`, entry.activity);
  });

  // Bibliography
  checkPageBreak();
  addTitle('7. Bibliografia');
  addSection('Bibliografia Básica', plan.bibliography.basic);
  addSection('Bibliografia Complementar', plan.bibliography.complementary);

  // Signatures
  checkPageBreak();
  addTitle('8. Assinaturas');
  y += 20;
  const signatureWidth = contentWidth / 3;
  
  doc.line(margin, y, margin + signatureWidth - 10, y);
  doc.line(margin + signatureWidth + 10, y, margin + 2 * signatureWidth - 10, y);
  doc.line(margin + 2 * signatureWidth + 10, y, margin + 3 * signatureWidth, y);
  
  y += 5;
  doc.setFontSize(10);
  doc.text(plan.signatures.professorName, margin, y, { align: 'left' });
  doc.text(plan.signatures.coordinatorName, margin + signatureWidth + 10, y, { align: 'left' });
  doc.text(plan.signatures.courseName, margin + 2 * signatureWidth + 10, y, { align: 'left' });

  return doc;
}