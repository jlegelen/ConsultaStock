import React from 'react';
import container from '../containers/Resources'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const ResourcesTable = (props) => (

      <>

        {props.userIsAdmin && props.companys && props.companys.map((company, index) => {
          return (
            
            <div key={index} className="tableContainer" >
              
              <h4 className="tableTitle mainLevel">{company.name}</h4>
    
              {props.offices && props.offices.filter(o => o.companyId === company.id).map((office, officeIndex) => {
                return (
                  
                  <div key={officeIndex} className="tableContainer" >
    
                    <h5 className="tableTitle">{office.name}</h5>
    
                    <Table striped bordered hover className="dataTable">
    
                      <thead>      
                        <tr>
                          <th>Nombre odontólogo</th>
                        </tr>
                      </thead>
    
                      <tbody>
    
                        {props.resources && props.resources.filter(r => r.officeId === office.id).map((resource, index) => {
                          return (
                            <tr onClick={props.handleClick} key={index} id={resource.id} title="Haga clic para editar este odontólogo" >
                              <td>{resource.name}</td>
                            </tr>
                          )
                        })}
    
                      </tbody>
    
                    </Table>
                  
                  </div>
                    
                )
              })}
    
            </div>
          )
        })}
    
        {!props.userIsAdmin && props.officesByCompany && props.officesByCompany.map((office, officeIndex) => {
          return (
            
            <div key={officeIndex} className="tableContainer" >
    
              <h4 className="tableTitle">{office.name}</h4>
    
              <Table striped bordered hover className="dataTable">
    
                <thead>      
                  <tr>
                    <th>Nombre odontólogo</th>
                  </tr>
                </thead>
    
                <tbody>
    
                  {props.resources && props.resources.filter(r => r.officeId === office.id).map((resource, index) => {
                    return (
                      <tr onClick={props.handleClick} key={index} id={resource.id} title="Haga clic para editar este odontólogo" >
                        <td>{resource.name}</td>
                      </tr>
                    )
                  })}
    
                </tbody>
    
              </Table>
            
            </div>
              
          )
        })}
    
      </>

    )

class ResourceForm extends React.Component {

  state = {
    selectedCompanyId: "-1"
  };

  componentDidUpdate = (prevProps, prevState) => {
    
    if(this.state.selectedCompanyId !== prevState.selectedCompanyId) {
      this.props.loadOfficesByCompany(this.state.selectedCompanyId);
    }

    if(this.props.resource.officeId !== prevProps.resource.officeId) {

      var filteredCompanies = (this.props.resource.officeId && this.props.offices && this.props.offices.length > 0) ? this.props.offices.filter(o => o.id === this.props.resource.officeId) : [];
      var resourceCompany = (filteredCompanies && filteredCompanies.length > 0) ? filteredCompanies[0].companyId : this.state.selectedCompanyId;
      
      this.setState(
        {
          selectedCompanyId: resourceCompany
        }
      );
    }
  }

  render() {

    let resourceOffice = this.props.resource.officeId ? this.props.resource.officeId : "";
    let resourceName = this.props.resource.name ? this.props.resource.name : "";
    let validOffice = this.props.resource.officeId && this.props.resource.officeId !== "-1" 
    let validResource = this.props.resource.name && validOffice;

    return (

      <Collapse dimension="height" in={this.props.openResourceForm} >
        <div className="collapse-resource-form" >

          <Row>

            <h4 className="subTitle">{this.props.resource.id ? 'Editar odontólogo:' : 'Nuevo odontólogo:'}</h4>

          </Row>

          <Row>
          
            <div className="formContainer">

              <Form>

              {this.props.userIsAdmin && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Empresa: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control as="select" name="selectedCompanyId" value={this.state.selectedCompanyId} onChange={this.handleInputChange} disabled={this.props.resource.id}>
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
                    Sucursal: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="officeId" value={resourceOffice} onChange={this.props.handleResourceInputChange}  disabled={this.props.userIsAdmin && (!this.state.selectedCompanyId || this.state.selectedCompanyId === "-1")}>
                      <option value="-1" >Seleccione una Sucursal</option>
                      {this.props.officesByCompany && this.props.officesByCompany.map((office, index) => {
                          return (
                              <option value={office.id} key={index + 1} >{office.name}</option>
                          )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group>                 

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Nombre odontólogo: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="name" value={resourceName} onChange={this.props.handleResourceInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.resource.id && <Button className="button" onClick={() => this.handleDelete(this.props.resource.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.handleClear} variant="primary" >Limpiar </Button>

                {this.props.resource.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.resource, this.props.companyId)} variant="success" disabled={!validResource} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.handleAdd(this.props.resource, this.props.companyId)} variant="success" disabled={!validResource} >Agregar </Button>
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

  handleInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  }

  handleClear = () => {
    this.setState(
      {
        selectedCompanyId: "-1"
      }
    )

    this.props.handleClear();
  }

  handleAdd = (resource, companyId) => {
    this.setState(
      {
        selectedCompanyId: "-1"
      }
    )

    this.props.handleAdd(resource, companyId);
  }

  handleDelete = (resourceId) => {
    this.setState(
      {
        selectedCompanyId: "-1"
      }
    )

    this.props.handleDelete(resourceId);
  }

}

class Resources extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openResourceForm: false });
    this.props.clearResourceForm(); 

    if((!this.props.companys || this.props.companys.length === 0) && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if((!this.props.offices || this.props.offices.length === 0) && this.userIsAdmin()) {
      this.props.loadOffices();
    }

    if((!this.props.officesByCompany || this.props.officesByCompany.length === 0) && !this.userIsAdmin() && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.resources || this.props.resources.length === 0) {
      this.loadResources();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.companys && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if(!this.props.offices && this.userIsAdmin()) {
      this.props.loadOffices();
    }

    if(!this.props.officesByCompany && !this.userIsAdmin() && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.resources) {
      this.loadResources();
    }    

  }

  loadResources = () => {

    if(this.userIsAdmin()) {
      this.props.loadResources();
    } else {
      if(this.props.loggedUser && this.props.loggedUser.companyId) {

        this.props.loadResourcesByCompany(this.props.loggedUser.companyId);

      }
    }
    
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Odontólogos</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-resource-form"
            aria-expanded={this.props.openResourceForm}
          >
            {this.props.openResourceForm ? "Ocultar formulario " : "Agregar odontólogo "}  
            {this.props.openResourceForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <ResourceForm 
          resource={this.props.selectedResource} 
          companys={this.props.companys}
          offices={this.props.offices}
          officesByCompany={this.props.officesByCompany}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openResourceForm={this.props.openResourceForm} 
          handleClear={this.props.clearResourceForm} 
          handleResourceInputChange={this.handleResourceInputChange} 
          handleEdit={this.props.saveResourceChanges} 
          handleAdd={this.props.addResource} 
          handleDelete={this.props.deleteResource}
          companyId={!this.userIsAdmin() && this.props.loggedUser ? this.props.loggedUser.companyId : null} 
          userIsAdmin={this.userIsAdmin()}
          loadOfficesByCompany={this.props.loadOfficesByCompany} />

        <Row>

          <ResourcesTable 
            resources={this.props.resources} 
            companys={this.props.companys}
            offices={this.props.offices}
            officesByCompany={this.props.officesByCompany}
            handleClick={this.props.selectResource} 
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
    if(this.props.openResourceForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openResourceForm: !this.props.openResourceForm });
    this.props.clearResourceForm();  
  }

  handleResourceInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const resource = { ...this.props.selectedResource };
    resource[name] = value;

    this.props.updateState({
      selectedResource: resource
    });

  }

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }


}

export default container(Resources); 
