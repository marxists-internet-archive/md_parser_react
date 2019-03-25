import React from 'react';

const SplitScreen = ({ author, title, origin, source, mdText }) =>
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
            <OutputField output={this.state.doc.mdResult[1]} />
        </div>
    </div>


export default SplitScreen;