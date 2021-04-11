import { connect } from 'react-redux';
import {loadData, addData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    resourceServices: state.resourceServices,
    selectedResourceService: state.selectedResourceService,
    openResourceServiceForm: state.openResourceServiceForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser,
    officesByCompany: state.officesByCompany,
    services: state.services
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadResourcesByCompany: (companyId) => {
      return dispatch(loadData("resources/byCompany/" + companyId, "resources"));
    },
    loadServices: () => {
      return dispatch(loadData("services", "services"));
    },
    loadResourceServices: () => {
      return dispatch(loadData("serviceResources", "resourceServices"));
    },
    selectResourceService: (event) => {
      dispatch(updateStateAction( { openResourceServiceForm: true, message: "" } ));
      return dispatch(loadData("serviceResources/" + event.currentTarget.id, "selectedResourceService"));
    },
    loadOfficesByCompany: (companyId) => {
      return dispatch(loadData("offices/byCompany/" + companyId, "officesByCompany"));
    },
    addResourceService: (newResourceService) => {
      return dispatch(addData("serviceResources", newResourceService, "selectedResourceService", "resourceServices"));
    },
    deleteResourceService: (serviceId) => {
      return dispatch(deleteData("serviceResources", serviceId, "selectedResourceService", "resourceServices"));
    },
    clearResourceServiceForm: () => {
      return dispatch(updateStateAction( { selectedResourceService: {}, message: "" } ));
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
