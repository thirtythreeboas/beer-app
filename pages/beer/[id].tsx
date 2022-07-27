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
  const obj = data[0]
  return {
    props: { beer: obj}
  }
}

const Beer = ( { beer }: any ) => {

  if (beer === undefined) return <div>Undefined</div>

  const { name, image_url, tagline, abv, description, food_pairing } = beer

  const defaultImage: string = 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo='


  return (
    <div className={styles.beer_card}>
      <Head>
        <title>{`${name} | Beer`}</title>
      </Head>

      <div className={styles.img_container}>
        <h2>{beer.name}</h2>
        <Image
          src={`${image_url === null ? defaultImage : image_url}`} 
          width={'100%'}
          height={'200px'}
          alt={beer.name} />
      </div>

      <div className={styles.details}>

        <h2>{tagline}</h2>

        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Name</span></dt>
          <dd className={styles.dd_styles}>{beer.name}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Alcohol by volume</span></dt>
          <dd className={styles.dd_styles}>{abv}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Description</span></dt>
          <dd className={styles.dd_styles}>{description}</dd>
        </dl>
        <dl className={styles.dl_styles}>
          <dt className={styles.dt_styles}><span>Foor pairing</span></dt>
          <dd className={styles.dd_styles}>{food_pairing.map((e: string, index: number) => <span key={e + index}>{e}</span>)}</dd>
        </dl>
      </div>

    </div>
  )
}

export default Beer