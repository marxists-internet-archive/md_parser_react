import React from 'react';

const OutputField = ({ output }) =>
    <div dangerouslySetInnerHTML={{ __html: output }}></div>


export default OutputField;