import mainReducer from './reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


export const initialState = {
  loading: false,
  message: "",
  messageClass: "formErrorMessage",
  loggedUser: null,
  menuHeight: 200,
  companys: null,
  selectedCompany: {},
  openCompanyForm: false,
  offices: null,
  officesByCompany: null,
  selectedOffice: {},
  openOfficeForm: false,
  users: null,
  selectedUser: {},
  openUserForm: false,
  passwordConfirmation: "",
  roles: null,
  clients: null,
  selectedClient: {},
  openClientForm: false,
  services: null,
  stocks: null,
  selectedService: {},
  selectedStock: {},
  openServiceForm: false,
  openStockForm: false,
  servicesData: null,
  stocksData: null,
  selectedServiceData: {},
  selectedStockData: {},
  openServiceDataForm: false,
  openStockDataForm: false,
  resources: null,
  selectedResource: {},
  openResourceForm: false,
  entryCalendars: null,
  selectedEntryCalendar: {},
  reservations: [],
  selectedReservation: {},
  openEntriCalendarForm: false,
  officeHours: null,
  selectedOfficeHour: {},
  openOfficeHourForm: false,
  resourceServices: null,
  selectedResourceService: {},
  openResourceServiceForm: false,
  days:[
          {id: 0, name: "Domingo"}, 
          {id: 1, name: "Lunes"}, 
          {id: 2, name: "Martes"}, 
          {id: 3, name: "Miércoles"}, 
          {id: 4, name: "Jueves"}, 
          {id: 5, name: "Viernes"}, 
          {id: 6, name: "Sábado"}
        ]
}


const configureStore = () => { 

  const store = createStore(mainReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

  return store;
}

export default configureStore;