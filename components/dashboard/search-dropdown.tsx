"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { searchResults, getCategoryIcon, getCategoryColor, type SearchResult } from '@/lib/search-utils'
import { cn } from '@/lib/utils'

interface SearchDropdownProps {
  onResultClick?: (result: SearchResult) => void;
  onNavigate?: (pageId: string) => void;
}

export function SearchDropdown({ onResultClick, onNavigate }: SearchDropdownProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Revenue trends', 'Google Ads performance', 'Conversion optimization'
  ])
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim()) {
      const filteredResults = searchResults(query)
      setResults(filteredResults)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title)
    setIsOpen(false)
    setSelectedIndex(-1)
    
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [result.title, ...prev.filter(item => item !== result.title)]
      return updated.slice(0, 5)
    })
    
    // Navigate to the relevant page
    if (onNavigate && result.pageId) {
      onNavigate(result.pageId)
    }
    
    onResultClick?.(result)
  }

  const handleRecentSearchClick = (search: string) => {
    setQuery(search)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-xs lg:max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search insights..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background transition-colors duration-200 text-sm"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-hidden"
          >
            {query.trim() ? (
              <div className="p-2">
                {results.length > 0 ? (
                  <>
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                      Search Results
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {results.map((result, index) => (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => handleResultClick(result)}
                          className={cn(
                            "w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-start gap-3 hover:bg-muted/50",
                            selectedIndex === index && "bg-muted/50"
                          )}
                        >
                          <span className="text-lg mt-0.5">
                            {getCategoryIcon(result.category)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm truncate">
                                {result.title}
                              </span>
                              <Badge 
                                variant="secondary" 
                                className={cn("text-xs px-2 py-0.5", getCategoryColor(result.category))}
                              >
                                {result.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {result.description}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No results found for "{query}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </div>
                <div className="py-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-muted/50 flex items-center gap-3"
                    >
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}