import React from 'react'

const ListPersons = ({ persons, filter }) => {
    if (filter) {
        persons =
            persons.filter(function (person) {
                return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
            })

    }
    return persons.map(person => <li key={person.name}>{person.name} {person.nro}</li>)
}

export default ListPersons