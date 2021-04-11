import React from 'react';
import container from '../containers/ResourceHours'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const EntryCalendarsTable = (props) => (

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
                      <th>Día</th>
                      <th>Hora inicio</th>
                      <th>Hora fin</th>
                    </tr>
                  </thead>

                  <tbody>

                    {props.entryCalendars && props.entryCalendars.filter(e => e.resourceId === resource.id).map((entryCalendar, index) => {
                      return (
                        <tr onClick={props.handleClick} key={index} id={entryCalendar.id} title="Haga clic para editar esta línea" >
                          <td>{props.days && props.days.length > 0 && props.days.find(d => (d.id === entryCalendar.day)).name}</td>
                          <td>{entryCalendar.fromHour}</td>
                          <td>{entryCalendar.toHour}</td>
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

class EntryCalendarForm extends React.Component {

  render() {

    let entryCalendarResource = this.props.entryCalendar.resourceId ? this.props.entryCalendar.resourceId : "";
    let entryCalendarDay = this.props.entryCalendar.day ? this.props.entryCalendar.day : "";
    let entryCalendarFrom = this.props.entryCalendar.fromHour ? this.props.entryCalendar.fromHour : "";
    let entryCalendarTo = this.props.entryCalendar.toHour ? this.props.entryCalendar.toHour : "";
    let validResource = this.props.entryCalendar.resourceId && this.props.entryCalendar.resourceId !== "-1";
    let validDay = this.props.entryCalendar.day && this.props.entryCalendar.day !== "-1";
    let validEntryCalendar = entryCalendarFrom && entryCalendarTo && validResource && validDay;

    return (

      <Collapse dimension="height" in={this.props.openEntryCalendarForm} >
        <div className="collapse-entryCalendar-form" >

          <Row>

            <h4 className="subTitle">{this.props.entryCalendar.id ? 'Editar horario:' : 'Nuevo horario:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

              <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Odontólogo: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="resourceId" value={entryCalendarResource} onChange={this.props.handleEntryCalendarInputChange} disabled={this.props.entryCalendar.id} >
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
                    Día: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control as="select" name="day" value={entryCalendarDay} onChange={this.props.handleEntryCalendarInputChange} disabled={this.props.entryCalendar.id} >
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
                    <Form.Control name="fromHour" value={entryCalendarFrom} onChange={this.props.handleEntryCalendarInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Hora fin: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="toHour" value={entryCalendarTo} onChange={this.props.handleEntryCalendarInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.entryCalendar.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.entryCalendar.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.entryCalendar.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.entryCalendar)} variant="success" disabled={!validEntryCalendar} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.entryCalendar)} variant="success" disabled={!validEntryCalendar} >Agregar </Button>
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

class EntryCalendars extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openEntryCalendarForm: false });
    this.props.clearEntryCalendarForm(); 
    
    if((!this.props.resources || this.props.resources.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourcesByCompany(this.props.loggedUser.companyId);
    }

    if((!this.props.officesByCompany || this.props.officesByCompany.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.entryCalendars || this.props.entryCalendars.length === 0) {
      this.props.loadEntryCalendars();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    if(!this.props.resources && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourcesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.officesByCompany && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadOfficesByCompany(this.props.loggedUser.companyId);
    }

    if(!this.props.entryCalendars) {
      this.props.loadEntryCalendars();
    }

  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Horarios odontólogos</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-entryCalendar-form"
            aria-expanded={this.props.openEntryCalendarForm}
          >
            {this.props.openEntryCalendarForm ? "Ocultar formulario " : "Agregar horario "}  
            {this.props.openEntryCalendarForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <EntryCalendarForm 
          entryCalendar={this.props.selectedEntryCalendar}
          entryCalendars={this.props.entryCalendars}
          resources={this.props.resources} 
          officesByCompany={this.props.officesByCompany}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openEntryCalendarForm={this.props.openEntryCalendarForm} 
          handleClear={this.props.clearEntryCalendarForm} 
          handleEntryCalendarInputChange={this.handleEntryCalendarInputChange} 
          handleEdit={this.props.saveEntryCalendarChanges} 
          handleAdd={this.props.addEntryCalendar} 
          handleDelete={this.props.deleteEntryCalendar}
          days={this.props.days} />

        <Row>

          <EntryCalendarsTable 
            entryCalendars={this.props.entryCalendars} 
            resources={this.props.resources} 
            officesByCompany={this.props.officesByCompany}
            handleClick={this.props.selectEntryCalendar}
            days={this.props.days} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {
    if(this.props.openEntryCalendarForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openEntryCalendarForm: !this.props.openEntryCalendarForm });
    this.props.clearEntryCalendarForm();  
  }

  handleEntryCalendarInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const entryCalendar = { ...this.props.selectedEntryCalendar };
    entryCalendar[name] = value;

    this.props.updateState({
      selectedEntryCalendar: entryCalendar
    });

  }


}

export default container(EntryCalendars); 
