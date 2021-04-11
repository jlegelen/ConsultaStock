import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    companys: state.companys,
    clients: state.clients,
    selectedClient: state.selectedClient,
    openClientForm: state.openClientForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadCompanys: () => {
      return dispatch(loadData("companys", "companys"));
    },
    loadClients: () => {
      return dispatch(loadData("clients", "clients"));
    },
    loadClientsByCompany: (companyId) => {
      return dispatch(loadData("clients/byCompany/" + companyId, "clients"));
    },
    selectClient: (event) => {
      dispatch(updateStateAction( { openClientForm: true, message: "" } ));
      return dispatch(loadData("clients/" + event.currentTarget.id, "selectedClient"));
    },
    addClient: (newClient) => {
      return dispatch(addData("clients", newClient, "selectedClient", "clients"));
    },
    saveClientChanges: (client) => {
      return dispatch(updateData("clients", client, "clients"));
    },
    deleteClient: (clientId) => {
      return dispatch(deleteData("clients", clientId, "selectedClient", "clients"));
    },
    clearClientForm: () => {
      return dispatch(updateStateAction( { selectedClient: {}, message: "" } ));
    },
    updateMenuHeight: (newHeight) => {
      return dispatch(updateMenuHeightAction(newHeight));
    },
    updateState: (object) => {
      return dispatch(updateStateAction(object));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
