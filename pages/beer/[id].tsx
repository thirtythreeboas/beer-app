import styles from '../../styles/Beer.module.scss'
import Head from 'next/head'
import Image from 'next/image'

export const getStaticPaths = async () => {
  const res = await fetch('https://api.punkapi.com/v2/beers')
  const data = await res.json()

  const paths = data.map((e: any) => {
    return {
      params: { id: e.id.toString() }
    }
  })

  return {
    paths,
    fallback: true 
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const res = await fetch('https://api.punkapi.com/v2/beers/' + id)
  const data = await res.json()
  return {
    props: { beer: data[0]}
  }
}

const Beer = ( { beer }: any ) => {

  const defaultImage: string = 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo='

  return (
    <div className={styles.beer_card}>
      <Head>
        <title>{`${beer.name} | Beer`}</title>
      </Head>

      <div className={styles.img_container}>
        <h2>{beer.name}</h2>
        <Image
          src={`${beer.image_url === null ? defaultImage : beer.image_url}`} 
          width={'100%'}
          height={'200px'}
          alt={beer.name} />
      </div>

      <div className={styles.details}>

        <h2>{beer.tagline}</h2>

        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Name</span></dt>
          <dd className={styles.dd_styles}>{beer.name}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Alcohol by volume</span></dt>
          <dd className={styles.dd_styles}>{beer.abv}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Description</span></dt>
          <dd className={styles.dd_styles}>{beer.description}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Foor pairing</span></dt>
          <dd className={styles.dd_styles}>{beer.food_pairing.map((e: string) => `${e}, `)}</dd>
        </dl>
      </div>

    </div>
  )
}

export default Beer