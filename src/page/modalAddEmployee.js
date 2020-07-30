import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
class ModalExampleDimmer extends Component {
  render() {
    const {
      open,
      handleAction,
      error,
      data,
      handleClose,
      handleChange,
    } = this.props;
    return (
      <Modal dimmer={"blurring"} open={open} size="tiny">
        <Modal.Header>Employee</Modal.Header>
        <Form style={{ padding: "1em" }}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Please input name"
              value={data.name}
              onChange={handleChange}
              name="name"
              error={error.nameError}
            />
            <Form.Input
              fluid
              label="Email"
              placeholder="Please input email"
              value={data.email}
              onChange={handleChange}
              name="email"
              error={error.emailError}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Username"
              placeholder="Please input username"
              value={data.username}
              onChange={handleChange}
              name="username"
              error={error.usernameError}
            />
            <Form.Input
              fluid
              label="Password"
              placeholder="Please input password"
              value={data.password}
              onChange={handleChange}
              name="password"
              error={error.passwordError}
            />
          </Form.Group>
        </Form>

        <Modal.Actions>
          <Button color="black" onClick={handleClose}>
            Close
          </Button>
          <Button
            positive
            icon="save"
            labelPosition="right"
            content="Save"
            onClick={handleAction}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalExampleDimmer;
