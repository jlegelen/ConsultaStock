import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    companys: state.companys,
    selectedCompany: state.selectedCompany,
    openCompanyForm: state.openCompanyForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadCompanys: () => {
      return dispatch(loadData("companys", "companys"));
    },
    selectCompany: (event) => {
      dispatch(updateStateAction( { openCompanyForm: true, message: "" } ));
      return dispatch(loadData("companys/" + event.currentTarget.id, "selectedCompany"));
    },
    addCompany: (newCompany) => {
      return dispatch(addData("companys", newCompany, "selectedCompany", "companys"));
    },
    saveCompanyChanges: (company) => {
      return dispatch(updateData("companys", company, "companys"));
    },
    deleteCompany: (companyId) => {
      return dispatch(deleteData("companys", companyId, "selectedCompany", "companys"));
    },
    clearCompanyForm: () => {
      return dispatch(updateStateAction( { selectedCompany: {}, message: "" } ));
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
