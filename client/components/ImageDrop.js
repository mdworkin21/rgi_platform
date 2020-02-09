import React, {useCallback, Component} from 'react'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'


const Dropzone = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader()
      console.log("READ", reader)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload =  () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      
     let newImage = await axios.post('/api/campaignManagement/outbrain/imageDrop', {filePath: file.path})

     console.log("FRONT", newImage)
  })

  
  }, [])


  const {getRootProps, getInputProps} = useDropzone({onDrop})
  console.log('GET', ...getRootProps(), ...getInputProps())
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()}/>
      <p>Drag 'n' drop  some files here, or click to select files</p>
    </div>
  )
}


// class Dropzone extends Component {

//   onDrop = useCallback((acceptedFiles) => {
//     console.log("ACCEEPT", acceptedFiles)
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader()
//       console.log("READ", reader)
//       reader.onabort = () => console.log('file reading was aborted')
//       reader.onerror = () => console.log('file reading has failed')
//       reader.onload =  () => {
//       // Do whatever you want with the file contents
//         const binaryStr = reader.result
//         console.log(binaryStr)
//       }
//       // console.log("FILE", files)
//       files.push(file.path)
//       reader.onload()
//       // reader.readAsArrayBuffer(file)
//   })

    
//   }, [])
//   render(){
//     const {getRootProps, getInputProps} = useDropzone({onDrop})

//     return (
//       <div {...getRootProps()}>
//       <input {...getInputProps()}/>
//       <p>Drag 'n' drop  some files here, or click to select files</p>
//       {/* <button onSubmit={axios.post('/api/campaignManagement/outbrain/imageDrop', )}>SUBMIT</button> */}
//     </div>
//     )
//   }
// }


export default Dropzone;
