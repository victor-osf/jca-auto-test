import React, { Component } from 'react';
import './App.css';
import NewComponent from './components/NewComponent.js';
import Report from './components/Report.js';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import httpService from './service/http-service';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specs: {},
      formData: {}
    };
  }

  async componentDidMount() {
    let response1 = await axios.get(httpService.url + '/property/default')
    let response2 = await axios.get(httpService.url + '/spec')
    this.setState({ formData: response1.data, specs: response2.data })
  }

  async handlePost(event) {
    event.preventDefault();
    let response = await axios.post(httpService.url)
    this.setState(response.data)
  }

  getValues(event) {
    event.stopImmediatePropagation();
    var specs = document.querySelectorAll('[name=specs]:checked');
    var values = '{';
    for (var i = 0; i < specs.length; i++) {
      if (i === specs.length - 1) {
        values = values + specs[i].value;
      } else {
        values = values + specs[i].value + ',';
      }
    }
    values = values + '}'
    values = values.replace(/'/g, '"')
    this.setState({ specs: JSON.parse(values) });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = event.target
    const body = {
      specs: this.state.specs,
      formData: {
        baseUrl: data.baseUrl.value,
        userCPF: data.userCPF.value,
        passCPF: data.passCPF.value,
        userCNPJ: data.userCNPJ.value,
        passCNPJ: data.passCNPJ.value,
        userPassport: data.userPassport.value,
        passPassport: data.passPassport.value,
        userCPFWrong: data.userCPFWrong.value,
        passenger1: data.passenger1.value,
        docPassenger1: data.docPassenger1.value,
        passenger2: data.passenger2.value,
        docPassenger2: data.docPassenger2.value,
        passenger3: data.passenger3.value,
        docPassenger3: data.docPassenger3.value,
        passenger4: data.passenger4.value,
        docPassenger4: data.docPassenger4.value,
        passenger5: data.passenger5.value,
        docPassenger5: data.docPassenger5.value,
        passenger6: data.passenger6.value,
        docPassenger6: data.docPassenger6.value,
        studentCpf: data.studentCpf.value,
        numCard: data.numCard.value,
        valDate: data.valDate.value,
        codCard: data.codCard.value,
        name: data.name.value,
        birth: data.birth.value,
        cpf: data.cpf.value,
        cnpj: data.cnpj.value,
        passport: data.passport.value,
        emailCpf: data.emailCpf.value,
        emailCnpj: data.emailCnpj.value,
        emailPass: data.emailPass.value,
        pass: data.pass.value,
        ddd: data.ddd.value,
        phoneNumber: data.phoneNumber.value,
        zip: data.zip.value,
        address: data.address.value,
        number: data.number.value,
        complement: data.complement.value,
        neigh: data.neigh.value,
        city: data.city.value,
        country: data.country.value
      }
    }

    let response = await axios.put(httpService.url, body)
    alert(response.data.message)
  }

  render() {
    if (this.state.formData && this.state.specs) {
      return (
        <BrowserRouter>
          <Route path="/" exact render={(routeProps) => <NewComponent {...routeProps}
            data={this.state.formData}
            specs={this.state.specs}
            handleSubmit={this.handleSubmit.bind(this)}
            handlePost={this.handlePost.bind(this)}
            getValues={this.getValues.bind(this)} />} />
          <Route path="/about" component={Report} />
        </BrowserRouter>
      );
    }
    else {
      return <div style={divStyle}>Loading...</div>;
    }
  }
}

const divStyle = {
  fontSize: '36px',
  textAlign: 'center',
};

export default App;
