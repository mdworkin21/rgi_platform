import React, {Component} from 'react'
const axios = require('axios')

class DragDrop extends Component {
  state = {
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      image: event.target.files[0]
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // let file = this.state.image[0];

    axios.post('api/campaignManagement/uploadImage/uploadImage', {image: this.state.image})
    console.log(this.state);
  }

  render(){
    console.log('uhhh', this.state)
    return (
      <div id='dragdrop'>
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            Select image to upload:
            <input type="file" name="image" id="fileToUpload" multiple onChange={this.handleChange} />
            <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}

export default DragDrop