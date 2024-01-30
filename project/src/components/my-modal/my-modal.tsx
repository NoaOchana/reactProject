import React, { FC, ReactNode } from 'react';
import './my-modal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyModalProps {
  title: string
  children: ReactNode
  confirmFunction: (event: any) => void
}

const MyModal: FC<MyModalProps> = (props: MyModalProps) => {

  const handleButton = (event: any,flag:boolean) => {
    event.preventDefault();
    props.confirmFunction(
      flag
     // event.target.innerText
    )
  }

  return <div className="my-modal">
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header dir='ltr' closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={(e) => { handleButton(e,false) }} variant="secondary">Confirm</Button>
          <Button onClick={(e) => { handleButton(e,true) }} variant="primary">Cancel</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  </div>
};

export default MyModal;
