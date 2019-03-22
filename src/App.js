import './App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import React, { Component } from 'react';
import InputField from './components/InputField';
import OutputField from './components/OutputField';

//import data
import doc from './files/data.js';

let md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
}).use(require('markdown-it-footnote'));; 
// let handlebars = require('handlebars');


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      doc,
    }
  }

  onDismiss = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onInputChangeMd = (event) => {
    let doc = { ...this.state.doc };
    doc.mdExample = event.target.value
    doc.mdResult = md.render(doc.mdExample)
    this.setState({ doc });
  }

  onInputChange = (param) => (event) => {
    let doc = { ...this.state.doc };
    console.log(param);
    doc[param] = event.target.value
    this.setState({ doc });
  }

  dummyMethod = (event) => {
    return;
  }


  render() {

    const { author, title, mdExample } = this.state.doc;

    const authorStr = Object.keys({ author })[0];
    const titleStr = Object.keys({ title })[0];
    const mdExampleStr = Object.keys({ mdExample })[0];

    return (
      <div className="App">
        <br />
        <div className="row">
          <div className="col s6 input">
            <form className="col s12">

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldName={authorStr}
                    value={author}
                    action={this.onInputChange(authorStr)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldName={titleStr}
                    value={title}
                    action={this.onInputChange(titleStr)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <InputField
                    fieldName={mdExampleStr}
                    value={mdExample}
                    action={this.onInputChangeMd}
                  />
                </div>
              </div>

            </form>
          </div>

          <div className="col s6 output">
            <OutputField output={this.state.doc.author} />
            <OutputField output={this.state.doc.title} />

            <OutputField output={this.state.doc.mdResult} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;