import React from 'react';

const InputField = ({ fieldName, value, action }) => 
    <div className="input-field">
        <textarea
            id={fieldName}
            className="materialize-textarea"
            value={value}
            onChange={action}
        ></textarea>
        <label htmlFor={fieldName}>{fieldName}</label>
    </div>


export default InputField;