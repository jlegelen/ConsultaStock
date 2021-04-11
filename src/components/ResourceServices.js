import React from 'react';
import container from '../containers/ResourceServices'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const ResourceServicesTable = (props) => (

  <>

    {props.officesByCompany && props.officesByCompany.map((office, index) => {
      return (
        
        <div key={index} className="tableContainer" >

          <h4 className="tableTitle">{office.name}</h4>

          {props.resources && props.resources.filter(r => r.officeId === office.id).map((resource, resourceIndex) => {
            return (
              
              <div key={resourceIndex} className="tableContainer" >

                <h5 className="tableTitle">{resource.name}</h5>

                <Table striped bordered hover className="dataTable">

                  <thead>
                    <tr>
                      <th>Servicios</th>
                    </tr>
                  </thead>

                  <tbody>

                    {props.resourceServices && props.resourceServices.filter(r => r.resourceId === resource.id).map((resourceService, index) => {
                      return (
                        <tr onClick={props.handleClick} key={index} id={resourceService.id} title="Haga clic para editar esta línea" >
                          <td>{props.services && props.services.length > 0 && props.services.find(s => (s.id === resourceService.serviceId)).name}</td>
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

  </>

);

class ResourceServiceForm extends React.Component {

  render() {

    let resourceServiceResource = this.props.resourceService.resourceId ? this.props.resourceService.resourceId : "";
    let resourceServiceService = this.props.resourceService.serviceId ? this.props.resourceService.serviceId : "";
    let validResource = this.props.resourceService.resourceId && this.props.resourceService.resourceId !== "-1";
    let validService = this.props.resourceService.serviceId && this.props.resourceService.serviceId !== "-1";
    let validResourceService = validResource && validService;

    return (

      <Collapse dimension="height" in={this.props.openResourceServiceForm} >
        <div className="collapse-resourceService-form" >

          <Row>

            <h4 className="subTitle">{this.props.resourceService.id ? 'Eliminar servicio:' : 'Nuevo servicio:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

              <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Odontólogo: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="resourceId" value={resourceServiceResource} onChange={this.props.handleResourceServiceInputChange} disabled={this.props.resourceService.id} >
                      <option value="-1" >Seleccione un Odontólogo</option>
                      {this.props.resources && this.props.resources.map((resource, index) => {
                          return (
                              <option value={resource.id} key={index + 1} >{resource.name}</option>
                          )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group> 

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Servicio: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="serviceId" value={resourceServiceService} onChange={this.props.handleResourceServiceInputChange} disabled={this.props.resourceService.id} >
                      <option value="-1" >Seleccione un servicio</option>
                      {this.props.services && this.props.services.map((service, index) => {
                          return (
                              <option value={service.id} key={index + 1} >{service.name}</option>
                          )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group> 

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.resourceService.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.resourceService.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {!this.props.resourceService.id &&
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.resourceService)} variant="success" disabled={!validResourceService} >Agregar </Button>
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

class ResourceServices extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openResourceServiceForm: false });
    this.props.clearResourceServiceForm(); 

    if(!this.props.services || this.props.services.length === 0) {
      this.props.loadServices();
    }
    
    if((!this.props.resources || this.props.resources.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourcesByCompany(this.props.loggedUser.companyId);
    }

    if((!this.props.officesByCompany || this.props.officesByCompany.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if((!this.props.resourceServices || this.props.resourceServices.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourceServices();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.services) {
      this.props.loadServices();
    }

    if(!this.props.resources && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourcesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.officesByCompany && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.resourceServices && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourceServices();
    }

  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Servicios por odontólogo</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-resourceService-form"
            aria-expanded={this.props.openResourceServiceForm}
          >
            {this.props.openResourceServiceForm ? "Ocultar formulario " : "Agregar servicio "}  
            {this.props.openResourceServiceForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <ResourceServiceForm 
          resourceService={this.props.selectedResourceService}
          resourceServices={this.props.resourceServices}
          resources={this.props.resources} 
          officesByCompany={this.props.officesByCompany}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openResourceServiceForm={this.props.openResourceServiceForm} 
          handleClear={this.props.clearResourceServiceForm} 
          handleResourceServiceInputChange={this.handleResourceServiceInputChange} 
          handleAdd={this.props.addResourceService} 
          handleDelete={this.props.deleteResourceService}
          services={this.props.services} />

        <Row>

          <ResourceServicesTable 
            resourceServices={this.props.resourceServices} 
            resources={this.props.resources} 
            officesByCompany={this.props.officesByCompany}
            handleClick={this.props.selectResourceService}
            services={this.props.services} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openResourceServiceForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openResourceServiceForm: !this.props.openResourceServiceForm });
    this.props.clearResourceServiceForm();  
  }

  handleResourceServiceInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const resourceService = { ...this.props.selectedResourceService };
    resourceService[name] = value;

    this.props.updateState({
      selectedResourceService: resourceService
    });

  }


}

export default container(ResourceServices); 
