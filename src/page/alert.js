import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const Alert = (props) => (
  <Modal size="tiny" open={props.open}>
    <Header icon="archive" content={props.header} />
    <Modal.Content>
      <p>{props.message}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" inverted onClick={props.handleClose}>
        <Icon name="checkmark" /> {props.contentAction}
      </Button>
    </Modal.Actions>
  </Modal>
);

export default Alert;
