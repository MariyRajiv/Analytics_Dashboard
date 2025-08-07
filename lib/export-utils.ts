import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Papa from 'papaparse'

// Export data to CSV
export const exportToCSV = (data: any[], filename: string) => {
  try {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error exporting CSV:', error)
    throw new Error('Failed to export CSV file')
  }
}

// Export element to PDF
export const exportToPDF = async (elementId: string, filename: string) => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`${filename}.pdf`)
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw new Error('Failed to export PDF file')
  }
}

// Export chart data to CSV
export const exportChartToCSV = (chartData: any[], filename: string) => {
  const formattedData = chartData.map(item => ({
    ...item,
    // Format numbers for better readability
    ...(item.value && { value: typeof item.value === 'number' ? item.value.toLocaleString() : item.value }),
    ...(item.revenue && { revenue: typeof item.revenue === 'number' ? item.revenue.toLocaleString() : item.revenue }),
    ...(item.users && { users: typeof item.users === 'number' ? item.users.toLocaleString() : item.users })
  }))
  
  exportToCSV(formattedData, filename)
}

// Export table data to CSV with custom formatting
export const exportTableToCSV = (tableData: any[], filename: string) => {
  const formattedData = tableData.map(row => ({
    Campaign: row.campaign,
    Status: row.status,
    Budget: `$${row.budget?.toLocaleString() || 0}`,
    Spent: `$${row.spent?.toLocaleString() || 0}`,
    Clicks: row.clicks?.toLocaleString() || 0,
    Conversions: row.conversions || 0,
    CTR: `${row.ctr || 0}%`,
    CPC: `$${row.cpc || 0}`,
    ROAS: `${row.roas || 0}x`,
    Date: row.date
  }))
  
  exportToCSV(formattedData, filename)
}

// Generate comprehensive analytics report data
export const generateAnalyticsReport = () => {
  return {
    summary: {
      totalSessions: '234,800',
      totalPageViews: '687,200',
      avgSessionDuration: '5:47',
      bounceRate: '18.6%',
      conversionRate: '4.2%',
      generatedAt: new Date().toISOString()
    },
    topPages: [
      { page: '/home', views: 89600, uniqueViews: 67400, avgTime: '4:32', bounceRate: '15%' },
      { page: '/services', views: 72300, uniqueViews: 58900, avgTime: '6:18', bounceRate: '12%' },
      { page: '/about', views: 54800, uniqueViews: 44100, avgTime: '3:45', bounceRate: '22%' },
      { page: '/blog/marketing-trends', views: 43400, uniqueViews: 38800, avgTime: '7:23', bounceRate: '9%' },
      { page: '/contact-us', views: 31900, uniqueViews: 28200, avgTime: '2:18', bounceRate: '28%' }
    ],
    trafficSources: [
      { source: 'Organic Search', sessions: 93920, percentage: 40.0 },
      { source: 'Social Media', sessions: 70440, percentage: 30.0 },
      { source: 'Direct Traffic', sessions: 46960, percentage: 20.0 },
      { source: 'Email Campaign', sessions: 14088, percentage: 6.0 },
      { source: 'Paid Ads', sessions: 9392, percentage: 4.0 }
    ]
  }
}