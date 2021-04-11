import React from 'react';
import container from '../containers/OfficeServices'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const ServicesTable = (props) => (

  <>

    {props.officesByCompany && props.officesByCompany.map((office, index) => {
      return (
        
        <div key={index} className="tableContainer" >

          <h4 className="tableTitle">{office.name}</h4>

          <Table striped bordered hover className="dataTable">

            <thead>
              <tr>
                <th>Nombre servicio</th>
                <th>Costo</th>
                <th>Duración</th>
              </tr>
            </thead>

            <tbody>

              {props.servicesData && props.servicesData.filter(s => s.officeId === office.id).map((service, index) => {
                return (
                  <tr onClick={props.handleClick} key={index} id={service.id} title="Haga clic para editar este servicio" >
                    <td>{props.services && props.services.length > 0 && props.services.find(s => (s.id === service.serviceId)).name}</td>
                    <td>$ {service.cost}</td>
                    <td>{service.duration} minutos</td>
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

class ServiceDataForm extends React.Component {

  render() {

    let serviceOffice = this.props.serviceData.officeId ? this.props.serviceData.officeId : "";
    let serviceId = this.props.serviceData.serviceId ? this.props.serviceData.serviceId : "";
    let serviceCost = this.props.serviceData.cost ? this.props.serviceData.cost : "";
    let serviceDuration = this.props.serviceData.duration ? this.props.serviceData.duration : "";
    let validServiceData = serviceCost && serviceDuration;

    return (

      <Collapse dimension="height" in={this.props.openServiceDataForm} >
        <div className="collapse-service-form" >

          <Row>

            <h4 className="subTitle">{this.props.serviceData.id ? 'Editar servicio:' : 'Nuevo servicio:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

              <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Servicio: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="serviceId" value={serviceId} onChange={this.props.handleServiceDataInputChange} disabled={this.props.serviceData.id} >
                      <option value="-1" >Seleccione un Serivicio</option>
                      {this.props.services && this.props.services.map((service, index) => {
                          return (
                              <option value={service.id} key={index + 1} >{service.name}</option>
                          )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group> 

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Consultorio: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="officeId" value={serviceOffice} onChange={this.props.handleServiceDataInputChange} disabled={this.props.serviceData.id} >
                      <option value="-1" >Seleccione un Consultorio</option>
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
                    Costo en pesos: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="cost" value={serviceCost} onChange={this.props.handleServiceDataInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Duración en minutos: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="duration" value={serviceDuration} onChange={this.props.handleServiceDataInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.serviceData.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.serviceData.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.serviceData.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.serviceData)} variant="success" disabled={!validServiceData} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.serviceData)} variant="success" disabled={!validServiceData} >Agregar </Button>
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

class ServicesData extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openServiceDataForm: false });
    this.props.clearServiceDataForm(); 
    
    if(!this.props.services || this.props.services.length === 0) {
      this.props.loadServices();
    }

    if((!this.props.officesByCompany || this.props.officesByCompany.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.servicesData || this.props.servicesData.length === 0) {
      this.props.loadServicesData();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.services) {
      this.props.loadServices();
    }

    if(!this.props.officesByCompany && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.servicesData) {
      this.props.loadServicesData();
    }

  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Servicios consultorios</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-service-form"
            aria-expanded={this.props.openServiceDataForm}
          >
            {this.props.openServiceDataForm ? "Ocultar formulario " : "Agregar servicio "}  
            {this.props.openServiceDataForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <ServiceDataForm 
          serviceData={this.props.selectedServiceData}
          services={this.props.services}
          officesByCompany={this.props.officesByCompany}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openServiceDataForm={this.props.openServiceDataForm} 
          handleClear={this.props.clearServiceDataForm} 
          handleServiceDataInputChange={this.handleServiceDataInputChange} 
          handleEdit={this.props.saveServiceDataChanges} 
          handleAdd={this.props.addServiceData} 
          handleDelete={this.props.deleteServiceData} />

        <Row>

          <ServicesTable 
            services={this.props.services} 
            servicesData={this.props.servicesData} 
            officesByCompany={this.props.officesByCompany}
            handleClick={this.props.selectServiceData} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openServiceDataForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openServiceDataForm: !this.props.openServiceDataForm });
    this.props.clearServiceDataForm();  
  }

  handleServiceDataInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const serviceData = { ...this.props.selectedServiceData };
    serviceData[name] = value;

    this.props.updateState({
      selectedServiceData: serviceData
    });

  }


}

export default container(ServicesData); 
