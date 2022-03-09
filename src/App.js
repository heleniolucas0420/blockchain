import React from 'react';
import { connect } from 'react-redux';

import Block from './components/block/block.component';
import AddBlock from './components/add-block/add-block.component';
import PageFooter from './components/page-footer/page-footer.component';

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
      <PageFooter name='Mr. President' />
    </div>
  );
}

const mapStateToProps = state => ({
  blocks: state.blocks
});

export default connect(mapStateToProps)(App);
