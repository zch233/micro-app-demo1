import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('micro-react');
    console.log(window.microApp.getData(), 'micro-react init data');
    window.microApp.dispatch({type: '子应用发送的数据 init'})
    const dataHandler = (data) => {
      console.log(data, 'micro-react data change');
    }
    window.microApp.addDataListener(dataHandler)
    setTimeout(() => {
      window.microApp.dispatch({type: '子应用发送的数据 update'})
    }, 3000)
    return () => {
      window.microApp.removeDataListener(dataHandler)
    }
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
