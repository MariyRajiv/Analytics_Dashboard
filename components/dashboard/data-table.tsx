"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ArrowUpDown, Download, Filter } from "lucide-react"
import { TableRow as TableRowType } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { ExportButton } from '@/components/ui/export-button'
import { exportTableToCSV } from '@/lib/export-utils'

interface DataTableProps {
  data: TableRowType[]
}

type SortField = keyof TableRowType
type SortDirection = 'asc' | 'desc'

export function DataTable({ data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState<SortField>('campaign')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(row => {
      const matchesSearch = row.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    return filtered
  }, [data, searchTerm, statusFilter, sortField, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'Paused': return 'secondary'
      case 'Completed': return 'outline'
      default: return 'default'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold">Campaign Performance</CardTitle>
              <CardDescription>
                Detailed analytics for all active marketing campaigns
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <ExportButton
                data={filteredAndSortedData.map(row => ({
                  Campaign: row.campaign,
                  Status: row.status,
                  Budget: row.budget,
                  Spent: row.spent,
                  Clicks: row.clicks,
                  Conversions: row.conversions,
                  CTR: row.ctr,
                  CPC: row.cpc,
                  ROAS: row.roas,
                  Date: row.date
                }))}
                elementId="campaign-table"
                filename="campaign-performance"
                showPDF={true}
                showCSV={true}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div id="campaign-table" className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200"
                    onClick={() => handleSort('campaign')}
                  >
                    <div className="flex items-center gap-2">
                      Campaign
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200 text-right"
                    onClick={() => handleSort('budget')}
                  >
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      Budget
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200 text-right"
                    onClick={() => handleSort('spent')}
                  >
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      Spent
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200 text-right"
                    onClick={() => handleSort('clicks')}
                  >
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      Clicks
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200 text-right"
                    onClick={() => handleSort('conversions')}
                  >
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      Conversions
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/80 transition-colors duration-200 text-right"
                    onClick={() => handleSort('roas')}
                  >
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      ROAS
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {paginatedData.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium min-w-[200px]">{row.campaign}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(row.status)}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">${row.budget.toLocaleString()}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">${row.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">{row.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">{row.conversions}</TableCell>
                      <TableCell className={cn(
                        "text-right font-medium whitespace-nowrap",
                        row.roas >= 3 ? "text-green-600 dark:text-green-400" : 
                        row.roas >= 2 ? "text-yellow-600 dark:text-yellow-400" : 
                        "text-red-600 dark:text-red-400"
                      )}>
                        {row.roas.toFixed(2)}x
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}