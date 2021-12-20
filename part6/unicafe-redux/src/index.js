import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers/reducer'

const Statistics = (props) => {

  if (props.all > 0){
  return(
    <table>
        <tr><h1>statistics</h1></tr>
        <StatisticLine text="good" value={props.good}/>      
        <StatisticLine text="ok" value={props.ok}/> 
        <StatisticLine text="bad" value={props.bad}/> 
        <StatisticLine text="all" value={props.all}/> 
        <StatisticLine text="average" value={props.average}/> 
        <StatisticLine text="positive" value={props.positive}/> 
      </table>
  )} else {
    return (

      <table>
      <tr> <h1>statistics</h1> </tr>
      <tr> <span>No feedback given</span> </tr>
      </table>
    )
  }

}

const StatisticLine =(props) => {
  return (
  <tr><td>{props.text}</td><td>{props.value}</td> </tr>
  )
}

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const ok = () => {
    store.dispatch({ type: 'OK' })
  }

  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  let all = store.getState().good + store.getState().ok + store.getState().bad
  let average = ((store.getState().good - store.getState().bad)/all).toFixed(1)
  let positive = (store.getState().good/all*100).toFixed(1) +` %`

  return (
    <div>
     <div>
        <h1>give feedback</h1>
      </div>
      <div>
      <button onClick={ good }>good</button> 
      <button onClick={ ok }>ok</button> 
      <button onClick={ bad }>bad</button>
      <button onClick={ reset }>reset stats</button>
      </div>
      <Statistics good={store.getState().good} ok={store.getState().ok} bad={ store.getState().bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
