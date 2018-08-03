import React from 'react'

const AddPerson = ({ newName, newNro, handleNro, handleName, addName }) => {
    return (
        <div>
            <form onSubmit={addName}>
                <div>
                    nimi: <input
                        onChange={handleName}
                        value={newName}
                    />
                </div>
                <div>
                    nro: <input
                        onChange={handleNro}
                        value={newNro}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}



export default AddPerson