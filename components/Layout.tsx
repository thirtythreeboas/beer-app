import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import Nav from "./Nav"


export const Through: any | null = createContext(null)

const Layout = ({children}: any) => {

  const [data, setData] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [value, setValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage] = useState<number>(12)
  const [isLoading, setIsLoading] = useState<Boolean>(true)


  useEffect(() => {
    if (searchResults.length !== 0) return
    const getBeers = async () => {
      const link: string = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${postsPerPage}`
      const res = await fetch(link)
      const json = await res.json()
      setData([...json])
      setIsLoading(false)
    }
    getBeers()
    window.scrollTo(0, 0)
  }, [currentPage])


  const getSearchResults = async () => {
    if (value.length === 0) return
    const link: string = `https://api.punkapi.com/v2/beers?beer_name=${value}`
    const res = await fetch(link)
    const json = await res.json()
    setSearchResults([...json])
    setIsLoading(false)
  }

  const paginate = (pageNumber: number) => {
    // if (pageNumber !== currentPage) setIsLoading(true)
    setCurrentPage(pageNumber)
    // window.addEventListener('scroll', () => true)
    window.scrollTo(0, 0)
  }

  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let event = (e.target as HTMLInputElement).value
    setValue((event))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    if (router.pathname !== '/') {
      router.push('/')
    }
    if (value.length === 0) setSearchResults([])
    getSearchResults()
    setCurrentPage(1)
    e.preventDefault()
  }

  const resetOnLogoClick = () => {
    setSearchResults([])
    setValue('')
    setCurrentPage(1)
  }

  return (
    <div>
      <Through.Provider value={{
        data,
        currentPage,
        isLoading,
        paginate,
        searchResults
      }}>
        <Nav
          value={value}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          resetOnLogoClick={resetOnLogoClick}
        />
        {children}
      </Through.Provider>
    </div>
  )
}

export default Layout