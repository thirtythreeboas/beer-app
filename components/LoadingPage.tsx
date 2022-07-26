import { useEffect, useRef } from 'react';
import styles from '../styles/Loading.module.scss'

const LoadingPage = () => {

  const elem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const e = elem.current
      if (!e) return;
      e.innerText.length - 7 === 3 ? e.innerText = 'Loading' : e.innerText += '.'
    }, 1500)

    return () => clearInterval(interval);
  }, [])

  return (
    <div className={styles.loading} ref={elem} >Loading</div>
  );
};

export default LoadingPage;
