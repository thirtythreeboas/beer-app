import styles from '../styles/Pagination.module.scss'

interface Props {
  currentPage: number;
  number: number;
  paginate: (pageNumber: number) => any;
}

const PaginationChild = (props: Props) => {

  const {
    currentPage,
    number,
    paginate
  } = props

  const backgroundStyle = {
    backgroundColor: currentPage === number ? '#fff' : '#1e1c31',
    color: currentPage === number ? '#1e1c31' : '#fff',
    border: '2px solid #1e1c31',
    boxShadow: 'inset 0 2px 0 rgba(48,50,51,.35)'
  }

  const preventDotsFromLaunching = () => {
    if (isNaN(number)) return (e: any) => e.stopPropagation()
    return () => paginate(number)
  }

  return (
    <li 
      style={backgroundStyle} 
      className={styles.page_item} 
      onClick={preventDotsFromLaunching()}
    >
      {number}
    </li>
  )
}

export default PaginationChild