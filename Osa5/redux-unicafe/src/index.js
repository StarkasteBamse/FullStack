import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'


const store = createStore(counterReducer)

const Statistiikka = () => {
    const palautteita = Object.values(store.getState()).reduce((a,b) => a + b)
    
    if (palautteita === 0) {
      return (
        <div>
          <h2>stataistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }

    const good = store.getState().good
    const ok = store.getState().ok
    const bad = store.getState().bad
  
    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{((good - bad) / (good + bad)).toFixed(2)}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{(good / palautteita * 100).toFixed(2)} %</td>
            </tr>
          </tbody>
        </table>
  
        <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
      </div >
    )
  }
  
  class App extends React.Component {
    klik = (nappi) => () => {
      store.dispatch({ type: nappi })
    }
  
    render() {
      return (
        <div>
          <h2>anna palautetta</h2>
          <button onClick={this.klik('GOOD')}>hyvä</button>
          <button onClick={this.klik('OK')}>neutraali</button>
          <button onClick={this.klik('BAD')}>huono</button>
          <Statistiikka />
        </div>
      )
    }
  }

const renderApp = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

renderApp()
store.subscribe(renderApp)

