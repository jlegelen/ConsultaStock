import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    services: state.services,
    selectedService: state.selectedService,
    openServiceForm: state.openServiceForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadServices: () => {
      return dispatch(loadData("services", "services"));
    },
    selectService: (event) => {
      dispatch(updateStateAction( { openServiceForm: true, message: "" } ));
      return dispatch(loadData("services/" + event.currentTarget.id, "selectedService"));
    },
    addService: (newService) => {
      return dispatch(addData("services", newService, "selectedService", "services"));
    },
    saveServiceChanges: (service) => {
      return dispatch(updateData("services", service, "services"));
    },
    deleteService: (serviceId) => {
      return dispatch(deleteData("services", serviceId, "selectedService", "services"));
    },
    clearServiceForm: () => {
      return dispatch(updateStateAction( { selectedService: {}, message: "" } ));
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
