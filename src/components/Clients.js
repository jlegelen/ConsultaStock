import React from 'react';
import container from '../containers/Clients'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const ClientsTable = (props) => (

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
                <th>Dirección</th>
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Género</th>
              </tr>
            </thead>

            <tbody>

              {props.clients && props.clients.filter(c => c.companyId === company.id).map((client, index) => {
                return (
                  <tr onClick={props.handleClick} key={index} id={client.id} title="Haga clic para editar este cliente" >            
                    <td>{client.name}</td>
                    <td>{client.lastName}</td>
                    <td>{client.address}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.gender}</td>
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

class ClientForm extends React.Component {

  render() {

    let clientCompany = this.props.client.companyId ? this.props.client.companyId : "";
    let clientName = this.props.client.name ? this.props.client.name : "";
    let clientLastName = this.props.client.lastName ? this.props.client.lastName : "";
    let clientEmail = this.props.client.email ? this.props.client.email : "";
    let clientAddress = this.props.client.address ? this.props.client.address : "";
    let clientPhone = this.props.client.phone ? this.props.client.phone : "";
    let clientGender = this.props.client.gender ? this.props.client.gender : "";
    let formClompleted = this.props.client.name && this.props.client.email && (this.props.client.companyId || !this.props.userIsAdmin);
    let validCompany = this.props.client.companyId !== "-1" || !this.props.userIsAdmin;
    let validGender = this.props.client.gender === "M" || this.props.client.gender === "F" || !this.props.client.gender;
    let validClient = formClompleted && validCompany && validGender;

    return (

      <Collapse dimension="height" in={this.props.openClientForm} >
        <div className="collapse-client-form" >

          <Row>

            <h4 className="subTitle">{this.props.client.id ? 'Editar cliente:' : 'Nuevo cliente:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

                {this.props.userIsAdmin && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Empresa: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control as="select" name="companyId" value={clientCompany} onChange={this.props.handleClientInputChange} disabled={this.props.client.id}>
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
                    <Form.Control name="name" value={clientName} onChange={this.props.handleClientInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Apellido:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="lastName" value={clientLastName} onChange={this.props.handleClientInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Correo electrónico: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="email" value={clientEmail} onChange={this.props.handleClientInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Dirección:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="address" value={clientAddress} onChange={this.props.handleClientInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Teléfono:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="phone" value={clientPhone} onChange={this.props.handleClientInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Género:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="gender" value={clientGender} onChange={this.props.handleClientInputChange}>
                      <option value="" >Seleccione una opción</option>
                      <option value="M" >Masculino</option>
                      <option value="F" >Femenino</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.client.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.client.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.client.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.client)} variant="success" disabled={!validClient} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.client)} variant="success" disabled={!validClient} >Agregar </Button>
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

class Clients extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openClientForm: false });
    this.props.clearClientForm();

    if((!this.props.companys || this.props.companys.length === 0) && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if(!this.props.clients || this.props.clients.length === 0) {
      this.loadClients();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);

  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.companys && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if(!this.props.clients) {
      this.loadClients();
    }
  
  }

  loadClients = () => {

    if(this.userIsAdmin()) {
      this.props.loadClients();
    } else {
      if(this.props.loggedUser && this.props.loggedUser.companyId) {

        this.props.loadClientsByCompany(this.props.loggedUser.companyId);

      }
    }
    
  }
  
  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Clientes</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-client-form"
            aria-expanded={this.props.openClientForm}
          >
            {this.props.openClientForm ? "Ocultar formulario " : "Agregar cliente "}  
            {this.props.openClientForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <ClientForm 
          client={this.props.selectedClient} 
          companys={this.props.companys}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openClientForm={this.props.openClientForm} 
          handleClear={this.props.clearClientForm} 
          handleClientInputChange={this.handleClientInputChange} 
          handleEdit={this.props.saveClientChanges} 
          handleAdd={this.addClient} 
          handleDelete={this.props.deleteClient}
          userIsAdmin={this.userIsAdmin()} />

        <Row>

          <ClientsTable 
            clients={this.props.clients}
            companys={(this.userIsAdmin() || !this.props.loggedUser) ? this.props.companys : [{id: this.props.loggedUser.companyId}]}  
            handleClick={this.props.selectClient} 
            userIsAdmin={this.userIsAdmin()} 
          />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>
          
        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openClientForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openClientForm: !this.props.openClientForm });
    this.props.clearClientForm();  
  }

  handleClientInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const client = { ...this.props.selectedClient };
    client[name] = value;

    this.props.updateState({
      selectedClient: client
    });

  }

  addClient = (client) => {

    if(!client.companyId) {
      client.companyId = this.props.loggedUser.companyId;
    }

    this.props.addClient(client);

  }

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }


}

export default container(Clients); 
