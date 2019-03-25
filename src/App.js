import './App.css';
import 'normalize.css'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import InputField from './components/InputField';
import OutputField from './components/OutputField';
import Navbar from './components/Navbar'

import logo from './logo.jpg';

//import data
import doc from './files/data.js';

//regex for future script: '(?<=§§JSONBLOCK_START§§)(.*\n?)*(?=§§JSONBLOCK_END§§)'

var md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-footnote'));;
var FileSaver = require('file-saver');
var beautify_js = require('js-beautify');
var beautify_html = require('js-beautify').html;

// let handlebars = require('handlebars');


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      doc,
    }
  }

  myXOR = (a, b) => {
    return (a || b) && !(a && b);
  }
  onDismiss = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onInputChangeMd = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2] = event.target.value
    doc.mdResult[1] = md.render(doc[param[0]][2])
    this.setState({ doc });
  }

  onInputChange = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2] = event.target.value
    this.setState({ doc });

  }



  downloadMD = (event) => {
    let jsonData = {};
    for (let field in this.state.doc) {
      if (!this.myXOR((field === 'mdText'), (field ==='mdResult'))) {
        // jsonData.field[0] = field[2];
        jsonData[field] = this.state.doc[field][2];
      }

    }
    console.log(jsonData);
    //Prepare String for future manipulation
    jsonData = beautify_js(JSON.stringify(jsonData));
    jsonData = "§§JSONBLOCK_START§§\n" + jsonData + "\n§§JSONBLOCK_END§§\n\n"

    //Add markdown block
    jsonData = jsonData + this.state.doc.mdText[2]

    let blob = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "generated.md"); 
  }

  downloadHtml = (event) => {
    alert("Функция не работает еще полноценно!")
    let blob = new Blob([this.state.doc.mdResult[1]], {type: "text/html;charset=utf-8"});
    FileSaver.saveAs(blob, "generated.html"); 
  }

  inDevAlert = (event) => {
    alert('Данная функция находится еще в разработке!');
  }


  dummyMethod = (event) => {
    return;
  }


  render() {

    const { author, title, origin, source, mdText } = this.state.doc;

    return (
      <Router>
      <div className="App">
        <Navbar onClickMD={this.downloadMD} onClickHtml={this.downloadHtml} inDevAlert={this.inDevAlert} />
        <div className="row shadow">
          <div className="col s6 input">
            <br />
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
            <OutputField output={this.state.doc.mdResult[1]} />
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;