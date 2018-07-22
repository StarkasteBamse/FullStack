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
    return (
      <div className="App">
        <h2>anna palautetta</h2>
        <Button
          handleClick={this.klikHyva}
          text={'Hyvä'}
        />
        <Button
          handleClick={this.klikNeutraali}
          text={'Neutraali'}
        />
        <Button
          handleClick={this.klikHuono}
          text={'Huono'}
        />
        <h2>statistiikka</h2>
        <Statistics
          hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
        />
      </div>
    );
  }
}

const Statistics = ({ hyva, neutraali, huono }) => {
  const summa = hyva + neutraali + huono
  return (
    <div>
      <p>Hyvä {hyva}</p>
      <p>Neutraali {neutraali}</p>
      <p>Huono {huono}</p>
      <Statistic
        hyva={hyva}
        huono={huono}
      />
      <Positive
        hyva={hyva}
        summa={summa}
      />
    </div>)
}

const Statistic = ({ hyva, huono }) => {
  const keskiarvo = hyva - huono
  return (
    <p>Keskiarvo {keskiarvo}</p>
  )
}

const Positive = ({ summa, hyva }) => {
  let positiivisia = 0
  if (summa !== 0) {
    positiivisia = (hyva / summa) * 100
  }
  return (
    <p>Positiivisia {positiivisia.toFixed(2)}%</p>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App;
