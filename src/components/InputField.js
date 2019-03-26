import React from 'react';

const InputField = ({ fieldId ,label, value, action, highlight }) => 
    <div className="input-field">
        <textarea
            id={fieldId}
            className="materialize-textarea"
            value={value}
            onChange={action}
        ></textarea>
        <label htmlFor={fieldId}>{label}</label>
    </div>


export default InputField;