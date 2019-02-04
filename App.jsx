import React from 'react';
import loki from 'lokijs';
import MUIDataTable from "mui-datatables";

var db = new loki('test.json');

var content;

var counter = 1;

//const columns = ["UUID", "Status", "Description"];

const columns = [
  {
    name: "ID",
    options: {
     filter: false,
     sort: true,
    }
   },
  {
   name: "UUID",
   options: {
    filter: false,
    sort: true,
   }
  },
  {
   name: "Status",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "Description",
   options: {
    filter: false,
    sort: true,
   }
  },
  {
   name: "Date",
   options: {
    filter: true,
    sort: true,
   }
  },
 ];

const options = {
  filterType: 'checkbox',
};



class App extends React.Component {
  render() {
    return (
      <h1 className='web-header'>Wedding Wire App</h1>
    );
  }
}

export default App;


class ResultTable extends React.Component {

  constructor(props)
  {
    super(props);

    this.updateDataFromFile()
    this.state= {
      datafile: this.getData( db.getCollection('logData'))
    }

    this.isNewFile = false;

    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.updateProcessedData = this.updateProcessedData.bind(this);
    this.processFile = this.processFile.bind(this);
  }

   updateProcessedData(procData){
    var doct = db.addCollection('logData');

    for(var i=0; i< procData.length; i++)
    {
      doct.insert(procData[i]);
    }
    

   console.log(db.getCollection('logData'));

    this.setState({
      datafile: this.getData(db.getCollection('logData'))
    })
  }

  updateDataFromFile() {

    var logData = db.addCollection('logData');
  }

  handleselectedFile(event) {
    
    this.isNewFile = true;
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
     
    })
  }

  uploadFile() {

    if(!this.isNewFile){
      alert("Please select a new file to process. This alert is either due to the selection of same file or no file being selected");
      return;
    } 
    
    var file = this.state.selectedFile;
    var reader = new FileReader();
    
  var aa = this;

    reader.onload = function(event) {
      content = reader.result;

      var textByLine = content.split("\n")

      var processedData = aa.processFile(textByLine);

      aa.updateProcessedData(processedData);
      alert("The file has been added successfully!")
    }

    reader.readAsText(file);
    this.isNewFile = false;

    this.setState({
      datafile: this.getData(db.getCollection('logData')),
      selectedFile: null
    })

 }

 processFile(textByLine)
 {
   var processedData= [];
  for(var i = 0; i < textByLine.length; i++){
    var splitString;
    
    //individual logics will be written during Production development purposes for each category for additional functionalities.
    //This is the reason for it to replicate the same lines of code else this can be made in one loop.

    if(textByLine[i].toString().toLowerCase().indexOf('deprecation warning') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('deprecation warning');
      processedData.push({ UUID: splitString[0], Status: 'deprecation warning', Description : splitString[1] });
    }
    else if(textByLine[i].toString().toLowerCase().indexOf('started') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('started');
      processedData.push({ UUID: splitString[0], Status: 'started', Description : splitString[1] });
    }
    else if(textByLine[i].indexOf('processing') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('processing');
      processedData.push({ UUID: splitString[0], Status: 'processing', Description : splitString[1] });
    }
    else if(textByLine[i].indexOf('rendered') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('rendered');
      processedData.push({ UUID: splitString[0], Status: 'rendered', Description : splitString[1] });
    }
    else if(textByLine[i].indexOf('completed') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('completed');
      processedData.push({ UUID: splitString[0], Status: 'completed', Description : splitString[1] });
    }
    else if(textByLine[i].indexOf('parameters') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('parameters');
      processedData.push({ UUID: splitString[0], Status: 'parameters', Description : splitString[1] });
    }
    else if(textByLine[i].indexOf('paperclip') != -1){
      splitString = textByLine[i].toString().toLowerCase().split('paperclip');
      processedData.push({ UUID: splitString[0], Status: 'paperclip', Description : splitString[1] });
    }
    else{
      //The other lines will be skipped. Logic will be corrected as per the correct log format for production use.
    }
  }

  return processedData;
 }
 

 getData(aa){
  var data = [];
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    try{
      for(var i = 0; i < aa.data.length; i++, counter++){
        data[i] = [];
        data[i][0] = counter;
        data[i][1] = aa.data[i].UUID;
        data[i][2] = aa.data[i].Status;
        data[i][3] = aa.data[i].Description;
        data[i][4] = datetime;
      }
    }
    catch(ex)
    {
      alert("Exception in getData method : " + ex);
    }
    return data;  
 }

  render() {
    return (
      <div><div>
        <div className="upload-btn-wrapper">
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button  onClick={this.uploadFile} title="click the button to parse the selected log file.">Upload</button>
        </div>
       
        
    </div>
      <MUIDataTable
        title={"Logs"}
        data={this.state.datafile}
        columns={columns}
        options={options}
      />
      </div>
    );
  }
}

export { ResultTable };