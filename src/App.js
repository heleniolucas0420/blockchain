import React from 'react';
import { connect } from 'react-redux';

import Block from './components/block/block.component';
import AddBlock from './components/add-block/add-block.component';

import './App.css';

const App = ({blocks }) => {
  return (
    <div className="App">
      <h1>BLOCKCHAIN</h1>
      {
        blocks.map(block => (
          <Block key={block.index} {...block} />
        ))
      }
      <AddBlock/>
    </div>
  );
}

const mapStateToProps = state => ({
  blocks: state.blocks
});

export default connect(mapStateToProps)(App);
