import React from 'react'
import { filter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      event.preventDefault()
      this.props.store.dispatch(
        filter(event.target.value))
    }
    render() {
      const style = {
        marginBottom: 10
      }

      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}

export default Filter