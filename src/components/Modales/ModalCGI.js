import { Modal } from 'semantic-ui-react'

const ModalCGI = ({ openModal, dispatch }) => {
  return (
    <Modal
      size='tiny'
      onClose={() => dispatch({ openModalCGI: false })}
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
