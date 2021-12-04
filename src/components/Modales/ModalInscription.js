import { Modal } from 'semantic-ui-react'
import Form from 'components/Inscription/Inscription'

const ModalInscription = ({ openModal, dispatch, handleSubmit }) => {
  return (
    <Modal
      onClose={() => dispatch({ openModal: false })}
      onOpen={() => dispatch({ openModal: true })}
      open={openModal}
    >
      <Modal.Header>Formulaire d'inscription</Modal.Header>
      <Modal.Content>
        <Form handleSubmit={handleSubmit} />
      </Modal.Content>
    </Modal>
  )
}
export default ModalInscription
