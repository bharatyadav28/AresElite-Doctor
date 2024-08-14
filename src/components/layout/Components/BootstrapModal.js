import React from "react";
import { Modal } from "react-bootstrap";

const BootstrapModal = ({
  showModal,
  handleClose,
  modalTitle,
  modalContent,
  className,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} className={className}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        {/* Additional buttons if needed */}
      </Modal.Footer>
    </Modal>
  );
};

export default BootstrapModal;
