import React, { useState } from 'react'

const Statistics = (props) => {

  if (props.all > 0){
  return(
    <table>
        <tr><h1>statistics</h1></tr>
        <StatisticLine text="good" value={props.good}/>      
        <StatisticLine text="neutral" value={props.neutral}/> 
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

const Button =(props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)
  let all = good + neutral + bad
  let average = ((good - bad)/all).toFixed(1)
  let positive = (good/all*100).toFixed(1) +` %`

  return (
    <div>
     <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <Button onClick={addGood} text="good"/>
        <Button onClick={addNeutral} text="neutral"/>
        <Button onClick={addBad} text="bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App