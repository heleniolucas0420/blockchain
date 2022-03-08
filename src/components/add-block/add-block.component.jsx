import React, { useState } from 'react';
import { connect } from 'react-redux';

import CustomInput from '../custom-input/custom-input.component';

import { addBlock } from '../../redux/blockchain/blockchain.actions.js';

import './add-block.styles.scss';

const AddBlock = ({ addBlock }) => {
  const [blockData, setData] = useState('');

  const changeData = event => {
    setData(event.target.value);
  }

  const onSubmit = event => {
    event.preventDefault();
    addBlock(blockData)
  }

  return (
    <div className='add-block-container'>
      <CustomInput blockData={blockData} changeData={changeData}/>
      <button className='add-block_button' onClick={onSubmit}>+ ADD NEW BLOCK</button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addBlock: data => dispatch(addBlock(data))
})

export default connect(null, mapDispatchToProps)(AddBlock);