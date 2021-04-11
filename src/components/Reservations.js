import React, { Component } from 'react';
import container from '../containers/Reservations'
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';
import { Button, Row, Col, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import DateTimePicker from 'react-datetime-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';

const env = require('../config/env');

const localizer = momentLocalizer(moment);

const messages = {
    allDay: 'Jornada',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    showMore: total => `${total} eventos más`
  }

  /*const eventsExample = [
      {
          id: 0,
          title: 'Evento de un día completo',
          allDay: true,
          start: new Date(2019, 7, 2),
          end: new Date(2019, 7, 3),
      },
      {
          id: 1,
          title: 'Long Event',
          start: new Date(2015, 3, 7),
          end: new Date(2015, 3, 10),
      },

      {
          id: 2,
          title: 'DTS STARTS',
          start: new Date(2016, 2, 13, 0, 0, 0),
          end: new Date(2016, 2, 20, 0, 0, 0),
      },

      {
          id: 3,
          title: 'DTS ENDS',
          start: new Date(2016, 10, 6, 0, 0, 0),
          end: new Date(2016, 10, 13, 0, 0, 0),
      },

      {
          id: 4,
          title: 'Some Event',
          start: new Date(2015, 3, 9, 0, 0, 0),
          end: new Date(2015, 3, 10, 0, 0, 0),
      },
      {
          id: 5,
          title: 'Conference',
          start: new Date(2015, 3, 11),
          end: new Date(2015, 3, 13),
          desc: 'Big conference for important people',
      },
      {
          id: 6,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 10, 30, 0, 0),
          end: new Date(2015, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting',
      },
      {
          id: 7,
          title: 'Lunch',
          start: new Date(2015, 3, 12, 12, 0, 0, 0),
          end: new Date(2015, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch',
      },
      {
          id: 8,
          title: 'Meeting',
          start: new Date(2015, 3, 12, 14, 0, 0, 0),
          end: new Date(2015, 3, 12, 15, 0, 0, 0),
      },
      {
          id: 9,
          title: 'Happy Hour',
          start: new Date(2015, 3, 12, 17, 0, 0, 0),
          end: new Date(2015, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day',
      },
      {
          id: 10,
          title: 'Dinner',
          start: new Date(2015, 3, 12, 20, 0, 0, 0),
          end: new Date(2015, 3, 12, 21, 0, 0, 0),
      },
      {
          id: 11,
          title: 'Birthday Party',
          start: new Date(2015, 3, 13, 7, 0, 0),
          end: new Date(2015, 3, 13, 10, 30, 0),
      },
      {
          id: 12,
          title: 'Late Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 18, 2, 0, 0),
      },
      {
          id: 12.5,
          title: 'Late Same Night Event',
          start: new Date(2015, 3, 17, 19, 30, 0),
          end: new Date(2015, 3, 17, 23, 30, 0),
      },
      {
          id: 13,
          title: 'Multi-day Event',
          start: new Date(2015, 3, 20, 19, 30, 0),
          end: new Date(2015, 3, 22, 2, 0, 0),
      },
      {
          id: 14,
          title: 'Hoy',
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
      {
          id: 15,
          title: 'Evento de un punto de tiempo',
          start: new Date(),
          end: new Date(),
      },
      {
        id: 16,
        title: 'Evento de un punto de tiempo 2',
        start: new Date(),
        end: new Date(),
    },
    {
        id: 17,
        title: 'Evento de un punto de tiempo 3',
        start: new Date(),
        end: new Date(),
    },
    {
        id: 18,
        title: 'Evento de un punto de tiempo 4',
        start: new Date(),
        end: new Date(),
    },
    ];*/

    class ReservationForm extends React.Component {

      cargarArchivo = () => {
        console.log("Metodo cargar archivo");
        console.log(this.props.reservation);         

        if(this.props.reservation.attach && this.props.reservation.attach.data) {

          const loadedFile = new File(this.props.reservation.attach.data, "Archivo");

          var reader = new FileReader();

          //reader.readAsDataURL(loadedFile); // Funciona para cargar el src de la imagen
          reader.readAsBinaryString(loadedFile);
  
          reader.onload = () => {
    
            console.log("Archivo en cargar archivo")
            console.log(reader.result);

          }

          reader.onerror = (error) => {
            console.log(error);
          }

        }
      }

        render() {
      
          let reservationResource = this.props.reservation.resourceId ? this.props.reservation.resourceId : "";
          let reservationDate = this.props.reservation.fromDate ? new Date(this.props.reservation.fromDate) : new Date();
          let reservationService = this.props.reservation.serviceId ? this.props.reservation.serviceId : "";
          let reservationClient = this.props.reservation.clientId ? this.props.reservation.clientId : "";
          let reservationComment = this.props.reservation.comment ? this.props.reservation.comment : "";
          let validResource = this.props.reservation.resourceId && this.props.reservation.resourceId !== "-1";
          let validService = this.props.reservation.serviceId && this.props.reservation.serviceId !== "-1";
          let validClient = this.props.reservation.clientId && this.props.reservation.clientId !== "-1";
          let validReservation = validResource && validService && validClient;

          this.cargarArchivo();
      
          return (
      
            <Collapse dimension="height" in={this.props.openReservationForm} >
              <div className="collapse-reservation-form" >
      
                <Row>
      
                  <h4 className="subTitle">{this.props.reservation.id ? 'Editar reserva:' : 'Nueva reserva:'}</h4>
      
                </Row>
      
                <Row>
      
                  <div className="formContainer">
      
                    <Form>
      
                      <Form.Group as={Row}>
                        <Form.Label column sm="4" lg="3" xl="2">
                          Odontólogo: *
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <Form.Control as="select" name="resourceId" value={reservationResource} onChange={this.props.handleReservationInputChange} >
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
                          Fecha: *
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <DateTimePicker
                            onChange={date => this.props.handleSelectDate(date)}
                            value={reservationDate}
                            clearIcon={null}
                            calendarIcon={<FaRegCalendarAlt />}
                            disableClock={true}
                            className="form-control"
                          />
                        </Col>
                      </Form.Group> 

                      <Form.Group as={Row}>
                        <Form.Label column sm="4" lg="3" xl="2">
                          Servicio: *
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <Form.Control as="select" name="serviceId" value={reservationService} onChange={this.props.handleReservationInputChange} >
                            <option value="-1" >Seleccione un Servicio</option>
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
                          Cliente: *
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <Form.Control as="select" name="clientId" value={reservationClient} onChange={this.props.handleReservationInputChange} >
                            <option value="-1" >Seleccione un Cliente</option>
                            {this.props.clients && this.props.clients.map((client, index) => {
                                return (
                                    <option value={client.id} key={index + 1} >{client.name}</option>
                                )
                            })}
                          </Form.Control>
                        </Col>
                      </Form.Group>
      
                      <Form.Group as={Row}>
                        <Form.Label column sm="4" lg="3" xl="2">
                          Comentario:
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <Form.Control name="comment" value={reservationComment} onChange={this.props.handleReservationInputChange} />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="4" lg="3" xl="2">
                          Archivo adjunto:
                          </Form.Label>
                        <Col sm="8" lg="9" xl="10">
                          <Form.Control type="file" name="selectfile" onChange={e => this.props.handleSelectFile(e)} />
                        </Col>
                      </Form.Group>
      
                    </Form>

                    <img src={this.props.reservation.src} className="preview" alt="No hay ninuna imagen cargada" />
      
                    {!this.props.loading && <div className="footer">
      
                      {this.props.reservation.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.reservation.id)} variant="danger" >Borrar </Button>}
      
                      <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>
      
                      {this.props.reservation.id ?
                        <Button className="button" onClick={() => this.props.handleEdit(this.props.reservation)} variant="success" disabled={!validReservation} >Guardar cambios </Button>
                        :
                        <Button className="button" onClick={() => this.props.handleAdd(this.props.reservation)} variant="success" disabled={!validReservation} >Agregar </Button>
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

class Reservations extends Component {

  state = {
    events: [],
    start: moment().startOf('month').subtract(7, 'days'),
    end: moment().endOf('month').add(7, 'days'),
    errorMessage: ""
  };

  componentDidMount = () => {

    this.props.updateState({ openReservationForm: false });

    this.props.clearReservationForm(); 
    
    if(!this.props.services || this.props.services.length === 0) {
      this.props.loadServices();
    }

    if(!this.props.clients || this.props.clients.length === 0) {
      this.props.loadClients();
    }

    if((!this.props.resources || this.props.resources.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourcesByCompany(this.props.loggedUser.companyId);
    }

    if((!this.props.resourceServices || this.props.resourceServices.length === 0) && this.props.loggedUser && this.props.loggedUser.companyId) {
      this.props.loadResourceServices();
    }

    this.loadReservations();

    this.props.updateMenuHeight(window.innerHeight - 50);

  }

  componentDidUpdate = (prevProps, prevState) => {
    if(!this.props.services || this.props.services.length === 0) {
      this.props.loadServices();
    }
  }

  render() {

    return (
      <div>
        <Row>

            <h1 className="title">Reservas</h1>
            <div className="linkAdd" onClick={this.showHideForm} 
                aria-controls="collapse-reservation-form"
                aria-expanded={this.props.openReservationForm}
            >
                {this.props.openReservationForm ? "Ocultar formulario " : "Agregar reserva "}  
                {this.props.openReservationForm ? <FaAngleUp/> : <FaAngleDown/>}  
            </div>

        </Row>

        <ReservationForm 
          reservation={this.props.selectedReservation}
          reservations={this.props.reservations}
          resources={this.props.resources}
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openReservationForm={this.props.openReservationForm} 
          handleClear={this.props.clearReservationForm} 
          handleReservationInputChange={this.handleReservationInputChange} 
          handleSelectDate={this.handleSelectDate}
          handleSelectFile={this.handleSelectFile}
          handleEdit={this.saveReservationChanges} 
          handleAdd={this.addReservation} 
          handleDelete={this.deleteReservation}
          services={this.props.services}
          clients={this.props.clients} />

        <Row>

            <ul className="textInfo">                
                <li>Haga clic sobre un número de día para acceder a él.</li>
                <li>Haga clic sobre una reserva para seleccionarla.</li>
            </ul>            

        </Row>

        <Row>

            <div className="calendarContainer">

                <div className="calendarErrorMessage">
                    {this.state.errorMessage}
                </div>

                <Calendar
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    messages={messages}                  
                    onRangeChange={(range) => this.handleRangeChange(range)}
                    onSelectEvent={(event) => this.props.selectReservation(event.id)}
                    eventPropGetter={(event) => ({className: event.done ? "eventDone" : "notDone" })}
                />

            </div>

        </Row>
      </div>
    );
  }

  showHideForm = () => {
    if(this.props.openRerervationForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openReservationForm: !this.props.openReservationForm });
    this.props.clearReservationForm();  
  }

  loadReservations = () => { 

    let start = moment(this.state.start).format("YYYYMMDD");
    let end = moment(this.state.end).format("YYYYMMDD");

    axios.get(env.server_url + "/reservations/rangeReservations/" + start + "/" + end)
        .then((response) => {

            let events = response.data.map(
                function (reservation) {
                    
                    const id = reservation.id;
                    const title = reservation.title;
                    let start = new Date(reservation.start);
                    let end = new Date(reservation.end);   //(new Date(reservation.end).setHours(new Date(reservation.end).getHours() - 3));
                    const done = reservation.done;
                                        
                    return (
                        {
                            id,
                            title,
                            start,
                            end,
                            done
                        }
                    )
                }
            );

            this.setState(
                {
                    events,
                    errorMessage: ""
                }
            );

        })
        .catch(error => {
            console.log(error.response ? error.response.data : error);
            this.setState(
              {
                errorMessage: "Hubo un error al cargar las reservas" + (error.response ? "" : ", no hay conexión con el servidor de datos")
              }
            );

          });

  };

  handleRangeChange = (range) => {

    if(range.start && range.end) {

        this.setState(
            {
                start: range.start,
                end: range.end,
                events: []
            }
        );

    } else {

        let end = (new Date(range[range.length-1]).setHours(new Date(range[range.length-1]).getHours() + 24));

        this.setState(
            {
                start: range[0],
                end: end,
                events: []
            }
        );

    }  

    this.loadReservations();

  };

  handleReservationInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const reservation = { ...this.props.selectedReservation };
    reservation[name] = value;

    this.props.updateState({
      selectedReservation: reservation
    });

  }

  addReservation = (reservation) => {

    let fromDate = moment(reservation["fromDate"]).format("YYYY/MM/DD HH:mm");
    // eslint-disable-next-line
    let officeId = this.props.resources.find(r => (r.id == reservation["resourceId"])).officeId;
    const newReservation = { ...reservation };
    newReservation["fromDate"] = fromDate;
    newReservation["officeId"] = officeId;
    newReservation["companyId"] = this.props.loggedUser.companyId;
    newReservation["src"] = null;

    axios.post(env.server_url + "/reservations", newReservation)
        .then((response) => {

          this.loadReservations();

          this.props.updateState({
            message: "Se agregó correctamente.", 
            messageClass: "formOkMessage"
          });

        })
        .catch(error => {
            console.log(error.response ? error.response.data : error);
            this.props.updateState({
              message: "Hubo un error al agregar la reserva, " + (error.response ? error.response.data : "no hay conexión con el servidor de datos"), 
              messageClass: "formErrorMessage"
            });

          });
  

  }

  saveReservationChanges = (reservation) => {

    let fromDate = moment(reservation["fromDate"]).format("YYYY/MM/DD HH:mm");
    let toDate = moment(reservation["toDate"]).format("YYYY/MM/DD HH:mm");
    // eslint-disable-next-line
    let officeId = this.props.resources.find(r => (r.id == reservation["resourceId"])).officeId;
    const newReservation = { ...reservation };
    newReservation["fromDate"] = fromDate;
    newReservation["toDate"] = toDate;
    newReservation["officeId"] = officeId;
    newReservation["companyId"] = this.props.loggedUser.companyId;
    console.log(newReservation);
  
    axios.put(env.server_url + "/reservations/" + newReservation.id, newReservation)
        .then((response) => {

          this.loadReservations();

          this.props.updateState({
            message: "Se modificó correctamente.", 
            messageClass: "formOkMessage"
          });

        })
        .catch(error => {
            console.log(error.response ? error.response.data : error);
            this.props.updateState({
              message: "Hubo un error al modificar la reserva, " + (error.response ? error.response.data : "no hay conexión con el servidor de datos"), 
              messageClass: "formErrorMessage"
            });

          });
  

  }

  deleteReservation = (reservationId) => {
  
    axios.delete(env.server_url + "/reservations/" + reservationId)
        .then((response) => {

          this.loadReservations();

          this.props.updateState({
            message: "Se eliminó correctamente.", 
            messageClass: "formOkMessage"
          });

        })
        .catch(error => {
            console.log(error.response ? error.response.data : error);
            this.props.updateState({
              message: "Hubo un error al eliminar la reserva, " + (error.response ? error.response.data : "no hay conexión con el servidor de datos"), 
              messageClass: "formErrorMessage"
            });

          });
  

  }

  handleSelectDate = (date) => {

    const reservation = { ...this.props.selectedReservation };
    reservation["fromDate"] = date;

    this.props.updateState({
      selectedReservation: reservation
    });

  }

  handleSelectFile = (e) => {

    const reservation = { ...this.props.selectedReservation };
    
    const loadedFile = e.target.files[0];

    if(loadedFile) {

      reservation["attach"] = loadedFile;

      var reader = new FileReader();

      reader.readAsDataURL(loadedFile); // Funciona para cargar el src de la imagen
      //reader.readAsBinaryString(loadedFile); // Para intentar mandar binario pero no funciona
  
      reader.onload = () => {
        
        reservation["src"] = reader.result;
        //reservation["attach"] = reader.result; // Al probar con BinaryString

        this.props.updateState({
          selectedReservation: reservation
        });
    
        console.log("Reserva en handleSelectedFile")
        console.log(reservation);

      }

      reader.onerror = (error) => {
        console.log(error);
      }

    }

  }

}

export default container(Reservations);