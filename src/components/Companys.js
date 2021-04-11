import React from 'react';
import container from '../containers/Companys'
import '../App.css';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const CompanysTable = (props) => (

  <Table striped bordered hover className="dataTable">

    <thead>
      <tr>
        <th>Nombre empresa</th>
      </tr>
    </thead>

    <tbody>

    {props.companys && props.companys.map((company, index) => {
        return (
          <tr onClick={props.handleClick} key={index} id={company.id} title="Haga clic para editar esta empresa" >
            <td>{company.name}</td>
          </tr>
        )
      })}

    </tbody>

  </Table>

);

class CompanyForm extends React.Component {

  render() {

    let companyName = this.props.company.name ? this.props.company.name : "";
    let validCompany = this.props.company.name;

    return (

      <Collapse dimension="height" in={this.props.openCompanyForm} >
        <div className="collapse-company-form" >

          <Row>

            <h4 className="subTitle">{this.props.company.id ? 'Editar empresa:' : 'Nueva empresa:'}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Nombre empresa: *
                    </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <Form.Control name="name" value={companyName} onChange={this.props.handleCompanyInputChange} />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

                {this.props.company.id && <Button className="button" onClick={() => this.props.handleDelete(this.props.company.id)} variant="danger" >Borrar </Button>}

                <Button className="button" onClick={this.props.handleClear} variant="primary" >Limpiar </Button>

                {this.props.company.id ?
                  <Button className="button" onClick={() => this.props.handleEdit(this.props.company)} variant="success" disabled={!validCompany} >Guardar cambios </Button>
                  :
                  <Button className="button" onClick={() => this.props.handleAdd(this.props.company)} variant="success" disabled={!validCompany} >Agregar </Button>
                }

              </div>}

              <div className="loadingDivForm" >
                {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
              </div>

              <div className={this.props.messageClass}>
                {this.props.message}
              </div>

            </div>

          </Row>
        </div>
      </Collapse>

    );
  }

}

class Companys extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openCompanyForm: false });
    this.props.clearCompanyForm();

    if(!this.props.companys || this.props.companys.length === 0) {
      this.props.loadCompanys();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Empresas</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-company-form"
            aria-expanded={this.props.openCompanyForm}
          >
            {this.props.openCompanyForm ? "Ocultar formulario " : "Agregar empresa "}  
            {this.props.openCompanyForm ? <FaAngleUp/> : <FaAngleDown/>}  
          </div>

        </Row>

        <CompanyForm 
          company={this.props.selectedCompany} 
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openCompanyForm={this.props.openCompanyForm} 
          handleClear={this.props.clearCompanyForm} 
          handleCompanyInputChange={this.handleCompanyInputChange} 
          handleEdit={this.props.saveCompanyChanges} 
          handleAdd={this.props.addCompany} 
          handleDelete={this.props.deleteCompany} 
        />

        <Row>

          <CompanysTable companys={this.props.companys} handleClick={this.props.selectCompany} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );

  }

  showHideForm = () => {

    if(this.props.openCompanyForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }

    this.props.updateState({ openCompanyForm: !this.props.openCompanyForm });
    this.props.clearCompanyForm();

  }

  handleCompanyInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const company = { ...this.props.selectedCompany };
    company[name] = value;

    this.props.updateState({
      selectedCompany: company
    });

  }

}

export default container(Companys); 
