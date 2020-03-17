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

  handleSubmit = async (event) => {
    event.preventDefault()
    let file = this.state.image;

    let reader = new FileReader()
    // reader.readAsText(file)
    let red = await reader.readAsText(file)
    console.log('ASDASD', red )

    let uploadedImage = await axios.post('api/campaignManagement/uploadImage/uploadImage', {image: red})

    console.log('UPSS', uploadedImage)
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