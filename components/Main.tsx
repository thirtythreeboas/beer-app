import { useState, useEffect, useContext } from 'react'
import styles from '../styles/Main.module.scss'
import Link from 'next/link'
import Card from './Card'
import LoadingPage from './LoadingPage'
import Pagination from './Pagination'
import { Through } from './Layout'

const Main = () => {

  const [resultPagination, setResultPagination] = useState<any[]>([]) 

  const {
    data,
    currentPage,
    isLoading,
    paginate,
    searchResults,
    value
  } = useContext(Through)

  useEffect(() => {
    if (searchResults.length === 0 || searchResults === undefined) return
    const newArr = breakResultsIntoPieces(searchResults, 12)
    setResultPagination([...newArr])
  }, [searchResults])

  if (isLoading) return <LoadingPage />
  
  function breakResultsIntoPieces(arr: any[], size: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        const sorted = arr.slice(i, i + size);
        res.push(sorted);
    }
    return res;
  }


  // создаёт псевдо элементы, на случай если количество элементов на странице: 2, 3, 6, 7, 10, 11, так как при свойстве jusify-content: space-between лэйаут ломается и элементы выравнены не гармонично и не однородно
  const DisplayPseudoElements = (arr: any[]) => {
    let dif = arr.length % 12;
    let pseudoElems: any[] = new Array(dif % 2 === 0 ? 2 : 1).fill(0)
    if (pseudoElems.length === 0 || pseudoElems === undefined || pseudoElems === null) return;
    // return pseudoElems.length
    return pseudoElems.map((e: any, index: number) => (
          <div className={styles.preudo_elem}></div>
        ))
  }

  return (
    <>
      <div className={styles.main}>
        {
          !value || value === undefined || resultPagination === undefined || resultPagination.length === 0
          ? 
          data.map((e: any) => (
            <Link key={e.id} href={`/beer/${e.id}`}>
              <a>
                <Card {...e} />
              </a>
            </Link>
          ))
          :
          resultPagination[currentPage - 1].map((e: any) => (
            <Link key={e.id} href={`/beer/${e.id}`}>
              <a>
                <Card {...e} />
              </a>
            </Link>
          ))
        }
        {
          resultPagination === undefined || resultPagination.length === 0 
          ?
          null
          :
          DisplayPseudoElements(resultPagination[currentPage - 1])
        }
      </div>
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        searchResults={searchResults}
        value={value}
        totalPages={resultPagination.length}
      />
    </>
  )
}

export default Main