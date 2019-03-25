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

  onInputChangeMd = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2]= event.target.value
    doc.mdResult = md.render(doc[param[0]][2])
    this.setState({ doc });
  }

  onInputChange = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2] = event.target.value
    this.setState({ doc });

  }

  dummyMethod = (event) => {
    return;
  }


  render() {

    const { author, title, origin, source, mdText } = this.state.doc;

    return (
      <div className="App">
        <br />
        <div className="row">
          <div className="col s6 input">
            <form className="col s12">

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldId={author[0]}
                    label={author[1]}
                    value={author[2]}
                    action={this.onInputChange(author)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldId={title[0]}
                    label={title[1]}
                    value={title[2]}
                    action={this.onInputChange(title)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldId={origin[0]}
                    label={origin[1]}
                    value={origin[2]}
                    action={this.onInputChange(origin)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s6">
                  <InputField
                    fieldId={source[0]}
                    label={source[1]}
                    value={source[2]}
                    action={this.onInputChange(source)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                <InputField
                    fieldId={mdText[0]}
                    label={mdText[1]}
                    value={mdText[2]}
                    action={this.onInputChangeMd(mdText)}
                  />
                </div>
              </div>

            </form>
          </div>

          <div className="col s6 output">
            <h2><OutputField output={this.state.doc.author[2]} /></h2>
            <h1><OutputField output={this.state.doc.title[2]} /></h1>
            <h3><OutputField output={this.state.doc.origin[2]} /></h3>
            <strong><OutputField output={this.state.doc.source[2]} /></strong>
            <OutputField output={this.state.doc.mdResult} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;