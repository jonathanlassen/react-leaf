import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RightSingle from '../RightSingle';
import { LeafProvider } from '../contexts/LeafContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const shop = {
    id: 1,
    name: 'test',
  };

  ReactDOM.render(
    <BrowserRouter>
      <LeafProvider>
        <RightSingle shop={shop} />
      </LeafProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
