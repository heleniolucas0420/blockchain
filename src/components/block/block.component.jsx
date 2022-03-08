import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FaWrench } from 'react-icons/fa'

import CustomInput from '../custom-input/custom-input.component';

import { updateBlock, fixBlock } from '../../redux/blockchain/blockchain.actions';

import './block.styles.scss';

const Block = ({ index, blockTag, hash, prevHash, timestamp, data, nonce, validHash, validPrevHash, updateBlock, fixBlock }) => {
  const [blockData, setBlockData] = useState(data);

  const changeData = event => {
    event.preventDefault();
    setBlockData(event.target.value);
  }

  const onFixBlock = event => {
    event.preventDefault();
    fixBlock(index);
  }

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      updateBlock({
        index,
        newData: blockData
      });
    } else {
      isMounted.current = true;
    }
  }, [blockData]);


  return (
    <div className='block-container'>
      <CustomInput data={blockData} changeData={changeData}/>
      <div className='block-row'>
        <span className='tag'>PREVIOUS HASH</span>
        <span className={`${validPrevHash ? 'previous-hash' : 'invalid-previous-hash'}`}>{prevHash}</span>
      </div>
      <div className='block-row'>
        <span className='tag'>HASH</span>
        <span className={`${validHash ? 'valid-hash' : 'invalid-hash'}`}>{hash}</span>
      </div>
      <div className='block-id'>
        <div>
          <span className='block-tag'>{blockTag}</span>
          <span className='timestamp'>on {timestamp}</span>
        </div>
        {
          validHash ? (
            <span className='nonce'>{nonce}</span>
          ) : (
            <button className='fix-block_button' onClick={onFixBlock}>
              <FaWrench />
            </button>
          )
        }
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateBlock: dataObj => dispatch(updateBlock(dataObj)),
  fixBlock: BlockIndex => dispatch(fixBlock(BlockIndex))
});

export default connect(null, mapDispatchToProps)(Block);