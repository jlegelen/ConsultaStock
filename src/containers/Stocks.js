import { connect } from 'react-redux';
import {loadData, addData, updateData, deleteData} from '../api';
import { updateMenuHeightAction, updateStateAction } from '../actions';

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    selectedStock: state.selectedStock,
    openStockForm: state.openStockForm,
    message: state.message,
    messageClass: state.messageClass,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    loadStocks: () => {
      return dispatch(loadData("stocks", "stocks"));
    },
    selectStock: (event) => {
      dispatch(updateStateAction( { openStockForm: true, message: "" } ));
      return dispatch(loadData("stocks/" + event.currentTarget.id, "selectedStock"));
    },
    addStock: (newStock) => {
      console.log("En el addStock");
      console.log(newStock);
      return dispatch(addData("stocks", newStock, "selectedStock", "stocks"));
    },
    saveStockChanges: (stock) => {
      return dispatch(updateData("stocks", stock, "stocks"));
    },
    deleteStock: (stockId) => {
      return dispatch(deleteData("stocks", stockId, "selectedStock", "stocks"));
    },
    clearStockForm: () => {
      return dispatch(updateStateAction( { selectedStock: {}, message: "" } ));
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
