import { Card, Header, Image, Rating, Segment } from 'semantic-ui-react'
import ModalProfil from '../Modales/ModalProfil'

const Carte = ({ profil }) => {
  return (
    <Card style={{ position: 'relative' }}>
      <Image
        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        wrapped
        ui={false}
      />
      <Card.Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Card.Content style={{ flexGrow: 2 }}>
          <Header style={{ margin: '10px 0 15px', textAlign: 'center' }}>
            {profil.name}
          </Header>
          {profil.skills[0].name && (
            <Segment>
              {profil.skills.map(skill => (
                <Card.Content
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {skill.name}:
                  <Rating
                    icon='star'
                    defaultRating={0}
                    maxRating={5}
                    rating={skill.rating}
                  />
                </Card.Content>
              ))}
            </Segment>
          )}
        </Card.Content>
        <Card.Content style={{ marginTop: '1rem' }}>
          <ModalProfil profil={profil} />
        </Card.Content>
      </Card.Content>
    </Card>
  )
}

export default Carte
