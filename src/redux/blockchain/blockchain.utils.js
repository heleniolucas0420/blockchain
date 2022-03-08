import { sha256 } from 'js-sha256';

export const generateHashData = (index, previousHash, timestamp, data, nonce) => {
  let currentNonce = nonce;
  let hash = 0;
  let count = []

  while (count.length < 3) {
    count = [];
    hash = sha256(index + previousHash + timestamp + data + currentNonce);

    for (let i = 0; i < 3; i ++) {
        if (hash[i] === '0') {
          count.push(hash[i]);
        }
    }

    currentNonce++;
  }
  
  return [hash, currentNonce];
}


export const generateValidHashOnly = (index, previousHash, timestamp, data, nonce) => {
  let currentNonce = nonce;
  let hash = 0;
  let count = []

  while (count.length < 3) {
    count = [];
    hash = sha256(index + previousHash + timestamp + data + currentNonce);

    for (let i = 0; i < 3; i ++) {
        if (hash[i] === '0') {
          count.push(hash[i]);
        }
    }

    currentNonce++;
  }
  
  return hash;
}


export const getNonceOnly = (index, previousHash, timestamp, data, nonce) => {
  let currentNonce = nonce;
  let hash = 0;
  let count = []

  while (count.length < 3) {
    count = [];
    hash = sha256(index + previousHash + timestamp + data + currentNonce);

    for (let i = 0; i < 3; i ++) {
        if (hash[i] === '0') {
          count.push(hash[i]);
        }
    }

    currentNonce++;
  }
  
  return currentNonce;
}


export const generateHash = (index, previousHash, timestamp, data, nonce) => {
  const hash = sha256(index + previousHash + timestamp + data + nonce);
  return hash;
}


export const checkValidHash = hash => {
  const count = [];

  for (let i = 0; i < 3; i ++) {
      if (hash[i] === '0') {
        count.push(hash[i]);
      }
  }

  if (count.length === 3) {
    return true;
  } else {
    return false;
  }
}


export const updateBlockchain = blocks => {
  const realUpdatedBlocks = [];

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].index === 0) {
      realUpdatedBlocks.push(blocks[i]);
    } else if (blocks[i].prevHash !== realUpdatedBlocks[i - 1].hash) {
      const newHash = generateHash(blocks[i].index, realUpdatedBlocks[i - 1].hash, blocks[i].timestamp, blocks[i].data, blocks[i].nonce)
      realUpdatedBlocks.push({
        ...blocks[i],
        hash: newHash,
        prevHash: realUpdatedBlocks[i - 1].hash,
        validHash: checkValidHash(newHash),
        validPrevHash: checkValidHash(realUpdatedBlocks[i - 1].hash)
      });
    } else {
      realUpdatedBlocks.push(blocks[i]);
    }
  }

  return realUpdatedBlocks;
}


export const addNewBlock = (blocks, data) => {
  const newBlock = {
    blockTag: 'BLOCK#',
    hash: 0,
    prevHash: blocks[blocks.length-1].hash,
    timestamp: new Date().toUTCString(),
    data: data,
    nonce: 0,
    validHash: true
  }

  const blockIndex = blocks[blocks.length-1].index + 1;
  const [hash, currentNonce] = generateHashData(blockIndex, newBlock.prevHash, newBlock.timestamp, newBlock.data, newBlock.nonce);
  const validPrevHash = checkValidHash(newBlock.prevHash);

  const newBlocks = [...blocks, {...newBlock, index: blockIndex, blockTag: `BLOCK#${blockIndex}`, hash: hash, nonce: currentNonce - 1, validPrevHash}];

  return newBlocks;
}


export const updateBlocks = (blocks, data) => {
  const blockToUpdateArray = blocks.filter(block => block.index === data.index);
  const blockToUpdate = blockToUpdateArray[0];

  const newHash = generateHash(blockToUpdate.index, blockToUpdate.prevHash, blockToUpdate.timestamp, data.newData, blockToUpdate.nonce);
  
  const newBlocks = blocks.map(block => {
      if (block.index === blockToUpdate.index) {
        return {...block, hash: newHash, data: data.newData, validHash: checkValidHash(newHash)}
      } else {
        return block
      }
    }
  );

  return updateBlockchain(newBlocks);
}


export const fixBlock = (blocks, blockIndex) => {
  const blockToFixArray = blocks.filter(block => block.index === blockIndex);
  const blockToFix = blockToFixArray[0];

  const newTimestamp = new Date().toUTCString();
  const [hash, currentNonce] = generateHashData(blockToFix.index, blockToFix.prevHash, newTimestamp, blockToFix.data, 1);
  // const validPrevHash = checkValidHash(blockToFix.prevHash);

  const newBlocks = blocks.map(block => {
      if (block.index === blockToFix.index) {
        return {...block, hash: hash, data: blockToFix.newData, validHash: checkValidHash(hash), timestamp: newTimestamp, nonce: currentNonce - 1}
      } else {
        return block
      }
    }
  );
  
  return updateBlockchain(newBlocks);
}