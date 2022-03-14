import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ReactDOM from "react-dom";

const CustomModal = (props) => {
  if (props.isShowing) {
    return ReactDOM.createPortal(
      <>
        <Modal
          isOpen={props.isShowing}
          toggle={() => {
            props.setIsShowing(!props.isShowing);
          }}
          backdrop="static"
        >
          <ModalHeader>
            <h4 className="modal-title">{props.title}</h4>
            <i onClick={props.onClose} className="bi bi-x-circle-fill" />
          </ModalHeader>
          <ModalBody>{props.children}</ModalBody>
        </Modal>
      </>,
      document.querySelector("#modal-root")
    );
  } else {
    return null;
  }
};

export default CustomModal;
