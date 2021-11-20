import { Modal } from 'semantic-ui-react'

const ModalCGI = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      size='tiny'
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
      style={{ textAlign: 'center' }}
    >
      <Modal.Header>Conditions générales d'utilisation</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Qui d'entre nous a déjà lu les CGI?
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ModalCGI
