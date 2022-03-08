import React from 'react';

import './custom-input.styles.scss';

const CustomInput = ({ data, changeData }) => {
  return (
    <div className='input-row'>
      <span className='input-row_label'>DATA</span>
      <input className='input-row_input' onChange={changeData} value={data} placeholder='Add blockchain data'/>
    </div>
  );
}

export default CustomInput;