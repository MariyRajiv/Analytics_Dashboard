"use client"

import { useState } from 'react'
import { Download, FileText, Table } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { exportToCSV, exportToPDF } from '@/lib/export-utils'

interface ExportButtonProps {
  data?: any[]
  elementId?: string
  filename: string
  showPDF?: boolean
  showCSV?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function ExportButton({ 
  data, 
  elementId, 
  filename, 
  showPDF = true, 
  showCSV = true,
  variant = 'outline',
  size = 'sm'
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = async () => {
    if (!data) {
      toast.error('No data available for export')
      return
    }

    setIsExporting(true)
    try {
      exportToCSV(data, filename)
      toast.success('CSV file downloaded successfully!')
    } catch (error) {
      toast.error('Failed to export CSV file')
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    if (!elementId) {
      toast.error('No content available for PDF export')
      return
    }

    setIsExporting(true)
    try {
      await exportToPDF(elementId, filename)
      toast.success('PDF file downloaded successfully!')
    } catch (error) {
      toast.error('Failed to export PDF file')
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // If only one export option is available, show a simple button
  if ((showPDF && !showCSV) || (!showPDF && showCSV)) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={showPDF ? handleExportPDF : handleExportCSV}
        disabled={isExporting}
        className="hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        <Download className="h-4 w-4 mr-2" />
        {isExporting ? 'Exporting...' : `Export ${showPDF ? 'PDF' : 'CSV'}`}
      </Button>
    )
  }

  // Show dropdown menu for multiple export options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isExporting}
          className="hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {showCSV && (
          <DropdownMenuItem onClick={handleExportCSV} disabled={isExporting}>
            <Table className="h-4 w-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
        )}
        {showPDF && (
          <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}