import { Modal } from 'semantic-ui-react'
import Form from '../Inscription/Inscription'

const ModalInscription = ({
  openModal,
  setOpenModal,
  handleSubmit,
  submitImg,
}) => {
  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Header>Formulaire d'inscription</Modal.Header>
      <Modal.Content>
        <Form handleSubmit={handleSubmit} submitImg={submitImg} />
      </Modal.Content>
    </Modal>
  )
}
export default ModalInscription
