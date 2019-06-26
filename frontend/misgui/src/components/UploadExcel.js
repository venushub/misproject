import React , {Component} from 'react'
const csv=require('csvtojson')


class UploadExcel extends Component {
  constructor(props){
    super(props)

    this.state = {
      file : '',
      filebase64 : ''
    }
  }


  getBase64 = (file) => {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
     // this.setState({filebase64 : reader.result})
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
 }

  

  changedFile = (e) => {
    console.log(this.files)
    this.setState({
      file : e.target.value
    })
    const selectedFile = this.refs.myfile.files[0];
    console.log(selectedFile)

    this.getBase64(selectedFile)


    };



  render(){

    console.log(this.state.file)
    //
    // csv()
    //   .fromFile(this.state.filebase64)
    //   .then((jsonObj)=>{
    //   console.log(jsonObj);
      // })

    return(
      <div>
        <input type="file" id="input" ref="myfile" onChange={this.changedFile} />
      </div>
    )
  }

}

export default UploadExcel
