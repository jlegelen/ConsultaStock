import React from 'react';
import container from '../containers/Stocks'
import '../App.css';
import * as XLSX from 'xlsx';
import { Button, Row, Col, Table, Form, Collapse } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const StockTable = (props) => (

  <Table striped bordered hover className="dataTable">

    <thead>
      <tr>
        <th>Item</th>
        <th>Nombre</th>
        <th>Saldo</th>
      </tr>
    </thead>

    <tbody>

      {props.stocks && props.stocks.map((stock, index) => {
        return (
          <tr>
            <td>{stock.item}</td>
            <td>{stock.nombre}</td>
            <td>{stock.saldo}</td>
          </tr>
        )
      })}

    </tbody>

  </Table>

);

class StockForm extends React.Component {

  render() {

    let stockName = this.props.stock.nombre ? this.props.stock.nombre : "";
    
    return (

      <Collapse dimension="height" in={this.props.openStockForm} >
        <div className="collapse-stock-form" >

          <Row>

            <h4 className="subTitle">{this.props.stock.id ? 'Editar stock:' : ''}</h4>

          </Row>

          <Row>

            <div className="formContainer">

              <Form>

                <Form.Group as={Row}>
                  <Form.Label column sm="4" lg="3" xl="2">
                    Adjuntar planilla:
                  </Form.Label>
                  <Col sm="8" lg="9" xl="10">
                    <input required type="file" name="file" id="file" onChange={this.handleInputChange} 
                     placeholder="Archivo de excel" />
                  </Col>
                </Form.Group>

              </Form>

              {!this.props.loading && <div className="footer">

               
              </div> }

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

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const this2 = this
    this.setState({
      [name]: value
    })
    let hojas = []
    if(name === 'file'){
      let reader = new FileReader()
      
      reader.readAsArrayBuffer(target.files[0])
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName) {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object, sheetName })
        })
        this2.setState({
          selectedFileDocument: target.files[0], hojas });
        this.props.handleAdd(hojas[0].data);
      }
    }
  }
}

class Stocks extends React.Component {

  componentDidMount = () => {

    this.props.updateState({ openStockForm: false });
    this.props.clearStockForm();

    if(!this.props.stocks || this.props.stocks.length === 0) {
      this.props.loadStocks();
    }

    this.props.updateMenuHeight(window.innerHeight - 50);
    
  }

  state = {
    busqueda: '',
    items: []
  }

  onChange=async e =>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  filtrarElementos=()=>{

    var search=this.props.stocks.filter(item=>{
      if(this.state.busqueda.length>0){
        if(item.item.match('\\b'+ this.state.busqueda + '\\b')){
          return item;
        }
      }
    });
    this.setState({items: search});
  }

  componentDidMount(){
    this.setState({items: this.StockTable}) 
  }

  render() {

    return (
      <div>

        <Row>

          <h1 className="title">Productos</h1>
          <div className="linkAdd" onClick={this.showHideForm} 
            aria-controls="collapse-stock-form"
            aria-expanded={this.props.openStockForm}>
            
            {this.userIsAdmin() && <div>
              {this.props.openStockForm ? "Ocultar " : "Ingresar planilla excel"}
              {this.props.openStockForm ? <FaAngleUp/> : <FaAngleDown/>}  
            </div>}
          </div>
          
        </Row>

        <StockForm 
          stock={this.props.selectedStock} 
          message={this.props.message} 
          messageClass={this.props.messageClass} 
          loading={this.props.loading} 
          openStockForm={this.props.openStockForm} 
          handleClear={this.props.clearStockForm} 
          handleStockInputChange={this.handleStockInputChange} 
          handleEdit={this.props.saveStockChanges} 
          handleAdd={this.props.addStock} 
          handleDelete={this.props.deleteStock} />

        <Row>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td align="center"><b>Buscador de Productos:&nbsp;</b></td>
          <td align="center"><input type="text" name="busqueda" value={this.state.busqueda} onChange={this.onChange} size="60" id="myInput" placeholder="Buscar producto por item.." title="Nro de Item"></input></td>
      
            <StockTable stocks={this.state.items} handleClick={this.props.selectStock} />

          <div className="loadingDivTable" >
            {this.props.loading && <img src="/loading.gif" alt="procesando..."  />}
          </div>

        </Row>

      </div>
    );
    
  }

  userIsAdmin = () => {
    return (this.props.loggedUser && this.props.loggedUser.roleId === 1);
  }

  showHideForm = () => {
    if(this.props.openStockForm) {
      this.props.updateMenuHeight(window.innerHeight - 50); 
    }
    this.props.updateState({ openStockForm: !this.props.openStockForm });
    this.props.clearStockForm();  
  }

  handleStockInputChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    const stock = { ...this.props.selectedStock };
    stock[name] = value;

    this.props.updateState({
      selectedStock: stock
    });

  }


}

export default container(Stocks); 
