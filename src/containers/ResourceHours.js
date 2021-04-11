import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    entryCalendars: state.entryCalendars,
    selectedEntryCalendar: state.selectedEntryCalendar,
    openEntryCalendarForm: state.openEntryCalendarForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser,
    officesByCompany: state.officesByCompany,
    days: state.days,
    services: state.services
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadResourcesByCompany: (companyId) => {
      return dispatch(loadData("resources/byCompany/" + companyId, "resources"));
    },
    loadEntryCalendars: () => {
      return dispatch(loadData("entrycalendars", "entryCalendars"));
    },
    selectEntryCalendar: (event) => {
      dispatch(updateStateAction( { openEntryCalendarForm: true, message: "" } ));
      return dispatch(loadData("entrycalendars/" + event.currentTarget.id, "selectedEntryCalendar"));
    },
    loadOfficesByCompany: (companyId) => {
      return dispatch(loadData("offices/byCompany/" + companyId, "officesByCompany"));
    },
    addEntryCalendar: (newEntryCalendar) => {
      return dispatch(addData("entrycalendars", newEntryCalendar, "selectedEntryCalendar", "entryCalendars"));
    },
    saveEntryCalendarChanges: (entryCalendar) => {
      return dispatch(updateData("entrycalendars", entryCalendar, "entryCalendars"));
    },
    deleteEntryCalendar: (serviceId) => {
      return dispatch(deleteData("entrycalendars", serviceId, "selectedEntryCalendar", "entryCalendars"));
    },
    clearEntryCalendarForm: () => {
      return dispatch(updateStateAction( { selectedEntryCalendar: {}, message: "" } ));
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
