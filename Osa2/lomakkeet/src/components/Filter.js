import React from 'react'

const Filter = ({ handleFilter, filter }) => {
    return (
        <div>
            rajaa näytettäviä<input
                onChange={handleFilter}
                value={filter} />
        </div>
    )
}

export default Filter