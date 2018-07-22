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

  klik = (mita) => {
    return () => {
      this.setState({
        [mita.mika]: mita.arvo
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2>anna palautetta</h2>
        <Button
          handleClick={this.klik({ mika: 'hyva', arvo: this.state.hyva + 1 })}
          text={'Hyvä'}
        />
        <Button
          handleClick={this.klik({mika:'neutraali', arvo: this.state.neutraali + 1})}
          text={'Neutraali'}
        />
        <Button
          handleClick={this.klik({mika:'huono', arvo:this.state.huono + 1})}
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
  if (summa === 0) {
    return (
      <div>
        <p>ei yhtään palautetta annettu -_-;</p>
      </div>
    )
  }
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
  const positiivisia = (hyva / summa) * 100
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
