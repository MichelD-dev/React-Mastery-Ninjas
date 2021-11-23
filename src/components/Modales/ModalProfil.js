import { useState } from 'react'
import { Modal, Card, Segment, Rating, Button } from 'semantic-ui-react'

const ModalProfil = ({ profil }) => {
  const { presentation, name, skills } = profil
  const [open, setOpen] = useState(false)

  return (
    <Modal
      size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='large' fluid content='En savoir plus' />}
    >
      <Modal.Header
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          padding: '1.3rem',
          color: '#666',
        }}
      >
        {name.toUpperCase() + name.slice(1)}
      </Modal.Header>
      <Modal.Content>
        {profil.skills[0].name && (
          <Segment>
            {skills?.map(skill => (
              <Card.Content
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.3rem',
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
        <Segment
          padded={!presentation && 'very'}
          secondary
          style={{ marginTop: '20px' }}
          disabled={!presentation}
        >
          <Card.Description
            style={{
              fontSize: '1.3rem',
              textAlign: presentation ? 'left' : 'center',
            }}
          >
            {presentation || 'Pas de présentation'}
          </Card.Description>
        </Segment>
      </Modal.Content>
    </Modal>
  )
}
export default ModalProfil
