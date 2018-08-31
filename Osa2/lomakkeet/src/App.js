import React from 'react';
import Filter from './components/Filter'
import ListPersons from './components/ListPersons'
import AddPerson from './components/AddPerson'
import personService from './services/persons'
import Alert from './components/Alert'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNro: '',
            filter: '',
            message: null
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }

    addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNro,
        }
        const person = this.state.persons.find((person) => person.name === newPerson.name)
        if (person) {
            if (window.confirm(newPerson.name + ' löytyy jo, haluatko päivittää numeron')) {
                personService
                    .updatePerson(person.id, newPerson)
                    .then(response => {
                        const persons = this.state.persons.filter(p => p.id !== person.id)
                        this.setState({
                            persons: persons.concat(response)
                        })
                        this.message(`muutetiin henkilön ${response.name} numero uuteen: ${response.number}`)
                    })
                    .catch(error => {
                        personService
                            .createPerson(newPerson)
                            .then(response => {
                                const persons = this.state.persons.filter(p => p.id !== person.id)
                                this.setState({
                                    persons: persons.concat(response)                                    
                                })
                                this.message(`henkilö ${response.name}, oli poistettu palvelimelta, lisätiin uudestaan`)
                            })
                            .catch(error => {
                                alert('poop happened')
                            })
                    })
            }
            this.setState({ newName: '', newNro: '' })
            return
        }
        personService
            .createPerson(newPerson)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response),
                    newName: '',
                    newNro: ''
                })
                this.message(`lisättiin ${response.name}`)
            })
            .catch(error => {
                alert('poop happened')
            })
    }

    deletePerson = (person) => {
        if (window.confirm('haluatko varmasti poistaa ' + person.name)) {
            personService
                .deletePerson(person.id)
                .then(response => {
                    const persons = this.state.persons.filter(p => p.id !== person.id)
                    this.setState({ persons })
                    this.message(`poistettiin ${person.name}`)
                })
        }
    }

    message = (message) => {
        this.setState({ message })
        setTimeout(() => {
            this.setState({ message: null })
        }, 5000)
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
                <Alert message={this.state.message} />
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
                <table>
                    <tbody>
                        <ListPersons
                            persons={this.state.persons}
                            filter={this.state.filter}
                            deletePerson={this.deletePerson} />
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App