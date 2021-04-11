import React from 'react';
import container from '../containers/OfficeHours'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const OfficeHoursTable = (props) => (

  <>

    {props.officesByCompany && props.officesByCompany.map((office, index) => {
      return (
        
        <div key={index} className="tableContainer" >

          <h4 className="tableTitle">{office.name}</h4>

          <Table striped bordered hover className="dataTable">

            <thead>
              <tr>
                <th>Día</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
              </tr>
            </thead>

            <tbody>

              {props.officeHours && props.officeHours.filter(o => o.officeId === office.id).map((officeHour, index) => {
                return (
                  <tr onClick={props.handleClick} key={index} id={officeHour.id} title="Haga clic para editar esta línea" >
                    <td>{props.days && props.days.length > 0 && props.days.find(d => (d.id === officeHour.day)).name}</td>
                    <td>{officeHour.fromHour}</td>
                    <td>{officeHour.toHour}</td>
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

class OfficeHourForm extends React.Component {

  render() {

    let officeHourOffice = this.props.officeHour.officeId ? this.props.officeHour.officeId : "";
    let officeHourDay = this.props.officeHour.day ? this.props.officeHour.day : "";
    let officeHourFrom = this.props.officeHour.fromHour ? this.props.officeHour.fromHour : "";
    let officeHourTo = this.props.officeHour.toHour ? this.props.officeHour.toHour : "";
    let validOffice = this.props.officeHour.officeId && this.props.officeHour.officeId !== "-1";
    let validDay = this.props.officeHour.day && this.props.officeHour.day !== "-1";
    let validOfficeHour = officeHourFrom && officeHourTo && validOffice && validDay;

    return (

      <Collapse dimension="height" in={this.props.openOfficeHourForm} >
        <div className="collapse-officeHour-form" >

          <Row>

            <h4 className="subTitle">{this.props.officeHour.id ? 'Editar horario:' : 'Nuevo horario:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

              <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Sucursal: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="officeId" value={officeHourOffice} onChange={this.props.handleOfficeHourInputChange} disabled={this.props.officeHour.id} >
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
                    Día: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="day" value={officeHourDay} onChange={this.props.handleOfficeHourInputChange} disabled={this.props.officeHour.id} >
                      <option value="-1" >Seleccione un día</option>
                      {this.props.days && this.props.days.map((day, index) => {
                          return (
                              <option value={day.id} key={index + 1} >{day.name}</option>
                          )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group> 

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Hora inicio: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="fromHour" value={officeHourFrom} onChange={this.props.handleOfficeHourInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Hora fin: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="toHour" value={officeHourTo} onChange={this.props.handleOfficeHourInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.officeHour.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.officeHour.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.officeHour.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.officeHour)} variant="success" disabled={!validOfficeHour} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.officeHour)} variant="success" disabled={!validOfficeHour} >Agregar </Button>
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

class OfficeHours extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openOfficeHourForm: false });
    this.props.clearOfficeHourForm();

    if((!this.props.officesByCompany || this.props.officesByCompany.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.officeHours || this.props.officeHours.length === 0) {
      this.props.loadOfficeHours();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.officesByCompany && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.officeHours) {
      this.props.loadOfficeHours();
    }

  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Horarios sucursales</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-officeHour-form"
            aria-expanded={this.props.openOfficeHourForm}
          >
            {this.props.openOfficeHourForm ? "Ocultar formulario " : "Agregar horario "}  
            {this.props.openOfficeHourForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <OfficeHourForm 
          officeHour={this.props.selectedOfficeHour}
          officeHours={this.props.officeHours}
          officesByCompany={this.props.officesByCompany}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openOfficeHourForm={this.props.openOfficeHourForm} 
          handleClear={this.props.clearOfficeHourForm} 
          handleOfficeHourInputChange={this.handleOfficeHourInputChange} 
          handleEdit={this.props.saveOfficeHourChanges} 
          handleAdd={this.props.addOfficeHour} 
          handleDelete={this.props.deleteOfficeHour}
          days={this.props.days} />

        <Row>

          <OfficeHoursTable 
            officeHours={this.props.officeHours} 
            officesByCompany={this.props.officesByCompany}
            handleClick={this.props.selectOfficeHour}
            days={this.props.days} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openOfficeHourForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openOfficeHourForm: !this.props.openOfficeHourForm });
    this.props.clearOfficeHourForm();  
  }

  handleOfficeHourInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const officeHour = { ...this.props.selectedOfficeHour };
    officeHour[name] = value;

    this.props.updateState({
      selectedOfficeHour: officeHour
    });

  }


}

export default container(OfficeHours); 
