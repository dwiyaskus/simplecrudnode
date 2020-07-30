/* eslint-disable max-classes-per-file */

import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from "semantic-ui-react";
import ModalEmployee from "./modalAddEmployee";
import ModalSeeEmployee from "./modalEmployeeTable";
import Services from "../api/dataService";
import Alert from "./alert";
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
const HomepageHeading = ({ mobile, handleOpenSeeEmployee }) => (
  <Container text>
    <Header
      as="h1"
      content="Imagine a Company"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Free your imagination to exceed the limits"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge" onClick={handleOpenSeeEmployee}>
      See Employee
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};
class DesktopContainer extends Component {
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  state = {
    open: false,
    openSeeEmployee: false,
    dataDetail: {
      Id: "",
      name: "",
      email: "",
      password: "",
      username: "",
    },
    isOpenAlert: false,
    errors: {
      nameError: false,
      emailError: false,
      passwordError: false,
      usernameError: false,
    },
  };

  close = () => this.setState({ open: false });
  open = () =>
    this.setState({
      open: true,
      dataDetail: {
        Id: "",
        name: "",
        email: "",
        password: "",
        username: "",
      },
    });
  closeSeeEmployee = () => this.setState({ openSeeEmployee: false });
  openSeeEmployee = () => this.setState({ openSeeEmployee: true });
  handleSave = () => {
    const { dataDetail } = this.state;
    const err = this.validate();
    if (!err) {
      Services.create(dataDetail)
        .then((response) => {
          this.setState({
            open: false,
            isOpenAlert: true,
          });
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
  handleCloseAlert = () => {
    this.setState({
      isOpenAlert: false,
    });
    window.location.reload();
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
    const { children } = this.props;
    const { fixed, isOpenAlert, errors } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Alert
          open={isOpenAlert}
          handleClose={this.handleCloseAlert}
          header={"Add Employee Succesfully"}
          message={"Your employee successfully added "}
          contentAction={"Done"}
        />
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed} onClick={this.open}>
                    Add Employee
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading handleOpenSeeEmployee={this.openSeeEmployee} />
            <ModalEmployee
              open={this.state.open}
              handleAction={this.handleSave}
              handleChange={this.handleChange}
              data={this.state.dataDetail}
              handleClose={this.close}
              error={errors}
            />
            <ModalSeeEmployee
              open={this.state.openSeeEmployee}
              handleClose={this.closeSeeEmployee}
            />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <DesktopContainer>{children}</DesktopContainer>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => <ResponsiveContainer></ResponsiveContainer>;

export default HomepageLayout;
