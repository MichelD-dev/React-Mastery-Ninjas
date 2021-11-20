import { Button } from 'semantic-ui-react'
import styles from './Header.module.css'

const Header = ({ openModal }) => (
  <header className={styles.header}>
    React Mastery Ninjas
    <Button color='purple' onClick={openModal} size='large'>
      Inscription
    </Button>
  </header>
)

export default Header
