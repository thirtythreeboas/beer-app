import styles from '../styles/Nav.module.scss'
import Link from 'next/link'

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetOnLogoClick: () => void;
}

const Nav = (props: Props) => {

  const { value, resetOnLogoClick, handleChange, handleSubmit } = props

  return (
    <div className={styles.nav_main_container}>
      <div className={styles.nav_content}>
        <Link href='/'>
          <div className={styles.logo} onClick={() => resetOnLogoClick()}>
            <h3>Beer</h3>
            <span>Where there&apos;s beer there&apos;s hope</span>
          </div>
        </Link>
        <form 
          className={styles.input_form} 
          onSubmit={(e) => handleSubmit(e)}
        >
          <button
            type='submit'
            className={styles.search_button}
            // onSubmit={(e) => handleSubmit(e)}
            // disabled
          >
            Search...
          </button>
          <input 
            className={styles.input_field}
            type="text"
            value={value}
            onChange={(e) => handleChange(e)}
          /> 
        </form>
      </div>
    </div>
  )
}

export default Nav