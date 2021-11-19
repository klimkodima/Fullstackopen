import React, { useState } from 'react'

const Statistics = (props) => {

  if (props.all > 0){
  return(
    <>
    <div>
        <h1>statistics</h1>
      </div>
      <div>
        <StatisticLine text="good" value={props.good}/>      
        <StatisticLine text="neutral" value={props.neutral}/> 
        <StatisticLine text="bad" value={props.bad}/> 
        <StatisticLine text="all" value={props.all}/> 
        <StatisticLine text="average" value={props.average}/> 
        <StatisticLine text="positive" value={props.positive}/> 
      </div>
    </>
  )} else {
    return (
      <>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <p>No feedback given</p>
      </div>
    </>
    )
  }

}

const StatisticLine =(props) => {
  return (
  <p>{props.text} {props.value}</p>
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
  let average = (good - bad)/all
  let positive = good/all*100

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