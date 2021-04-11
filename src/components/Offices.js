import React from 'react';
import container from '../containers/Offices'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const OfficesTable = (props) => (

  <>

    {props.userIsAdmin && props.companys && props.companys.map((company, index) => {
      return (
        
        <div key={index} className="tableContainer" >
          
          <h4 className="tableTitle" >{company.name}</h4>

          <Table striped bordered hover className="dataTable">

            <thead>
              <tr>
                <th>Nombre consultorio</th>
                <th>Dirección</th>  
                <th>Teléfono</th>     
              </tr>
            </thead>

            <tbody>

              {props.offices && props.offices.filter(o => o.companyId === company.id).map((office, index) => {
                return (
                  <tr onClick={props.handleClick} key={index} id={office.id} title="Haga clic para editar este consultorio" >
                    <td>{office.name}</td>
                    <td>{office.address}</td>
                    <td>{office.phone}</td>
                  </tr>
                )
              })}

            </tbody>

          </Table>

        </div>
      )
    })}

    {!props.userIsAdmin && 

      <Table striped bordered hover className="dataTable">

        <thead>
          <tr>
            <th>Nombre consultorio</th>
            <th>Dirección</th>  
            <th>Teléfono</th>     
          </tr>
        </thead>

        <tbody>

          {props.offices && props.offices.map((office, index) => {
            return (
              <tr onClick={props.handleClick} key={index} id={office.id} title="Haga clic para editar este consultorio" >
                <td>{office.name}</td>
                <td>{office.address}</td>
                <td>{office.phone}</td>
              </tr>
            )
          })}

        </tbody>

      </Table>

    }

  </>

);

class OfficeForm extends React.Component {

  render() {

    let officeCompany = this.props.office.companyId ? this.props.office.companyId : "-1";
    let officeName = this.props.office.name ? this.props.office.name : "";
    let officeAddress = this.props.office.address ? this.props.office.address : "";
    let officePhone = this.props.office.phone ? this.props.office.phone : "";
    let validCompany = this.props.office.companyId !== "-1";
    let formCompleted = this.props.office.companyId && this.props.office.name;
    let validOffice = formCompleted && validCompany;

    return (

      <Collapse dimension="height" in={this.props.openOfficeForm} >
        <div className="collapse-office-form" >

          <Row>

            <h4 className="subTitle">{this.props.office.id ? 'Editar consultorio:' : 'Nuevo consultorio:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

              {this.props.userIsAdmin && <Form.Group as={Row}>
                    <Form.Label column sm="4" lg="3" xl="2">
                      Empresa: *
                      </Form.Label>
                    <Col sm="8" lg="9" xl="10">
                      <Form.Control as="select" name="companyId" value={officeCompany} onChange={this.props.handleOfficeInputChange} disabled={this.props.office.id}>
                        <option value="-1" >Seleccione una Empresa</option>
                        {this.props.companys && this.props.companys.map((company, index) => {
                            return (
                                <option value={company.id} key={index + 1} >{company.name}</option>
                            )
                        })}
                      </Form.Control>
                    </Col>
                  </Form.Group> }

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Nombre consultorio: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="name" value={officeName} onChange={this.props.handleOfficeInputChange} disabled={!this.props.userIsAdmin} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Dirección:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="address" value={officeAddress} onChange={this.props.handleOfficeInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Teléfono:
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="phone" value={officePhone} onChange={this.props.handleOfficeInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.userIsAdmin && this.props.office.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.office.id)} variant="danger" >Borrar </Button>}

                {this.props.userIsAdmin && <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>}

                {this.props.office.id &&
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.office)} variant="success" disabled={!validOffice} >Guardar cambios </Button>
                }

                {this.props.userIsAdmin && !this.props.office.id &&
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.office)} variant="success" disabled={!validOffice} >Agregar </Button>
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

class Offices extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openOfficeForm: false });
    this.props.clearOfficeForm();

    if((!this.props.companys || this.props.companys.length === 0) && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if(!this.props.offices || this.props.offices.length === 0) {
      this.loadOffices();
    }

    this.props.updateMenuHeight(window.innerHeight - 50); 
        
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.companys && this.userIsAdmin()) {
      this.props.loadCompanys();
    }

    if(!this.props.offices) {
      this.loadOffices();
    }
    
  }

  loadOffices = () => {

    if(this.userIsAdmin()) {
      this.props.loadOffices();
    } else {
      if(this.props.loggedUser.companyId) {
        this.props.loadOfficesByCompany(this.props.loggedUser.companyId);

      }
    }
    
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Consultorios</h1>

          {(this.userIsAdmin() || this.props.selectedOffice.id) && <div className="linkAdd" onClick={this.showHideForm} 
              aria-controls="collapse-office-form"
              aria-expanded={this.props.openOfficeForm}
            >
              {this.props.openOfficeForm ? "Ocultar formulario " : "Agregar consultorio "}  
              {this.props.openOfficeForm ? <FaAngleUp/> : <FaAngleDown/>}  
            </div>
          }

        </Row>       

        <OfficeForm 
          office={this.props.selectedOffice} 
          companys={this.props.companys}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openOfficeForm={this.props.openOfficeForm} 
          handleClear={this.props.clearOfficeForm} 
          handleOfficeInputChange={this.handleOfficeInputChange} 
          handleEdit={this.props.saveOfficeChanges} 
          handleAdd={this.props.addOffice} 
          handleDelete={this.props.deleteOffice}
          userIsAdmin={this.userIsAdmin()} />

        <Row>

          <OfficesTable offices={this.props.offices} companys={this.props.companys} handleClick={this.props.selectOffice} userIsAdmin={this.userIsAdmin()} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {

    if(this.props.openOfficeForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }

    this.props.updateState({ openOfficeForm: !this.props.openOfficeForm });
    this.props.clearOfficeForm();
  }

  handleOfficeInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const office = { ...this.props.selectedOffice };
    office[name] = value;

    this.props.updateState({
      selectedOffice: office
    });

  }

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }

}

export default container(Offices); 
