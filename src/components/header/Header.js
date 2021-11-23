import { Button, Menu } from 'semantic-ui-react'
import styles from './Header.module.css'

const Header = ({ openModal }) => (
  <Menu stackable borderless className={styles.header}>
    <div>React Mastery Ninjas</div>
    <Menu.Menu position='right'>
      <Button
        color='purple'
        onClick={openModal}
        size='large'
        content='Inscription'
        style={{ margin: '2rem' }}
      />
    </Menu.Menu>
  </Menu>
)

export default Header
