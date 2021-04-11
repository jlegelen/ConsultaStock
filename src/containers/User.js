import { connect } from 'react-redux';
import { updateData, updateUserByToken} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading,
    loggedUser: state.loggedUser ? state.loggedUser : {} ,
    selectedUser: state.selectedUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserChanges: (user) => {
      return dispatch(updateData("users", user, "users")).then(() =>
        dispatch(updateUserByToken())
      );
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
