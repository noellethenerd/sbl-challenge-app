import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import  Dedupe  from './components/Dedupe/Dedupe.tsx';

class App extends Component {
  state = {sequences: []}
  
  async componentDidMount() {
    const response = await fetch('/sequences');
    const dnaSeq = await response.json();
    console.log('dnaSeq: ', dnaSeq);
    this.setState({sequences: dnaSeq});
  }

render() {
  return (
    <div className="App">
      <header className="App-header">
      <Dedupe sequences={this.state.sequences}></Dedupe>
      </header>
    </div>
  );
}

}
export default App;
