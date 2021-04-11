import { fetchGetRequestAction, fetchGetSuccessAction, fetchGetFailureAction, 
        fetchPostRequestAction, fetchPostSuccessAction, fetchPostFailureAction,
        fetchPutRequestAction, fetchPutSuccessAction, fetchPutFailureAction,
        fetchDeleteRequestAction, fetchDeleteSuccessAction, fetchDeleteFailureAction } from '../actions';
import axios from 'axios';
const env = require('../config/env');

export function loadData(resource, attributName) {
    return function (dispatch) {
      dispatch(fetchGetRequestAction());
      console.log("LOAD DATA");
      console.log(env.server_url + "/" + resource); //para debug
      return axios.get(env.server_url + "/" + resource)
        .then(
          response => {
            console.log("RESPONSE.DATA " + resource);
            console.log(response.data);
            dispatch(fetchGetSuccessAction(attributName, response.data));
          },
          error => {
            console.log("HUBO ERROR EN LOAD DATA " + resource);
            console.log(error);
            if(error.response && error.response.status === 401) {
              if(error.response.data.logout) {
                sessionStorage.removeItem('token');
                delete axios.defaults.headers.common["Authorization"];
              }
            }
            dispatch(fetchGetFailureAction(attributName));
          }
        );
    }
}

export function login(userName, password) {
  return function (dispatch) {
    dispatch(fetchPostRequestAction());
    return axios.post(env.server_url + "/login", { email: userName, password: password })
      .then(
        response => {
          sessionStorage.setItem('token', response.data.token);
          axios.defaults.headers.common['Authorization']  = response.data.token;
          dispatch(fetchPostSuccessAction({loggedUser: response.data.user}));
        }
        
      ).catch(error => {
          console.log(error.response ? error.response.data : error);
          const errorMessage = error.response ? error.response.data.message : "No hay conexión con el servidor de datos";
          dispatch(fetchPostFailureAction({loggedUser: null, message: errorMessage, messageClass: "formErrorMessage"}));
        }
      );
  }
}

export function updateUserByToken() {
  return function (dispatch) {
    dispatch(fetchPostRequestAction());
    return axios.post(env.server_url + "/login/userByToken")
      .then(
        response => {
          dispatch(fetchPostSuccessAction({loggedUser: response.data.user}));
        }
        
      ).catch(error => {
          console.log(error.response ? error.response.data : error);

          var errorMessage = error.response ? error.response.data.message : "No hay conexión con el servidor de datos";

          if(error.response && error.response.status === 401) {
            if(error.response.data.logout) {
              sessionStorage.removeItem('token');
              delete axios.defaults.headers.common["Authorization"];
            } else {
              errorMessage = error.response.data.message;
            }
          }
                    
          dispatch(fetchPostFailureAction({loggedUser: null, message: errorMessage, messageClass: "formErrorMessage"}));
        }
      );
  }
}

export function addData(resource, newData, attributName, listToReload, companyId) {
  return function (dispatch) {
    dispatch(fetchPostRequestAction());
    console.log(env.server_url + "/" + resource);    
    console.log(newData);    
    return axios.post(env.server_url + "/" + resource, newData)
      .then(
        response => {
          if(companyId) {
            dispatch(loadData(resource + "/byCompany/" + companyId, listToReload));
          } else {
            dispatch(loadData(resource, listToReload));
          } 
          dispatch(fetchPostSuccessAction({ [attributName]: {}, message: "Se agregó correctamente.", messageClass: "formOkMessage", passwordConfirmation: "" }))
        }
        
      ).catch(error => {
          console.log(error.response ? error.response.data : error);

          var errorMessage = "Se produjo un error" + (error.response ? ", revise los datos ingresados." : ", no hay conexión con el servidor de datos.");

          if(error.response && error.response.status === 401) {
            if(error.response.data.logout) {
              sessionStorage.removeItem('token');
              delete axios.defaults.headers.common["Authorization"];
            } else {
              errorMessage = error.response.data.message;
            }
          }

          dispatch(fetchPostFailureAction({ message: errorMessage, messageClass: "formErrorMessage"}));
        }
      );
  }
}

export function updateData(resource, newData, listToReload, companyId) {
  return function (dispatch) {
    dispatch(fetchPutRequestAction());
    return axios.put(env.server_url + "/" + resource + "/" + newData.id, newData)
      .then(
        response => {
          if(companyId) {
            dispatch(loadData(resource + "/byCompany/" + companyId, listToReload));
          } else {
            dispatch(loadData(resource, listToReload));
          }          
          dispatch(fetchPutSuccessAction({ message: "Se modificó correctamente.", messageClass: "formOkMessage" }));
        }
        
      ).catch(error => {
          console.log(error.response ? error.response.data : error);

          var errorMessage = "Se produjo un error" + (error.response ? ", revise los datos ingresados." : ", no hay conexión con el servidor de datos.");

          if(error.response && error.response.status === 401) {
            if(error.response.data.logout) {
              sessionStorage.removeItem('token');
              delete axios.defaults.headers.common["Authorization"];
            } else {
              errorMessage = error.response.data.message;
            }
          }
          
          dispatch(fetchPutFailureAction({ message: errorMessage, messageClass: "formErrorMessage"}));
        }
      );
  }
}

export function deleteData(resource, dataId, attributName, listToReload, companyId) {
  return function (dispatch) {
    dispatch(fetchDeleteRequestAction());
    return axios.delete(env.server_url + "/" + resource + "/" + dataId)
      .then(
        response => {
          if(companyId) {
            dispatch(loadData(resource + "/byCompany/" + companyId, listToReload));
          } else {
            dispatch(loadData(resource, listToReload));
          } 
          dispatch(fetchDeleteSuccessAction({ [attributName]: {}, message: "Se eliminó correctamente.", messageClass: "formOkMessage" }));
        }
        
      ).catch(error => {
          console.log(error.response ? error.response.data : error);

          var errorMessage = "Se produjo un error" + (error.response ? "." : ", no hay conexión con el servidor de datos.");

          if(error.response && error.response.status === 401) {
            if(error.response.data.logout) {
              sessionStorage.removeItem('token');
              delete axios.defaults.headers.common["Authorization"];
            } else {
              errorMessage = error.response.data.message;
            }
          }
          
          dispatch(fetchDeleteFailureAction({ message: errorMessage, messageClass: "formErrorMessage"}));
        }
      );
  }
}