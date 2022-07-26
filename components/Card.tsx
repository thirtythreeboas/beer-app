import styles from '../styles/Card.module.scss'
import Image from 'next/image'

const Card = ({...params}) => {

  const defaultImage: string = 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo='

  return (
    <div className={styles.card_container}>
      <Image 
        className={styles.card_image} 
        src={`${params.image_url === null ? defaultImage : params.image_url}`}
        alt={params.name}
        width={'100%'}
        height={'200px'}
      />
      <h2 className={styles.card_header}>{params.name}</h2>
      <p className={styles.card_description}>
        {
          `${params.description.length > 140 ? `${params.description.substring(0,140)}...` : params.description}`
        }
      </p>
    </div>
  )
}

export default Card