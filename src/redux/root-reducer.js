import { combineReducers } from 'redux';
import blockchainReducer from './blockchain/blockchain.reducer';

const rootReducer = combineReducers({
  blocks: blockchainReducer
});

export default rootReducer