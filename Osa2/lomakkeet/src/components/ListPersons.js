import React from 'react'

const ListPersons = ({ persons, filter }) => {
    if (filter) {
        persons =
            persons.filter(function (person) {
                return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
            })

    }
    return persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)
}

export default ListPersons