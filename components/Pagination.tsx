import styles from '../styles/Pagination.module.scss'
import PaginationChild from './PaginationChild'

interface PaginationProps {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  resultPagination: any[];
}

const Pagination = ( props: PaginationProps ) => {

  const {
    currentPage,
    paginate,
    resultPagination
  } = props

  const pageCount = resultPagination.length !== 0 ? resultPagination.length : 28

  const getRange = (start: number, end: number) => {
    return Array(end - start + 1).fill(0).map((v, i) => i + start)
  }
  
  const pagination = (currentPage: number, pageCount: number) => {
    let delta: number = pageCount <= 7 ? 7 : currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
  
    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2)
    }
  
    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1
      range.end += 1
    }
  
    let pages: number[] =
      currentPage > delta
        ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
        : getRange(1, Math.min(pageCount, delta + 1))
  
    const withDots = (value: number, pair: any[]) => (pages.length + 1 !== pageCount ? pair : [value])
  
    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages)
    }
  
    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]))
    }
  
    return pages
  }

  return (
    <nav className={styles.page_container}>
      <ul className={styles.pagination}>
        {
          pagination(currentPage, pageCount).map((number: number, index: number) => (
            <PaginationChild
              key={index}
              number={number}
              paginate={paginate}
              currentPage={currentPage}
            />
          ))
        }
      </ul>
    </nav>
  )
}

export default Pagination