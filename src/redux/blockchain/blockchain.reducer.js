import BlockchainActionTypes from "./blockchain.types";

import { generateHashData, addNewBlock, updateBlocks, fixBlock } from './blockchain.utils';

const timestamp = new Date().toUTCString();
const [hash, currentNonce] = generateHashData(0, 0, timestamp, 'Welcome to my blockchain!', 0);

const INITIAL_STATE = [
  {
    index: 0,
    blockTag: 'GENESIS BLOCK',
    hash: hash,
    prevHash: 0,
    timestamp: timestamp,
    data: 'Welcome to my blockchain!',
    nonce: currentNonce - 1,
    validHash: true,
    validPrevHash: true
  }
]

const blockchainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BlockchainActionTypes.ADD_BLOCK:
      return addNewBlock(state, action.payload);
    
    case BlockchainActionTypes.UPDATE_BLOCK:
      return updateBlocks(state, action.payload);

    case BlockchainActionTypes.FIX_BLOCK:
      return fixBlock(state, action.payload);

    default:
      return state;
  }
}

export default blockchainReducer;