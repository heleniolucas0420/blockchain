import React from 'react';

import './page-footer.styles.scss';


const PageFooter = ({ name }) => (
  <div className='page-footer__container'>
    <div className='page-footer__credits'>
      created by <a href='https://github.com/heleniolucas0420' className='page-footer__user-name'>{name}</a> - ZTM Coding Challenges
    </div>
  </div>
);


export default PageFooter;