import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    companys: state.companys,
    roles: state.roles,
    users: state.users,
    selectedUser: state.selectedUser,
    openUserForm: state.openUserForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    passwordConfirmation: state.passwordConfirmation,
    loggedUser: state.loggedUser ? state.loggedUser : {} 
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadCompanys: () => {
      return dispatch(loadData("companys", "companys"));
    },
    loadRoles: () => {
      return dispatch(loadData("roles", "roles"));
    },
    loadUsers: () => {
      return dispatch(loadData("users", "users"));
    },
    loadUsersByCompany: (companyId) => {
      return dispatch(loadData("users/byCompany/" + companyId, "users"));
    },
    selectUser: (event) => {
      dispatch(updateStateAction( { openUserForm: true, message: "" } ));
      return dispatch(loadData("users/" + event.currentTarget.id, "selectedUser"));
    },
    addUser: (newUser) => {
      return dispatch(addData("users", newUser, "selectedUser", "users"));
    },
    saveUserChanges: (user) => {
      return dispatch(updateData("users", user, "users"));
    },
    deleteUser: (userId) => {
      dispatch(updateStateAction( { passwordConfirmation: "" } ));
      return dispatch(deleteData("users", userId, "selectedUser", "users"));
    },
    clearUserForm: () => {
      return dispatch(updateStateAction( { selectedUser: {}, passwordConfirmation: "", message: "" } ));
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
