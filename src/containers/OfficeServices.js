import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    services: state.services,
    servicesData: state.servicesData,
    selectedServiceData: state.selectedServiceData,
    openServiceDataForm: state.openServiceDataForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    officesByCompany: state.officesByCompany,
    loggedUser: state.loggedUser
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadServices: () => {
      return dispatch(loadData("services", "services"));
    },
    loadServicesData: () => {
      return dispatch(loadData("serviceData", "servicesData"));
    },
    selectServiceData: (event) => {
      dispatch(updateStateAction( { openServiceDataForm: true, message: "" } ));
      return dispatch(loadData("serviceData/" + event.currentTarget.id, "selectedServiceData"));
    },
    addServiceData: (newService) => {
      return dispatch(addData("serviceData", newService, "selectedServiceData", "servicesData"));
    },
    saveServiceDataChanges: (service) => {
      return dispatch(updateData("serviceData", service, "servicesData"));
    },
    deleteServiceData: (serviceId) => {
      return dispatch(deleteData("serviceData", serviceId, "selectedServiceData", "servicesData"));
    },
    clearServiceDataForm: () => {
      return dispatch(updateStateAction( { selectedServiceData: {}, message: "" } ));
    },
    updateMenuHeight: (newHeight) => {
      return dispatch(updateMenuHeightAction(newHeight));
    },
    updateState: (object) => {
      return dispatch(updateStateAction(object));
    },
    loadOfficesByCompany: (companyId) => {
      return dispatch(loadData("offices/byCompany/" + companyId, "officesByCompany"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
