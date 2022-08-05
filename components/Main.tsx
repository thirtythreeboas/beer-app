import { useState, useEffect, useContext } from 'react'
import styles from '../styles/Main.module.scss'
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
    searchResults
  } = useContext(Through)

  useEffect(() => {
    if (searchResults.length === 0) {
      setResultPagination([])
    } else {
      const newArr = breakResultsIntoPieces(searchResults, 12)
      setResultPagination([...newArr])
    }
  }, [searchResults])

  const dataToDisplay = resultPagination.length !== 0 ?  resultPagination[currentPage - 1] : data
  
  function breakResultsIntoPieces(arr: any[], size: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      const sorted = arr.slice(i, i + size);
      res.push(sorted);
    }
    const lastPage = res[res.length - 1].length
    if (lastPage !== 4 && lastPage !== 8 && lastPage !== 12 && lastPage !== 1) {
      let pseudoElems: any[] = new Array(lastPage % 2 === 0 ? 2 : 1).fill({type: 'pseudo'})
      for (let i = 0; i < pseudoElems.length; i++) {
        res[res.length - 1].push(pseudoElems[i]);
      }
    }
    return res;
  }

  if (isLoading) return <LoadingPage />

  return (
    <>
      <div className={styles.main}>
        {
          dataToDisplay.map((e: any) => (
                <Card key={e.id} {...e} />
          ))
        }
      </div>
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        resultPagination={resultPagination}
      />
    </>
  )
}

export default Main