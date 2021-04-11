import React from 'react';
import container from '../containers/Menu'
import '../App.css';
import { Link } from "react-router-dom";
import { Collapse } from 'react-bootstrap';
import { FaBars, FaUserCircle, FaUser, FaHotel, FaCalculator, FaRegCalendarAlt, FaRegAddressBook, FaRegAddressCard, FaListUl, FaUserCheck, FaRegClock, FaUserClock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import {initialState} from '../ConfigureStore';

class Menu extends React.Component {

  state = {
    openMainMenu: window.innerWidth > 768,
    openUserMenu: false
  };

  componentDidMount = () => {

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('click', this.handleClickDocument, true);

    this.props.updateMenuHeight(window.innerHeight - 50);

    setTimeout(() => {
      if(this.props.menuHeight !== (document.documentElement.scrollHeight - 50)) {
        this.props.updateMenuHeight(document.documentElement.scrollHeight - 50);
      }
    }, 500);
    
  }

  componentDidUpdate = (prevProps, prevState) => {

    setTimeout(() => {
      if(this.props.menuHeight !== (document.documentElement.scrollHeight - 50)) {
        this.props.updateMenuHeight(document.documentElement.scrollHeight - 50);
      }
    }, 500);

  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickDocument, true);
  }

  handleResize = () => {
    if (window.innerWidth > 760 && window.innerWidth < 769) {
      this.setState({ openMainMenu: false });
    } else if(window.innerWidth > 768 && window.innerWidth < 780) {
      this.setState({ openMainMenu: true });
    }
    this.props.updateMenuHeight(document.documentElement.scrollHeight - 50);

  }

  handleClickDocument = event => {
    if (window.innerWidth < 769 && !event.target.closest(".navbar-button") && !event.target.classList.contains("collapse-menu")) {
      this.setState({ openMainMenu: false});
    }
    
    if (!event.target.closest(".logged-user-button")) {
      this.setState({ openUserMenu: false });
    }

  }

  render() {

    return (

      <>
        <div className="header">

          <Link to="/" className="homeLink" alt="Inicio" title="Inicio" >
            <span>CUMMINS</span>
          </Link>

          <div className="logged-user-button" onClick={() => this.setState((prevState) => ({ openUserMenu: !prevState.openUserMenu }))}
            aria-controls="collapse-user-menu"
            aria-expanded={this.state.openUserMenu}>
            <FaUserCircle />
            <span>{this.props.loggedUser.name + " " + (this.props.loggedUser.lastName ? this.props.loggedUser.lastName : "")}</span>
          </div>

          <Collapse dimension="height" in={this.state.openUserMenu} >
            <div className="collapse-user-menu" >
              <Link to="/user" className="menuItem" >{window.innerWidth > 768 ? "Mis datos" : this.props.loggedUser.name + " " + (this.props.loggedUser.lastName ? this.props.loggedUser.lastName : "")}</Link>
              <div onClick={this.logout} className="menuItem">Cerrar sesión</div>
            </div>
          </Collapse>

        </div>

        <div className="navbar-button" onClick={() => this.setState((prevState) => ({ openMainMenu: !prevState.openMainMenu }))}
          aria-controls="collapse-menu"
          aria-expanded={this.state.openMainMenu}>
          <FaBars className="main-menu-button"></FaBars>
        </div>

        <Collapse dimension="width" in={this.state.openMainMenu} style={{height: this.props.menuHeight}} id="mainMenu" >
          <div className="vertical-list collapse-menu" >
            <ul>
            {this.userIsAdmin() && <li>
                <Link to="/stocksAdd" className={this.props.location.pathname === "/stocksAdd" ? "active" : ""} alt="Ingreso Productos" title="Ingreso Productos" >
                  <FaHotel />
                  <span>Ingreso Productos</span>
                </Link>
              </li>}
              
              <li>
                <Link to="/stocks" className={this.props.location.pathname === "/stocks" ? "active" : ""} alt="Productos" title="Productos" >
                  <FaHotel />
                  <span>Productos</span>
                </Link>
              </li>
              {this.userIsAdmin() && <li>
                <Link to="/users" className={this.props.location.pathname === "/users" ? "active" : ""} alt="Usuarios" title="Usuarios" >
                  <FaHotel />
                  <span>Usuarios</span>
                </Link>
              </li>}
         
            </ul>
          </div>
        </Collapse>

      </>
    );
  };

  logout = () => {
    
    sessionStorage.removeItem('token');
    
    this.props.updateState(
      {
        ...initialState
      }
    );

  };

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }

}

export default container(Menu);
