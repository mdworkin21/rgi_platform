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
    console.log('uhhh')
    return (
      <div id='dragdrop'>
        <h1>TEST</h1>
      </div>
    )
  }
}

export default DragDrop