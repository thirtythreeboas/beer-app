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
    if (value) getSearchResults()
    getBeers()
    window.scrollTo(0, 0)
  }, [currentPage, value])

  const getBeers = async () => {
    const link: string = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${postsPerPage}`
    const res = await fetch(link)
    const json = await res.json()
    setData([...json])
    setIsLoading(false)
  }

  const getSearchResults = async () => {
    if (value.length === 0) return
    const link: string = `https://api.punkapi.com/v2/beers?beer_name=${value}`
    const res = await fetch(link)
    const json = await res.json()
    setSearchResults([...json])
    setIsLoading(false)
  }

  const paginate = (pageNumber: number) => {
    if (pageNumber !== currentPage) setIsLoading(true)
    setCurrentPage(pageNumber)
    window.addEventListener('scroll', () => true)
  }

  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (router.pathname !== '/') {
      console.log('here')
      router.push('/')
    }
    
    let event = (e.target as HTMLInputElement).value
    if (event.length === 0) setSearchResults([])
    setValue((event))
    setCurrentPage(1)
  }

  const resetOnLogoClick = () => {
    // router.push('/')
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
        searchResults,
        value
      }}>
        <Nav
          value={value}
          handleChange={handleChange}
          resetOnLogoClick={resetOnLogoClick}
        />
        {children}
      </Through.Provider>
    </div>
  )
}

export default Layout