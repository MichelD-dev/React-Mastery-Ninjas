import { Button, Menu } from 'semantic-ui-react'
import styles from './Header.module.css'

const Header = ({ openModal }) => (
  <Menu
    stackable
    borderless
    style={{
      backgroundColor: '#eee',
      boxShadow: '0 1px 10px 0px rgba(0, 0, 0, 0.3)',
    }}
    className={styles.header}
  >
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
