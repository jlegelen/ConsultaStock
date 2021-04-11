import React from 'react';
import container from '../containers/Services'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const ServicesTable = (props) => (

  <Table striped bordered hover className="dataTable">

    <thead>
      <tr>
        <th>Listado de Servicios</th>
      </tr>
    </thead>

    <tbody>

      {props.services && props.services.map((service, index) => {
        return (
          <tr onClick={props.handleClick} key={index} id={service.id} title="Haga clic para editar este servicio" >
            <td>{service.name}</td>
          </tr>
        )
      })}

    </tbody>

  </Table>

);

class ServiceForm extends React.Component {

  render() {

    let serviceName = this.props.service.name ? this.props.service.name : "";
    let validService = this.props.service.name;

    return (

      <Collapse dimension="height" in={this.props.openServiceForm} >
        <div className="collapse-service-form" >

          <Row>

            <h4 className="subTitle">{this.props.service.id ? 'Editar servicio:' : ''}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Adjuntar planilla:
                  </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <input required type="file" name="file" id="file" onChange={this.handleInputChange} 
                     placeholder="Archivo de excel" />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.service.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.service.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.service.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.service)} variant="success" disabled={!validService} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.service)} variant="success" >Agregar </Button>
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
  } 
}

class Services extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openServiceForm: false });
    this.props.clearServiceForm();

    if(!this.props.services || this.props.services.length === 0) {
      this.props.loadServices();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Productos</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-service-form"
            aria-expanded={this.props.openServiceForm}
          >
            {this.props.openServiceForm ? "Ocultar " : "Ingresar planilla excel"}  
            {this.props.openServiceForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <ServiceForm 
          service={this.props.selectedService} 
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openServiceForm={this.props.openServiceForm} 
          handleClear={this.props.clearServiceForm} 
          handleServiceInputChange={this.handleServiceInputChange} 
          handleEdit={this.props.saveServiceChanges} 
          handleAdd={this.props.addService} 
          handleDelete={this.props.deleteService} />

        <Row>

          <ServicesTable services={this.props.services} handleClick={this.props.selectService} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openServiceForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openServiceForm: !this.props.openServiceForm });
    this.props.clearServiceForm();  
  }

  handleServiceInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const service = { ...this.props.selectedService };
    service[name] = value;

    this.props.updateState({
      selectedService: service
    });

  }


}

export default container(Services); 
