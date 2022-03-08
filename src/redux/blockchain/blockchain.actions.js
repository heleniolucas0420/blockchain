import BlockchainActionTypes from './blockchain.types';

export const addBlock = data => ({
  type: BlockchainActionTypes.ADD_BLOCK,
  payload: data
});

export const updateBlock = data => ({
  type: BlockchainActionTypes.UPDATE_BLOCK,
  payload: data
});

export const fixBlock = blockIndex => ({
  type: BlockchainActionTypes.FIX_BLOCK,
  payload: blockIndex
});