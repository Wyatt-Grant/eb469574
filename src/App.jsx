import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityList from './ActivityList.jsx';
import { DataProvider } from './DataContext.jsx';



const App = () => {
  return (
    <DataProvider>
      <div className='container'>
        <Header/>
        <div className="container-view overflow-auto">
          <ActivityList />
        </div>
      </div>
    </DataProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
