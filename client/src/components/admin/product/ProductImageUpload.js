import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
 
class ProductImageUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });

    this.props.onSelectImage(files);
  }
  render(){
    return (
      <DropzoneArea 
        onChange={this.handleChange.bind(this)}
        acceptedFiles = {['image/*']}
        fileLimit = {1}
        maxFileSize={3000000}

      />
    )  
  }
} 
 
export default ProductImageUpload;