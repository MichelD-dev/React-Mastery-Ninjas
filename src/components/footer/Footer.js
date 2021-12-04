/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Footer.module.css'

const Footer = ({ openModal }) => (
  <footer className={styles.footer}>
    <p>
      <a className={styles.a} href='#' onClick={openModal}>
        Conditions d'utilisation
      </a>
    </p>
    <p>&#169; MichelD</p>
  </footer>
)

export default Footer
