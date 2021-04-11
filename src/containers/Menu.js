import { connect } from 'react-redux';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    menuHeight: state.menuHeight,
    loggedUser: state.loggedUser,
    message: state.message
  };
}

const mapDispatchToProps = dispatch => {
  return { 
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
