import React from 'react';
import container from '../containers/Login'
import { Redirect } from 'react-router-dom';
import '../App.css';
import { Button, Row, Col, Form } from 'react-bootstrap';

class Login extends React.Component {

  state = {
    userName: "",
    password: ""
  }

  componentDidMount = () => {

    if(this.props.loggedUser && !sessionStorage.getItem('token')) {
      this.props.updateState({loggedUser: null, message: "Su sessión ha expirado, ingrese nuevamente"});
    }
    
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleKeyPress = (e) => {

    if (e.key === "Enter") {
      this.props.login(this.state.userName, this.state.password);
    } 

  }

  render() {

    return (

      <div className="formLoginContainer">

        {this.props.loggedUser && this.props.loggedUser.roleId === 1 && sessionStorage.getItem('token') && <Redirect to="/" />}        

        {this.props.loggedUser && this.props.loggedUser.roleId !== 1 && sessionStorage.getItem('token') && <Redirect to="/stocks" />}        
            
        <div className="loginHeader">
          <span>Cummins</span>
        </div>

        <div className="loginBody">

          <Form>

            <Form.Group as={Row}>
              <Form.Label column sm="3" xl="2">
                Usuario:
              </Form.Label>
              <Col sm="9" xl="10">
                <Form.Control name="userName" value={this.state.userName} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3" xl="2">
                Password:
              </Form.Label>
              <Col sm="9" xl="10">
                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} />
              </Col>
            </Form.Group>

          </Form>

          <div className="footer">

            <span className="loginErrorMessage">
              {this.props.message}
            </span>

            {this.props.loading && <img src="/loading.gif" alt="procesando..." className="loadingImgLogin" />}
            {!this.props.loading && <Button className="button btn-login" onClick={() => this.props.login(this.state.userName, this.state.password)} variant="primary" >Aceptar </Button>}

          </div>

        </div>

      </div>
    )
  }

}

export default container(Login);
