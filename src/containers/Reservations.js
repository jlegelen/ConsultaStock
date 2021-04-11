import { connect } from 'react-redux';
import {loadData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    resourceServices: state.resourceServices,
    selectedReservation: state.selectedReservation,
    openReservationForm: state.openReservationForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser,
    services: state.services,
    clients: state.clients,
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadResourcesByCompany: (companyId) => {
      return dispatch(loadData("resources/byCompany/" + companyId, "resources"));
    },
    loadResourceServices: () => {
      return dispatch(loadData("serviceResources", "resourceServices"));
    },
    loadServices: () => {
      return dispatch(loadData("services", "services"));
    },
    loadClients: () => {
      return dispatch(loadData("clients", "clients"));
    },
    selectReservation: (reservationId) => {
      console.log("selectReservation");
      console.log(reservationId);
      dispatch(updateStateAction( { openReservationForm: true, message: "" } ));
      return dispatch(loadData("reservations/" + reservationId, "selectedReservation"));
    },
    clearReservationForm: () => {
      return dispatch(updateStateAction( { selectedReservation: {}, message: "" } ));
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
