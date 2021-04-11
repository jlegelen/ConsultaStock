import { connect } from 'react-redux';
import { login } from '../api';
import { updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    message: state.message,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    login: (userName, password) => {
      return dispatch(login(userName, password));
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
