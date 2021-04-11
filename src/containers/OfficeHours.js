import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    officeHours: state.officeHours,
    selectedOfficeHour: state.selectedOfficeHour,
    openOfficeHourForm: state.openOfficeHourForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser,
    officesByCompany: state.officesByCompany,
    days: state.days,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadOfficeHours: () => {
      return dispatch(loadData("officeHours", "officeHours"));
    },
    selectOfficeHour: (event) => {
      dispatch(updateStateAction( { openOfficeHourForm: true, message: "" } ));
      return dispatch(loadData("officeHours/" + event.currentTarget.id, "selectedOfficeHour"));
    },
    loadOfficesByCompany: (companyId) => {
      return dispatch(loadData("offices/byCompany/" + companyId, "officesByCompany"));
    },
    addOfficeHour: (newOfficeHour) => {
      return dispatch(addData("officeHours", newOfficeHour, "selectedOfficeHour", "officeHours"));
    },
    saveOfficeHourChanges: (officeHour) => {
      return dispatch(updateData("officeHours", officeHour, "officeHours"));
    },
    deleteOfficeHour: (serviceId) => {
      return dispatch(deleteData("officeHours", serviceId, "selectedOfficeHour", "officeHours"));
    },
    clearOfficeHourForm: () => {
      return dispatch(updateStateAction( { selectedOfficeHour: {}, message: "" } ));
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
