import React, {Component} from 'react';
import './App.css';
import MainView from './components/MainView/MainView';
import MyNavBar from './components/MyNavBar/MyNavBar';

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <MyNavBar/>
          </header>
          <div className="App-body">
            <MainView/>
          </div>
        </div>
    );
  }
}

export default App;
