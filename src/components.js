import React, { Component } from 'react';
import './components.css';
class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      increDecreStep:1,
      historyList:[],
      historyListSize:5,
    };
  }


  

  addElementInList = (hList,listSize,obj) =>{
    if(hList.length<listSize){
        hList.unshift(obj);
    }
    else {
        hList.pop();
        hList.unshift(obj);
    }
  }

  storeHistory = (increFlag) => {
    this.addElementInList(this.state.historyList,this.state.historyListSize,
        {count: this.state.count,
        increDecreStep:this.state.increDecreStep,
        flag:increFlag,
    });
    };
  incrementCount = () => {
    var errorMssgElement = document.getElementById('errorMssg');
    errorMssgElement.style.display = "none";
    this.setState({ count: this.state.count + this.state.increDecreStep });
    this.storeHistory(true);
  };

  decrementCount = () => {
    if(this.state.count<this.state.increDecreStep){
        var errorMssgElement = document.getElementById('errorMssg');
        errorMssgElement.innerHTML = '<p style="color: red;">Count cannot be negative</p>';
        errorMssgElement.style.display = "block";
    }else{
        this.setState({ count: this.state.count - this.state.increDecreStep });
        this.storeHistory(false);
    }
  };

  resetValues = () =>{
    this.setState({ count: 0,
        increDecreStep:1, 
        historyList:[],
    });
  };

  handleInputChange = (event) =>{
    let temp = event.target.value;
    if(temp===''||temp===NaN){
        temp=0;
    }
    else{
        temp = parseInt(temp);
    }
    this.setState({increDecreStep:temp});
  }
 


  render() {
//    const { historyList1 } = this.state.historyList;
    return (
      <div id = "CounterApp">
        <div id = "AppHeading">Counter App </div>
        <div id = "showCount">
            <p>Count: {this.state.count}</p>
        </div>
        <div id = 'errorMssg' class = 'error'></div>
        <button class = 'button' onClick={this.incrementCount}>Increment</button>
        <button class = 'button' onClick={this.decrementCount}>Decrement</button>
        <button class = 'button' onClick={this.resetValues}>Reset</button>
        <div id = "customIncreDecre">
            <p>Custom Increment Decrement</p>
            <input id = "increDecreStep" type = "text" value={this.state.increDecreStep} onChange = {this.handleInputChange}></input>
        </div>
        <div id = "historyDiv">

        <ul>
        {this.state.historyList.map((obj) => (
            <li key = {obj}> {obj.flag ?<p>count = {obj.count} increment =  {obj.increDecreStep}</p>
            :<p>count = {obj.count} decrement =  {obj.increDecreStep}</p>} </li>
          ))}

          
          </ul>
        </div>
      </div>
    );
  }
}

export default Counter;