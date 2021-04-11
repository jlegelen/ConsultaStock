import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    companys: state.companys,
    offices: state.offices,
    selectedOffice: state.selectedOffice,
    openOfficeForm: state.openOfficeForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser ? state.loggedUser : {} 
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
      return dispatch(loadData("offices/byCompany/" + companyId, "offices"));
    },
    selectOffice: (event) => {
      dispatch(updateStateAction( { openOfficeForm: true, message: "" } ));
      return dispatch(loadData("offices/" + event.currentTarget.id, "selectedOffice"));
    },
    addOffice: (newOffice) => {
      console.log("ADD OFFICE");
      console.log(newOffice);
      return dispatch(addData("offices", newOffice, "selectedOffice", "offices"));
    },
    saveOfficeChanges: (office) => {
      return dispatch(updateData("offices", office, "offices"));
    },
    deleteOffice: (officeId) => {
      return dispatch(deleteData("offices", officeId, "selectedOffice", "offices"));
    },
    clearOfficeForm: () => {
      return dispatch(updateStateAction( { selectedOffice: {}, message: "" } ));
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