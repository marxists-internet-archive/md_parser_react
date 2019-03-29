import './App.css';
import 'normalize.css'
import M from 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InputField from './components/InputField';
import OutputField from './components/OutputField';
import Navbar from './components/Navbar';

import moment from 'moment';
import 'moment/locale/ru';

//editor utils
import { Editor, EditorState, RichUtils } from 'draft-js';

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
const Typograf = require('typograf');
const tp = new Typograf({ locale: ['ru', 'en-US'] });
let timeout = null;




// let handlebars = require('handlebars');


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      doc,
      timeout,

    }
  }

  componentDidMount() {
    console.log('render markdown text')
    this.renderMD(this.state.doc.mdText);
    M.AutoInit();
    window.addEventListener("resize", this.changeDropdownWidth);
    window.addEventListener("resize", this.changeDropdownWidthTools);
    this.changeDropdownWidth();
    this.changeDropdownWidthTools();

  }



  changeDropdownWidth = () => {
    let dropdownCol = document.getElementById("dropdownWidth");
    let dropdown = document.getElementById("dropdownTrigger");
    // console.log(dropdownCol.offsetWidth);
    dropdown.style["width"] = (dropdownCol.offsetWidth * 0.9) + "px";
  }

  changeDropdownWidthTools = () => {
    let dropdownCol = document.getElementById("dropdownWidthTools");
    let dropdown = document.getElementById("dropdownTriggerTools");
    // console.log(dropdownCol.offsetWidth);
    dropdown.style["width"] = (dropdownCol.offsetWidth * 0.9) + "px";
  }

  myXOR = (a, b) => {
    return (a || b) && !(a && b);
  }
  onDismiss = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  renderMD = (param) => {
    let doc = { ...this.state.doc };
    doc.mdResult[1] = md.render(doc[param[0]][2])
    this.setState({ doc }, () => { this.generateChapters(); });
  }

  onInputChangeMd = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2] = event.target.value
    doc.mdResult[1] = md.render(tp.execute(doc[param[0]][2]))
    this.setState({ doc });

  }

  onInputChange = (param) => (event) => {
    let doc = { ...this.state.doc };
    doc[param[0]][2] = event.target.value
    this.setState({ doc });

  }

  onInputChangeDate = (param) => (event) => {
    let doc = { ...this.state.doc };
    moment.locale('ru');
    const dateString = event.target.value;
    const ruMoment = moment(event.target.value);
    doc[param[0]][2] = event.target.value

    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      doc.dateResult[1] = ruMoment.format('LL')
    } else if (dateString.match(/^\d{4}-\d{2}$/)) {
      doc.dateResult[1] = ruMoment.format('MMMM YYYY');
    } else if (dateString.match(/^\d{4}$/)) {
      doc.dateResult[1] = ruMoment.format('YYYY') + "-й";
    } else {
      doc.dateResult[1] = '<p style="color:red">Пожалуйста введите правильный формат числа! Например 1917 или 1917-11 или 1917-11-07</p>'
    }

    this.setState({ doc });
  }

  generateChapters = () => {
    const chapters = document.querySelectorAll("h2");
    const dropdown = document.getElementById("dropdown1");
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }
    console.log('generate chapters');
    // chapters.forEach((heading) => {
    //   console.log(heading.textContent)
    // });
    for (let i = 0; i < chapters.length; i++) {
      //create link from h2 elem
      let li = document.createElement("li");
      let linkText = document.createTextNode(chapters[i].textContent);
      let a = document.createElement("a");
      a.appendChild(linkText);
      a.href = "#chapter" + [i + 1];
      li.appendChild(a);
      //append to dropdown
      dropdown.appendChild(li);

      //seed chapters id's to h2
      chapters[i].id = 'chapter' + (i + 1);
    }


  }

  downloadMD = (event) => {
    // TODO: Check if fields are filled.
    let jsonData = {};
    for (let field in this.state.doc) {
      if (!this.myXOR((field === 'mdText'), (field === 'mdResult'))) {
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

    let blob = new Blob([jsonData], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "generated.md");
  }


  downloadHtml = (event) => {
    alert("Функция не работает еще полноценно!")
    let blob = new Blob([this.state.doc.mdResult[1]], { type: "text/html;charset=utf-8" });
    FileSaver.saveAs(blob, "generated.html");
  }


  inDevAlert = (event) => {
    alert('Данная функция находится еще в разработке!');
  }


  dummyMethod = (event) => {
    return;
  }

  addTag = (param, open, close, cursorOffset) => (event) => {
    document.getElementById('mdText').focus();
    console.log(document.activeElement.value);
    let text = document.activeElement
    const start = text.selectionStart;
    const end = text.selectionEnd;

    let doc = { ...this.state.doc };
    let input = text.value;
    console.log(start + " " + end);
    var output = [
      input.slice(0, start),
      open,
      input.slice(start, end),
      close,
      input.slice(end)
    ].join('')

    doc[param[0]][2] = output;
    this.setState({
      doc
    }, () => { this.setCursor(start, cursorOffset, 'mdText'); })
  }

  setCursor(pos, offset, selector) {
    document.getElementById(selector).focus();
    document.getElementById(selector).setSelectionRange(pos + offset, pos + offset);
  }




  render() {

    const { author, title, origin, source, date, publication, keywords, translation, mdText } = this.state.doc;

    return (
      <Router>
        <div className="App">
          <Navbar
            onClickMD={this.downloadMD}
            onClickHtml={this.downloadHtml}
            inDevAlert={this.inDevAlert}
            addFootNote={this.addTag(mdText, '^[]', '', 2)}
            genChapters={this.generateChapters}

          />
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
                  <div className="col s6">
                    <InputField
                      fieldId={date[0]}
                      label={date[1]}
                      value={date[2]}
                      action={this.onInputChangeDate(date)}
                    />
                  </div>
                </div>


                <div className="row">
                  <div className="col s6">
                    <InputField
                      fieldId={publication[0]}
                      label={publication[1]}
                      value={publication[2]}
                      action={this.onInputChange(publication)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s6">
                    <InputField
                      fieldId={keywords[0]}
                      label={keywords[1]}
                      value={keywords[2]}
                      action={this.onInputChange(keywords)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s6">
                    <InputField
                      fieldId={translation[0]}
                      label={translation[1]}
                      value={translation[2]}
                      action={this.onInputChange(translation)}
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

              <div lang="ru" className="mdtext-prewiev">
                <div className="mdtext-prewiev__header">

                  <div className="mdtext-prewiev__author"><OutputField output={this.state.doc.author[2]} /></div>
                  <h1 className="mdtext-prewiev__title"><OutputField output={this.state.doc.title[2]} /></h1>
                </div>

                <div className="mdtext-prewiev__body">
                  <hr />
                  <div className="mdtext-prewiev__origin">
                    <strong className="mdtext-prewiev__origin-description">Источник: </strong><a href={this.state.doc.source[2]}><OutputField output={this.state.doc.origin[2]} /></a>
                  </div>

                  <div className="mdtext-prewiev__origin">
                    <strong className="mdtext-prewiev__origin-description">Впервые опубликованно: </strong>
                    <OutputField output={this.state.doc.dateResult[1]} /> <OutputField output={this.state.doc.publication[2]} />
                  </div>
                  <hr />
                  {/* <OutputField output={this.state.doc.source[2]} /> */}
                  <div className="mdtext-prewiev__text">
                    <OutputField output={this.state.doc.mdResult[1]} />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;