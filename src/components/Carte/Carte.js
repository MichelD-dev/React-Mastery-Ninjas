import { Card, Header, Image, Rating, Segment } from 'semantic-ui-react'
import ModalProfil from '../Modales/ModalProfil'

const Carte = ({ profil }) => {
  return (
    <Card>
      <Image src={profil.photo || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} /> {/*//FIXME image carrée */}
      <Card.Content>
        <Card.Content>
          <Header style={{ margin: '10px 0 15px', textAlign: 'center' }}>
            {profil.name[0].toUpperCase() + profil.name.slice(1)}
          </Header>
          {!profil.skills[0].name ? (
            <Segment style={{ textAlign: 'center' }}>No skills</Segment>
          ) : (
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
                  {skill.name[0].toUpperCase() + skill.name.slice(1)}:
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
