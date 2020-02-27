import React, {Component} from 'react'

class DragDrop extends Component {
  state = {
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleDragAndDrop = () => {

  // }

  render(){
    return (

      <div></div>
    )
  }
}