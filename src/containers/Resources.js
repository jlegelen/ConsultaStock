import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    companys: state.companys,
    offices: state.offices,
    officesByCompany: state.officesByCompany,
    resources: state.resources,
    selectedResource: state.selectedResource,
    openResourceForm: state.openResourceForm,
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
    loadOffices: () => {
      return dispatch(loadData("offices", "offices"));
    },
    loadOfficesByCompany: (companyId) => {
      return dispatch(loadData("offices/byCompany/" + companyId, "officesByCompany"));
    },
    loadResources: () => {
      return dispatch(loadData("resources", "resources"));
    },
    loadResourcesByCompany: (companyId) => {
      return dispatch(loadData("resources/byCompany/" + companyId, "resources"));
    },
    selectResource: (event) => {
      dispatch(updateStateAction( { openResourceForm: true, message: "" } ));
      return dispatch(loadData("resources/" + event.currentTarget.id, "selectedResource"));
    },
    addResource: (newResource, companyId) => {
      return dispatch(addData("resources", newResource, "selectedResource", "resources", companyId));
    },
    saveResourceChanges: (resource, companyId) => {
      return dispatch(updateData("resources", resource, "resources", companyId));
    },
    deleteResource: (resourceId, companyId) => {
      return dispatch(deleteData("resources", resourceId, "selectedResource", "resources", companyId));
    },
    clearResourceForm: () => {
      return dispatch(updateStateAction( { selectedResource: {}, message: "" } ));
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
