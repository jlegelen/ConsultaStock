import React from 'react';
import container from '../containers/User'
import axios from 'axios';
import '../App.css'
import { Button, Row, Col, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
const env = require('../config/env');

class ChangePasswordForm extends React.Component {

  state = {
    actualPassword: "",
    newPassword: "",
    passwordConfirmation: "",
    openPasswordForm: false,
    message: "",
    messageClass: "",
    loading: false
  };

  render() {

    let validPassword = this.state.actualPassword && this.state.newPassword && this.state.newPassword === this.state.passwordConfirmation;

    return (
      <div>
        <div className="linkAdd" onClick={this.showHideForm} 
          aria-controls="collapse-password-form"
          aria-expanded={this.state.openPasswordForm}
        >
          {this.state.openPasswordForm ? "Ocultar formulario " : "Cambiar contraseña "}  
          {this.state.openPasswordForm ? <FaAngleUp/> : <FaAngleDown/>}  
        </div>

        <Row>

          <Collapse dimension="height" in={this.state.openPasswordForm} >
          
            <div className="collapse-password-form" >

              <div className="formPasswordContainer">

                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Contraseña actual: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control type="password" name="actualPassword" value={this.state.actualPassword} onChange={this.handleInputChange} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Contraseña nueva: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleInputChange} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Confirmar contraseña: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleInputChange} />
                      {this.state.newPassword !== this.state.passwordConfirmation && <div className="errorMessage">Las contraseñas no coinciden</div>}
                    </Col>
                  </Form.Group>
                </Form>

                <div className="footer">

                  <Button className="button" onClick={this.changePassword} variant="success" disabled={!validPassword} >Cambiar contraseña </Button>

                </div>

                <div className="loadingDivForm" >
                  {this.state.loading && <img src="/loading.gif" alt="procesando..."  />}
                </div>

                <div className={this.state.messageClass}>
                  {this.state.message}
                </div>

              </div>
            </div>
          </Collapse>
        </Row>
      </div>

    )
  }

  showHideForm = () => {
    if(this.state.openPasswordForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.setState({ openPasswordForm: !this.state.openPasswordForm });

  }

  handleInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  }

  changePassword = () => {

    this.setState(
      {
        message: "",
        messageClass: "",
        loading: true
      }
    );

    const data = {
      oldPassword: this.state.actualPassword,
      newPassword: this.state.newPassword
    }

    axios.put(env.server_url + "/users/" + this.props.userId + "/changePassword", data)
      .then((response) => {

        this.setState(
          {
            actualPassword: "",
            newPassword: "",
            passwordConfirmation: "",
            message: response.data,
            messageClass: "formOkMessage",
            loading: false
          }
        );

      })
      .catch(error => {
        console.log(error.response ? error.response.data : error);
        this.setState(
          {
            message: error.response ? error.response.data : "Error, no hay conexión con el servidor de datos",
            messageClass: "formErrorMessage",
            loading: false
          }
        );
      });
  }

}

class UserForm extends React.Component {

  render() {

    let userName = this.props.user.name ? this.props.user.name : "";
    let userLastName = this.props.user.lastName ? this.props.user.lastName : "";
    let userEmail = this.props.user.email ? this.props.user.email : "";
    let userAddress = this.props.user.address ? this.props.user.address : "";
    let userPhone = this.props.user.phone ? this.props.user.phone : "";
    let userGender = this.props.user.gender ? this.props.user.gender : "";
    let formClompleted = this.props.user.name && this.props.user.email;
    let validGender = this.props.user.gender === "Masculino" || this.props.user.gender === "Femenino";
    let validUser = formClompleted && (!this.props.user.gender || validGender);

    return (

      <div>

        <Row>

          <div className="formContainer">

            <Form>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Nombre: *
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control name="name" value={userName} onChange={this.props.handleUserInputChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Apellido:
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control name="lastName" value={userLastName} onChange={this.props.handleUserInputChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Correo electrónico: *
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control name="email" value={userEmail} onChange={this.props.handleUserInputChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Dirección:
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control name="address" value={userAddress} onChange={this.props.handleUserInputChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Teléfono:
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control name="phone" value={userPhone} onChange={this.props.handleUserInputChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="4" lg="3" xl="2">
                  Género:
                  </Form.Label>
                <Col sm="8" lg="9" xl="10">
                  <Form.Control as="select" name="gender" value={userGender} onChange={this.props.handleUserInputChange}>
                    <option value="" >Seleccione una opción</option>
                    <option value="Masculino" >Masculino</option>
                    <option value="Femenino" >Femenino</option>
                  </Form.Control>
                </Col>
              </Form.Group>

            </Form>

            {!this.props.loading && <div className="footer">

              <Button className="button" onClick={() => this.props.handleEdit(this.props.user)} variant="success" disabled={!validUser} >Guardar cambios </Button>

            </div> }

            <div className="loadingDivForm" >
              {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
            </div>

            <div className={this.props.messageClass}>
              {this.props.message}
            </div>
            
          </div>

        </Row>
      </div>

    );
  }

}

class User extends React.Component {

  componentDidMount = () => {

    this.props.updateState({
      selectedUser: { ...this.props.loggedUser },
      message: "",
      messageClass: ""
    });

    this.props.updateMenuHeight(window.innerHeight - 50);

  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.loggedUser.id && !this.props.selectedUser.id) {
      this.props.updateState({
        selectedUser: { ...this.props.loggedUser }
      });
    }
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Mis datos</h1>
        
        </Row>

        <ChangePasswordForm userId={this.props.selectedUser.id} updateMenuHeight={this.props.updateMenuHeight} />

        <UserForm 
          user={this.props.selectedUser} 
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          handleUserInputChange={this.handleUserInputChange} 
          handleEdit={this.props.saveUserChanges} />

      </div>
    );

  }

  handleUserInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const user = { ...this.props.selectedUser };
    user[name] = value;

    this.props.updateState({
      selectedUser: user
    });

  }

}

export default container(User); 
