import React from 'react';
import { Provider } from 'react-redux';
import { store } from './createConnect';
import Count from './count';
import Count2 from './count2';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>redux with react-redux</div>
        <Count />
        <div>redux with rims</div>
        <Count2 />
      </Provider>
    )
  }
}

export default App;