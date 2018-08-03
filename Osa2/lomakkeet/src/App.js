import React from 'react';
import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import AddPerson from './components/AddPerson'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', nro: '050-1234567' }
            ],
            newName: '',
            newNro: '',
            filter: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.newName,
            nro: this.state.newNro
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