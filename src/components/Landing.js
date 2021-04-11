import React from 'react';
import '../App.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

  return {
    loading: false //state.loading
  };

}


class Landing extends React.Component {

  render() {
    return(
      <div className="mainContainer">
        {this.props.loading && <img src="loading.gif" alt="procesando..."/>}

        {!this.props.loading && <img src="logoCummins.jpg" alt="Logo" className="img-responsive" />}
        {!this.props.loading && <h1 className="homeText">Gestión de productos</h1>}
      </div>
    );
  } 
  
}

export default connect(
  mapStateToProps,
  null
)(Landing)


