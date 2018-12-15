import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image } from 'semantic-ui-react'

const Menu = () => (
  <div style={({
    backgroundColor: 'yellow',
    borderStyle: 'dotted'
  })}>
    <NavLink exact to="/" activeStyle={{
      fontWeight: "bold",
      color: "red",
      backgroundColor: 'black'
    }}>anecdotes</NavLink>&nbsp;
    <NavLink to="/create" activeStyle={{
      fontWeight: "bold",
      color: "red",
      backgroundColor: 'black'
    }}>create new</NavLink>&nbsp;
    <NavLink to="/about" activeStyle={{
      fontWeight: "bold",
      color: "red",
      backgroundColor: 'black'
    }}>about</NavLink>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid columns={2} divided>
      <Grid.Column>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column>
        <Image src="Ada_Lovelace_portrait.jpg" />
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify('a new anecdote ' + this.state.content + ' created!')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (notice) => {
    this.setState({ notification: notice })
    setTimeout(() => { this.setState({ notification: '' }) },
      10000)
  }

  render() {
    const postIt = () => {
      if (this.state.notification === '') {
        return ''
      } else {
        return <div style={({
          color: 'red',
          fontStyle: 'oblique',
          fontSize: 30,
          borderStyle: 'outset',
          borderWidth: 'thick',
          borderColor: 'red'
        })}>{this.state.notification}</div>
      }
    }
    return (
      <Container>
        <div>
          <Router>
            <div>
              <h1>Software anecdotes</h1>
              <Menu />
              {postIt()}
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={({ history }) =>
                <CreateNew history={history} addNew={this.addNew} notify={this.notify} />} />
              <Route path="/anecdotes/:id" render={({ match }) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
              />
              <Footer />
            </div>
          </Router>
        </div>
      </Container>

    );
  }
}

export default App;
