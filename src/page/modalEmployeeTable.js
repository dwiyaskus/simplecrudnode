import React, { Component } from "react";
import { Button, Table, Modal } from "semantic-ui-react";
import Services from "../api/dataService";
import Alert from "./alert";
import ModalEditEmployee from "./modalAddEmployee";
import Pagination from "./components/pagination";
import { getNumberFromTo, datasetPagination } from "./services/helper";
class ModalEmployee extends Component {
  state = {
    data: [],
    header: ["ID", "Name", "Email", "Username ", "Action"],
    isOpenAlert: false,
    open: false,
    dataDetail: {
      id: "",
      name: "",
      email: "",
      password: "",
      username: "",
    },
    activePage: 1,
    errors: {
      nameError: false,
      emailError: false,
      passwordError: false,
      usernameError: false,
    },
  };
  pageChange = (e, { activePage }) => {
    this.setState({ activePage });
  };
  componentDidMount() {
    this.retrieveDataAll();
  }

  retrieveDataAll() {
    Services.getAll()
      .then((response) => {
        this.setState({
          data: response.data.values,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  handleEditEmployee = (value) => {
    Services.get(value)
      .then((response) => {
        this.setState({
          open: true,
          dataDetail: response.data.values[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleDeleteEmployee = (id) => {
    Services.delete(id)
      .then((response) => {
        this.setState({
          isOpenAlert: true,
        });
        this.retrieveDataAll();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleCloseAlert = () => {
    this.setState({
      isOpenAlert: false,
    });
  };

  handleSave = () => {
    const { dataDetail } = this.state;
    dataDetail.id = dataDetail.Id;
    const err = this.validate();
    if (!err) {
      Services.update(dataDetail)
        .then((response) => {
          this.setState({
            open: false,
          });
          this.retrieveDataAll();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  handleChange = (e) => {
    const field = e.target.name;
    const dataDetail = this.state.dataDetail;
    dataDetail[field] = e.target.value;
    this.setState({ dataDetail: dataDetail });
  };

  handleCloseModalEmployee = () => {
    this.setState({
      open: false,
    });
  };

  validate = () => {
    let isError = false;
    const { dataDetail } = this.state;
    const errors = {
      nameError: false,
      emailError: false,
      passwordError: false,
      usernameError: false,
    };

    if (dataDetail.name.length < 1) {
      isError = true;
      errors.nameError = true;
    }
    if (dataDetail.username.length < 1) {
      isError = true;
      errors.usernameError = true;
    }
    if (dataDetail.password.length < 1) {
      isError = true;
      errors.passwordError = true;
    }
    if (dataDetail.email.length < 1) {
      isError = true;
      errors.emailError = true;
    }
    this.setState({
      ...this.state,
      errors: errors,
    });
    return isError;
  };
  render() {
    const { open, handleClose } = this.props;
    const { header, data, isOpenAlert, dataDetail, errors } = this.state;

    let pagedData = datasetPagination(data, 5);
    let listData = pagedData[this.state.activePage - 1];
    let { numbersFrom, numbersTo } = getNumberFromTo(
      listData,
      this.state.activePage,
      3
    );
    return (
      <Modal dimmer={"blurring"} open={open} size="small">
        <Alert
          open={isOpenAlert}
          handleClose={this.handleCloseAlert}
          header={"Delete Succesfully"}
          message={"Your employee successfully deleted "}
          contentAction={"Done"}
        />
        <ModalEditEmployee
          open={this.state.open}
          handleAction={this.handleSave}
          type="edit"
          data={dataDetail}
          handleClose={this.handleCloseModalEmployee}
          handleChange={this.handleChange}
          error={errors}
        />
        <Modal.Header>See Employee</Modal.Header>
        <Table
          basic="very"
          style={{ padding: "1em" }}
          selectable
          compact
          textAlign="center"
        >
          <Table.Header>
            <Table.Row>
              {header.map((headTableContent, index) => {
                return (
                  <Table.HeaderCell key={index}>
                    {headTableContent}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {listData &&
              listData.map((obj, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell>{obj.Id}</Table.Cell>
                    <Table.Cell> {obj.name}</Table.Cell>
                    <Table.Cell>{obj.email}</Table.Cell>
                    <Table.Cell> {obj.username}</Table.Cell>
                    <Table.Cell>
                      <Button
                        content="Edit"
                        primary
                        // value={obj.Id}
                        onClick={() => this.handleEditEmployee(obj.Id)}
                      />
                      <Button
                        content="Delete"
                        negative
                        // value={obj.Id}
                        onClick={() => this.handleDeleteEmployee(obj.Id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
        <Pagination
          pagedData={pagedData}
          numbersTo={numbersTo}
          numbersFrom={numbersFrom}
          data={data}
          pageChange={this.pageChange}
          activePage={this.state.activePage}
        />
        <Modal.Actions>
          <Button color="black" onClick={handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalEmployee;
