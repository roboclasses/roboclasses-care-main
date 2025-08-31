"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Printer, RotateCcw, Info, Sparkles, InfoIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { UploadAssessmentButton } from "./UploadAssessmentButton"

interface AssessmentResultProps {
  assessment: string
  onReset: () => void
  notice?: string | null
  isAiGenerated?: boolean
  assessmentFileName?: string
}

export function AssessmentResult({ assessment, onReset, notice, isAiGenerated, assessmentFileName }: AssessmentResultProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleDownload = () => {
    const rows = [['question', 'A', 'B', 'C', 'D', 'answer']];
  
    // Extract Questions and Answer Key sections
    const questionsSection = assessment.split('## Questions:')[1]?.split('# Answer Key:')[0]?.trim();
    const answerKeySection = assessment.split('# Answer Key:')[1]?.trim();
  
    if (!questionsSection || !answerKeySection) {
      console.error("Invalid assessment format");
      return;
    }
  
    // Parse individual questions
    const questionBlocks = questionsSection.split(/\n(?=\d+\.\s)/).filter(Boolean); // matches "1. ", "2. " etc.
  
    // Parse answers: { '1': 'C', '2': 'A', ... }
    const answerLines = answerKeySection.split('\n').filter(Boolean);
    const answerMap: Record<string, string> = {};
    answerLines.forEach(line => {
      const match = line.match(/^(\d+)\.\s*([A-D])/);
      if (match) {
        answerMap[match[1]] = match[2];
      }
    });
  
    questionBlocks.forEach((block, index) => {
      const lines = block.trim().split('\n').map(line => line.trim());
      const questionText = lines[0].replace(/^\d+\.\s*/, ''); // Remove "1. "
  
      const options: Record<'A' | 'B' | 'C' | 'D', string> = { A: '', B: '', C: '', D: '' };
      lines.slice(1).forEach(line => {
        const optMatch = line.match(/^([A-D])\)\s*(.*)/);
        if (optMatch) {
          options[optMatch[1] as 'A' | 'B' | 'C' | 'D'] = optMatch[2];
        }
      });
  
      const answer = answerMap[(index + 1).toString()] ?? '';
  
      // Add to rows
      rows.push([
        questionText,
        options.A,
        options.B,
        options.C,
        options.D,
        answer,
      ]);
    });
  
    // Convert to CSV
    const csvContent = rows.map(row =>
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kid-assessment - ${assessmentFileName || 'questions'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  // Format markdown-style content for better display
  const formatAssessment = (text: string) => {
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/\n\n/g, "<br /><br />")
      .replace(/\n/g, "<br />")
  }

  console.log("assesment: ", assessment);
  console.log('Notice is', notice)
  

  return (
    <div className="space-y-4 ">
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="flex items-center space-x-2">
          <h2 className="md:text-2xl text-lg font-bold text-gray-800">Generated Assessment</h2>
          {isAiGenerated && (
            <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-500">
              <Sparkles className="h-3 w-3 mr-1 text-purple-600"/>
              AI Generated
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <UploadAssessmentButton />
          <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {notice && (
        <Alert className="bg-blue-50 border-blue-500">
          <InfoIcon className="text-blue-600"/>
          <AlertDescription className="text-blue-600">{notice}</AlertDescription>
        </Alert>
      )}

      <div className="bg-muted/50 p-6 rounded-md border border-gray-200 print:border-none print:p-0">
        <div className="print-content" dangerouslySetInnerHTML={{ __html: formatAssessment(assessment) }} />
      </div>

      <div className="print:hidden">
        <Button onClick={onReset} className="w-full">
          Create Another Assessment
        </Button>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content,
          .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
