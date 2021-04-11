import React from 'react';
import '../App.css';
import axios from 'axios';
import container from '../containers/Home'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from './Menu';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Users from './Users';
import Companys from './Companys';
import Offices from './Offices';
import Stocks from './Stocks';
import StocksAdd from './StocksAdd';
import Reservations from './Reservations';
import Landing from './Landing';
import OfficeHours from './OfficeHours'
import Resources from './Resources';
import ResourceHours from './ResourceHours';
import Clients from './Clients';
import Services from './Services';
import OfficeServices from './OfficeServices';
import ResourceServices from './ResourceServices';
import User from './User';


class PageBlank extends React.Component {

  render() {
    return (
      <div className="mainContainer">

        <h1 style={{ marginTop: '100px' }}>
          Página aún no implementada
        </h1>

      </div>
    )
  }
}

class Home extends React.Component {

  componentDidMount = () => {

    if(sessionStorage.getItem('token') && !this.props.loggedUser) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
      this.props.updateUserByToken();
    }
    
  }

  render() {

    return (
      <BrowserRouter>
        {this.props.loggedUser && <Route component={Menu} />}
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Landing} requiresAdmin={false} userIsAdmin={this.userIsAdmin()}/>
          <PrivateRoute path="/users" component={Users} requiresAdmin={true} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/companys" component={Companys} requiresAdmin={true} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/offices" component={Offices} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/office_hours" component={OfficeHours} requiresAdmin={false} userIsAdmin={this.userIsAdmin()}/>
          <PrivateRoute path="/reservations" component={Reservations} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/resources" component={Resources} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/resource_hours" component={ResourceHours} requiresAdmin={false} userIsAdmin={this.userIsAdmin()}/>
          <PrivateRoute path="/clients" component={Clients} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/services" component={Services} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/stocks" component={Stocks} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/stocksAdd" component={StocksAdd} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
          <PrivateRoute path="/office_services" component={OfficeServices} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />          
          <PrivateRoute path="/resource_services" component={ResourceServices} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />          
          <PrivateRoute path="/user" component={User} requiresAdmin={true} userIsAdmin={this.userIsAdmin()}/>
          <PrivateRoute component={PageBlank} requiresAdmin={false} userIsAdmin={this.userIsAdmin()} />
        </Switch>
      </BrowserRouter>
    );
  };

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }

}

export default container(Home);


