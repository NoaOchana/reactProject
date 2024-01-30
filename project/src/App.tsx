import React from 'react';
import logo from './logo.svg';
import './App.scss';
import UserList from './components/user-list/user-list';
import MyModal from './components/my-modal/my-modal';

function App() {
  return (
    <div className="App">
      <UserList></UserList>
      {/* <MyModal title={'Are you sure you want to delete the user?'}></MyModal> */}
    </div>
  );
}

export default App;
