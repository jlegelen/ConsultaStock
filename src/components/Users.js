import React from 'react';
import container from '../containers/Users'
import '../App.css'
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const UsersTable = (props) => (

  <>

    {props.companys && props.companys.map((company, index) => {
      return (
        
        <div key={index} className="tableContainer" >
        
          <h4 className="tableTitle">{company.name}</h4>

          <Table striped bordered hover className="dataTable">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>        
                <th>Correo electrónico</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Género</th>
                {props.userIsAdmin && <th>Rol</th> }
              </tr>
            </thead>

            <tbody>

              {props.users && props.users.filter(u => u.companyId === company.id).map((user, index) => {
                return (
                  <tr onClick={props.handleClick} key={index} id={user.id} title="Haga clic para editar este usuario" >            
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    {props.userIsAdmin && <td>{props.roles && props.roles.length > 0 && props.roles.find(role => (role.id === user.roleId)).name}</td> }
                  </tr>
                )
              })}

            </tbody>

          </Table>

        </div>
      )
    })}

  </>

);

class UserForm extends React.Component {

  render() {

    let userCompany = this.props.user.companyId ? this.props.user.companyId : "";
    let userName = this.props.user.name ? this.props.user.name : "";
    let userLastName = this.props.user.lastName ? this.props.user.lastName : "";
    let userEmail = this.props.user.email ? this.props.user.email : "";
    let userPassword = this.props.user.password ? this.props.user.password : "";
    let userAddress = this.props.user.address ? this.props.user.address : "";
    let userPhone = this.props.user.phone ? this.props.user.phone : "";
    let userGender = this.props.user.gender ? this.props.user.gender : "";
    let userRole = this.props.user.roleId ? this.props.user.roleId : "";
    let formCompleted = this.props.user.name && this.props.user.email && (this.props.user.password || this.props.user.id) 
      && ((this.props.user.companyId && this.props.user.roleId) || !this.props.userIsAdmin);
    let validCompany = this.props.user.companyId !== "-1" || !this.props.userIsAdmin;
    let validGender = this.props.user.gender === "Masculino" || this.props.user.gender === "Femenino";
    let validPassword = userPassword === this.props.passwordConfirmation;
    let validRole = this.props.user.roleId !== "-1" || !this.props.userIsAdmin;
    let validUser = formCompleted && validCompany && (!this.props.user.gender || validGender) && validPassword && validRole;

    return (

      <Collapse dimension="height" in={this.props.openUserForm} >
        <div className="collapse-user-form" >

          <Row>

            <h4 className="subTitle">{this.props.user.id ? 'Editar usuario:' : 'Nuevo usuario:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

                {this.props.userIsAdmin && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Empresa: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control as="select" name="companyId" value={userCompany} onChange={this.props.handleUserInputChange} disabled={this.props.user.id}>
                        <option value="-1" >Seleccione una Empresa</option>
                        {this.props.companys && this.props.companys.map((company, index) => {
                            return (
                                <option value={company.id} key={index + 1} >{company.name}</option>
                            )
                        })}
                      </Form.Control>
                    </Col>
                  </Form.Group> 
                }

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

                {!this.props.user.id && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Contraseña: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control type="password" name="password" value={userPassword} onChange={this.props.handleUserInputChange} />
                    </Col>
                  </Form.Group>
                }

                {!this.props.user.id && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Confirmar contraseña: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control type="password" name="passwordConfirmation" value={this.props.passwordConfirmation} onChange={this.props.handleInputChange} />
                      {!validPassword && <div className="errorMessage">Las contraseñas no coinciden</div>}
                    </Col>
                  </Form.Group>
                }

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

                {this.props.userIsAdmin && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Rol: *
                    </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control as="select" name="roleId" value={userRole} onChange={this.props.handleUserInputChange} disabled={this.props.user.id} >
                        <option value="-1" >Seleccione un Rol</option>
                        {this.props.roles && this.props.roles.map((role, index) => {
                            return (
                                <option value={role.id} key={index + 1} >{role.name}</option>
                            )
                        })}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                }

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.user.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.user.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.user.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.user)} variant="success" disabled={!validUser} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.user)} variant="success" disabled={!validUser} >Agregar </Button>
                }

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
      </Collapse>

    );
  }

}

class Users extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openUserForm: false });
    this.props.clearUserForm();  

    if((!this.props.companys || this.props.companys.length === 0) && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if((!this.props.roles || this.props.roles.length === 0) && this.userIsAdmin()) {
      this.props.loadRoles();
    }

    if(!this.props.users || this.props.users.length === 0) {
      this.loadUsers();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);

  }

  componentDidUpdate = (prevProps, prevState) => {

    if(this.props.selectedUser.id && this.props.selectedUser.id !== prevProps.selectedUser.id) {
      this.props.updateState({
        passwordConfirmation: this.props.selectedUser.password
      });
    }

    if((!this.props.companys || this.props.companys.length === 0) && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if((!this.props.roles || this.props.roles.length === 0) && this.userIsAdmin()) {
      this.props.loadRoles();
    }

    if(!this.props.users || this.props.users.length === 0) {
      this.loadUsers();
    }
    
  }

  loadUsers = () => {

    if(this.userIsAdmin()) {
      this.props.loadUsers();
    } else {
      if(this.props.loggedUser.companyId) {

        this.props.loadUsersByCompany(this.props.loggedUser.companyId);

      }
    }
    
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Usuarios</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-user-form"
            aria-expanded={this.props.openUserForm}
          >
            {this.props.openUserForm ? "Ocultar formulario " : "Agregar usuario "}  
            {this.props.openUserForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <UserForm 
          user={this.props.selectedUser} 
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openUserForm={this.props.openUserForm} 
          handleClear={this.props.clearUserForm} 
          handleUserInputChange={this.handleUserInputChange} 
          handleEdit={this.saveUserChanges} 
          handleAdd={this.addUser} 
          handleDelete={this.deleteUser}
          passwordConfirmation={this.props.passwordConfirmation}
          companys={this.props.companys}
          userIsAdmin={this.userIsAdmin()}
          roles={this.props.roles} 
          handleInputChange={this.handleInputChange} />

        <Row>

          <UsersTable 
            users={this.props.users} 
            companys={(this.userIsAdmin()|| !this.props.loggedUser) ? this.props.companys : [{id: this.props.loggedUser.companyId}]} 
            roles={this.props.roles} 
            handleClick={this.props.selectUser}
            userIsAdmin={this.userIsAdmin()} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openUserForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openUserForm: !this.props.openUserForm });
    this.props.clearUserForm();  
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

  handleInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    this.props.updateState({
      [name]: value
    });

  }

  addUser = (user) => {

    if(!user.companyId && !user.roleId) {
      user.companyId = this.props.loggedUser.companyId;
      user.roleId = this.props.loggedUser.roleId;
    }

    this.props.addUser(user);

  }

  deleteUser = (userId) => {
    if(userId !== this.props.loggedUser.id) {
      this.props.deleteUser(userId);
    } else {
      this.props.updateState({
        message: "No puede eliminar su propio usuario",
        messageClass: "formErrorMessage"
      });
    }    
  }

  saveUserChanges = (user) => {
    if(user.id !== this.props.loggedUser.id) {
      this.props.saveUserChanges(user);
    } else {
      this.props.updateState({
        message: "Para modificar sus propios datos debe acceder a la página 'Mis datos' desde el menú de usuario logueado",
        messageClass: "formErrorMessage"
      });
    }    
  }

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }

}

export default container(Users); 
