import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends Component {

  getPdf() {
    axios({
      method: 'get',
      url: 'http://localhost:3090/api/getPdf/data',
      responseType: 'arraybuffer'
    })
      .then(result => {
        console.log('RESULT', result);
        const downloadLink = document.createElement('a');
        downloadLink.target = '_blank';
        downloadLink.download = 'file.pdf';

        // convert downloaded data to a Blob
        const blob = new Blob([result.data], { type: 'application/pdf', charset: 'utf-8' });

        // create an object URL from the Blob
        const URL = window.URL || window.webkitURL;
        const downloadUrl = URL.createObjectURL(blob);

        // set object URL as the anchor's href
        downloadLink.href = downloadUrl;

        // append the anchor to document body
        document.body.append(downloadLink);

        // fire a click event on the anchor
        downloadLink.click();

        // cleanup: remove element and revoke object URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
      });
  }
  render() {
    return (
      <div>
        <h1>Generate PDF application</h1>
        <button onClick={() => this.getPdf()}>Get PDF</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));