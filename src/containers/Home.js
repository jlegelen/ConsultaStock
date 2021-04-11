import { connect } from 'react-redux';
import {updateUserByToken} from '../api';

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    message: state.message
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    updateUserByToken: () => {
      return dispatch(updateUserByToken());
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
