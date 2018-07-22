import React, { Component } from 'react';


class App extends Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  render() {
    const keskiarvo = this.state.hyva - this.state.huono
    let sum = (this.state.hyva + this.state.neutraali + this.state.huono)
    if (sum === 0) {
      sum = 1
    } 
    const p = this.state.hyva / sum * 100     
    const positiivisia = p.toFixed(2)
      return (
      <div className="App">
        <h2>anna palautetta</h2>
        <button onClick={this.klikHyva}>Hyvä</button>
        <button onClick={this.klikNeutraali}>Neutraali</button>
        <button onClick={this.klikHuono}>Huono</button>
        <h2>statistiikka</h2>
        <p>Hyvä {this.state.hyva}</p>
        <p>Neutraali {this.state.neutraali}</p>
        <p>Huono {this.state.huono}</p>
        <p>Keskiarvo {keskiarvo}</p>
        <p>Positiivisia {positiivisia}%</p>
        </div>
        
        
    );
  }
}

export default App;
