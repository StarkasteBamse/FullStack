import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  vaihda = () => {
    this.setState({selected: getRandomInt(0,5)})
  }

  aanesta = () => {
    const taulukko = [...this.state.votes]
    taulukko[this.state.selected] += 1
    return (
    this.setState({votes: taulukko})
    )}

  render() {
    const popular = this.state.votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <p>anecdote #{this.state.selected+1} has {this.state.votes[this.state.selected]} votes</p>
        <button onClick={this.vaihda}>nappi</button>
        <button onClick={this.aanesta}>aanesta</button>
        <h3>Most popular anecdote, in this sitting</h3>
        {this.props.anecdotes[popular]}
        <p>has {this.state.votes[popular]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)