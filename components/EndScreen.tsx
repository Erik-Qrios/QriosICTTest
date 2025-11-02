import React, { useRef } from 'react';
import { Attempt, StudentInfo } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Report from './Report';
import { QUESTIONS_PER_QUIZ } from '../constants';

interface EndScreenProps {
  achievedLevel: number;
  history: Attempt[];
  studentInfo: StudentInfo;
  testStartTime: Date;
  testEndTime: Date;
}

const EndScreen: React.FC<EndScreenProps> = ({ achievedLevel, history, studentInfo, testStartTime, testEndTime }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const reportElement = reportRef.current;
    if (!reportElement) return;

    // Temporarily make it visible for capture
    const originalDisplay = reportElement.style.display;
    reportElement.style.display = 'block';

    const canvas = await html2canvas(reportElement, { scale: 2 });
    
    // Hide it again
    reportElement.style.display = originalDisplay;
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`rapport_${studentInfo.firstName}_${studentInfo.lastName}.pdf`);
  };
  
  const totalDurationSeconds = Math.round((testEndTime.getTime() - testStartTime.getTime()) / 1000);
  const minutes = Math.floor(totalDurationSeconds / 60);
  const seconds = totalDurationSeconds % 60;
  
  return (
    <div className="w-full max-w-2xl text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-qrios-dark mb-2">Test Afgerond!</h2>
      <p className="text-lg text-gray-600 mb-6">Bedankt voor uw deelname. Hieronder vindt u een overzicht van uw resultaten.</p>

      <div className="bg-qrios-light rounded-lg p-6 my-8 border-2 border-qrios-primary">
        <p className="text-lg font-medium text-gray-700">Behaald niveau:</p>
        <p className="text-6xl font-bold my-2 text-qrios-primary">{achievedLevel}</p>
        <p className="text-sm text-gray-500">van de 3 niveaus</p>
      </div>

      <div className="text-left text-gray-700 space-y-2 mb-8 p-4 bg-gray-50 rounded-lg border">
        <p><strong>Naam:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
        <p><strong>Campus:</strong> {studentInfo.campus}</p>
        <p><strong>Totale duur:</strong> {minutes} minuten en {seconds} seconden</p>
      </div>
      
      <button 
        onClick={handleDownload}
        className="w-full bg-qrios-primary text-white font-bold py-4 px-8 rounded-lg text-xl shadow-md hover:bg-opacity-90 transition-all transform hover:scale-105"
      >
        Download Rapport (PDF)
      </button>

      {/* This part is for PDF generation and is not visible on the screen */}
      <div ref={reportRef} className="absolute -left-[9999px] top-auto w-[800px] p-12 bg-white" style={{ display: 'none' }}>
        <div className="flex items-center justify-center mb-8 pb-4 border-b">
            <h1 className="text-3xl font-bold text-qrios-dark">Rapport IT-Vaardigheidstest</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-6">Resultaten voor {studentInfo.firstName} {studentInfo.lastName}</h2>
        
        <div className="text-left text-base space-y-2 mb-8 p-4 bg-gray-100 rounded-lg">
            <p><strong>Campus:</strong> {studentInfo.campus}</p>
            <p><strong>Testdatum:</strong> {testStartTime.toLocaleDateString('nl-BE')}</p>
            <p><strong>Totale duur:</strong> {minutes} minuten en {seconds} seconden</p>
            <p className="font-bold text-lg pt-2">Eindresultaat: Niveau {achievedLevel} behaald</p>
        </div>

        {history.map((attempt, index) => (
          <div key={index} className="mb-8" style={{pageBreakBefore: 'always'}}>
            <h3 className="text-2xl font-bold text-qrios-dark border-b-2 border-qrios-primary pb-2 mb-6">
              Details Niveau {attempt.level} - Poging {attempt.attemptNumber}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-left text-lg mb-6">
              <p><strong>Score:</strong> {attempt.score}/{QUESTIONS_PER_QUIZ}</p>
              <p><strong>Resultaat:</strong> <span className={attempt.passed ? 'font-bold text-green-600' : 'font-bold text-red-600'}>{attempt.passed ? 'Geslaagd' : 'Niet geslaagd'}</span></p>
            </div>
            <Report attempt={attempt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndScreen;