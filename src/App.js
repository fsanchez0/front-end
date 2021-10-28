import React, { Component } from 'react';
import './App.css';
import { FianzaService } from './Service/FianzaService';
/* Prime */
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * Fernando Sánchez Castro
 */

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      values: []
    };
    this.fianzaService = new FianzaService();
    this.agentes = [
      { name: 'Agente1', code: 'A1' },
      { name: 'Agente2', code: 'A2' }
    ];
    this.ejecutivos = [
      { name: 'Ejecutivo1', code: 'E1' },
      { name: 'Ejecutivo2', code: 'E2' }
    ];
    this.oficinas = [];
    this.onAgentChange = this.onAgentChange.bind(this);
    this.onExecutiveChange = this.onExecutiveChange.bind(this);
    this.onOfficeChange = this.onOfficeChange.bind(this);

    this.pesos = 1000000;
    this.dolares = parseInt(this.pesos / 21, 10);
    this.euros = parseInt(this.pesos / 23, 10);
  }
  
  componentDidMount(){
    this.fianzaService.getAll().then(data => this.setState({fianzas: data}))
    //this.fianzaService.getAll().then(data => console.log(data))
    fetch(this.fianzaService.baseURL + 'all')
        .then(function(res) {
            return res.json();
        }).then((json)=> {
            this.setState({
               values: json
            })
        });
  }

  onOfficeChange(e) {
    this.setState({ selectedOffice: e.value });
    this.fianzaService.getByIdOficina(e.value.id).then(data => this.setState({fianzas: data.data}))
    if(e.value.moneda === 'Pesos'){
      this.pesos = e.value.importe;
      this.dolares = this.pesos / 21;
      this.euros = this.pesos / 23;
    }
    else if(e.value.moneda === 'Dolares'){
      this.dolares = e.value.importe;
      this.pesos = this.dolares * 21;
      this.euros = this.dolares * 0.86;
    }
    else if(e.value.moneda === 'Euro'){
      this.euros = e.value.importe;
      this.dolares = this.euros * 1.16;
      this.pesos = this.euros * 23.57;
    }
  }

  fillPesosCard(){
    if(this.state.selectedOffice !== null){
      if(true){
        return(
          <React.Fragment>
            <div class="row text-center">
              <div class="col-md-12">
                <h2>{this.pesos.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-md-6 ">
                <h2 class="text-primary"><i className="pi pi-check-circle text-success" style={{'fontSize': '0.8em'}}></i>70%</h2>
              </div>
              <div class="col-md-6 text-danger">
                <h2><i className="pi pi-exclamation-triangle" style={{'fontSize': '0.8em'}}></i>30%</h2>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-md-6 text-primary">
                <h4>{parseInt(this.pesos * 0.7, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
              </div>
              <div class="col-md-6 text-danger">
                <h4>{parseInt(this.pesos * 0.3, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
              </div>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  onAgentChange(e) {
    this.setState({ selectedAgent: e.value });
  }

  onExecutiveChange(e) {
    this.setState({ selectedExecutive: e.value });
  }

  antiguedadBodyTemplate(rowData) {
    if(rowData.color === 'Rojo'){
      return (
        <React.Fragment>
            <div class="p-3 mb-2 bg-danger text-white rounded">{rowData.antiguedad}</div>
        </React.Fragment>
      );
    }
    else if(rowData.color === 'Verde'){
      return (
        <React.Fragment>
            <div class="p-3 mb-2 bg-success text-white rounded">{rowData.antiguedad}</div>
        </React.Fragment>
      );
    }
    else if(rowData.color === 'Amarillo'){
      return (
        <React.Fragment>
            <div class="p-3 mb-2 bg-warning text-white rounded">{rowData.antiguedad}</div>
        </React.Fragment>
      );
    }
    else{
      return (
        <React.Fragment>
            <div class="p-3 mb-2 rounded">{rowData.antiguedad}</div>
        </React.Fragment>
      );
    }
    
}
diasVBodyTemplate(rowData) {
  if(rowData.color === 'Rojo'){
    return (
      <React.Fragment>
          <div class="p-3 mb-2 bg-danger text-white rounded">{rowData.diasVencimiento}</div>
      </React.Fragment>
    );
  }
  else if(rowData.color === 'Verde'){
    return (
      <React.Fragment>
          <div class="p-3 mb-2 bg-success text-white rounded">{rowData.diasVencimiento}</div>
      </React.Fragment>
    );
  }
  else if(rowData.color === 'Amarillo'){
    return (
      <React.Fragment>
          <div class="p-3 mb-2 bg-warning text-white rounded">{rowData.diasVencimiento}</div>
      </React.Fragment>
    );
  }
  else{
    return (
      <React.Fragment>
          <div class="p-3 mb-2 rounded">{rowData.diasVencimiento}</div>
      </React.Fragment>
    );
  }
}

formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

importeBodyTemplate(rowData) {
  var entero = rowData.importe;
  return entero.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

  render(){
    return(
      <div class="container my-3">
          <div class="row my-4">
            <div class="col-md-12 text-center">
              <h1>Prima por cobrar</h1>
            </div>
          </div>
          <div class="row my-3">
            <div class="col-md-2">
              <Dropdown value={this.state.selectedOffice} options={this.state.values} onChange={this.onOfficeChange} optionLabel="nombreOficina" placeholder="Oficina" />
            </div>
            <div class="col-md-2">
              <Dropdown value={this.state.selectedAgent} options={this.agentes} onChange={this.onAgentChange} optionLabel="name" placeholder="Agente" />
            </div>
            <div class="col-md-2">
              <Dropdown value={this.state.selectedExecutive} options={this.ejecutivos} onChange={this.onExecutiveChange} optionLabel="name" placeholder="Ejecutiva" />
            </div>
          </div>
          <div class="row my-3">
            <div class="col-md-4 mx-auto">
              <Card title="Pesos">
                {
                  this.fillPesosCard()
                }
              </Card>
            </div>
            <div class="col-md-4 mx-auto">
              <Card title="Dólares">
              <div class="row text-center">
                  <div class="col-md-12">
                    <h2>{this.dolares.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-md-6 ">
                    <h2 class="text-primary"><i className="pi pi-check-circle text-success" style={{'fontSize': '0.8em'}}></i>70%</h2>
                  </div>
                  <div class="col-md-6 text-danger">
                    <h2><i className="pi pi-exclamation-triangle" style={{'fontSize': '0.8em'}}></i>30%</h2>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-md-6 text-primary">
                    <h4>{parseInt(this.dolares * 0.7, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                  </div>
                  <div class="col-md-6 text-danger">
                    <h4>{parseInt(this.dolares * 0.3, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                  </div>
                </div>
              </Card>
            </div>
            <div class="col-md-4 mx-auto">
              <Card title="Euro">
              <div class="row text-center">
                  <div class="col-md-12">
                    <h2>{this.euros.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-md-6 ">
                    <h2 class="text-primary"><i className="pi pi-check-circle text-success" style={{'fontSize': '0.8em'}}></i>70%</h2>
                  </div>
                  <div class="col-md-6 text-danger">
                    <h2><i className="pi pi-exclamation-triangle" style={{'fontSize': '0.8em'}}></i>30%</h2>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-md-6 text-primary">
                    <h4>{parseInt(this.euros * 0.7, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                  </div>
                  <div class="col-md-6 text-danger">
                    <h4>{parseInt(this.euros * 0.3, 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <DataTable value={this.state.fianzas}>
            <Column field="fianza" header="Fianza"></Column>
            <Column field="movimiento" header="Movimiento"></Column>
            <Column field="fiado" header="Fiado"></Column>
            <Column field="antiguedad" body={this.antiguedadBodyTemplate} header="Antigüedad"></Column>
            <Column field="diasVencimiento" body={this.diasVBodyTemplate} header="Días de Vencimiento"></Column>
            <Column field="importe" body={this.importeBodyTemplate} header="Importe"></Column>
          </DataTable>
        </div>
    );
  }
}