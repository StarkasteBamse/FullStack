import React from 'react';
import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import AddPerson from './components/AddPerson'
import axios from 'axios'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
            ],
            newName: '',
            newNro: '',
            filter: ''
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/persons')
            .then(response =>
                this.setState({ persons: response.data }))
    }

    addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNro,
            id: this.state.persons[this.state.persons.length - 1].id + 1
        }
        if (this.state.persons.find((person) => person.name === newPerson.name)) {
            alert('nimi ' + newPerson.name + ' löytyy jo')
            this.setState({ newName: '', newNro: '' })
            return
        }

        const persons = this.state.persons.concat(newPerson)

        this.setState({
            persons,
            newName: '',
            newNro: ''
        })
    }

    handleName = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNro = (event) => {
        this.setState({ newNro: event.target.value })
    }

    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter
                    handleFilter={this.handleFilter}
                    filter={this.state.filter} />
                <h2>Lisää uusi</h2>
                <AddPerson
                    newName={this.state.newName}
                    newNro={this.state.newNro}
                    handleNro={this.handleNro}
                    handleName={this.handleName}
                    addName={this.addName} />
                <h2>Numerot</h2>
                <ul>
                    <ListPersons
                        persons={this.state.persons}
                        filter={this.state.filter} />
                </ul>
            </div>
        )
    }
}

export default App