import { Modal } from 'semantic-ui-react'
import Form from 'components/Inscription/Inscription'

const ModalInscription = ({ openModal, setOpenModal, handleSubmit }) => {
  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
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
