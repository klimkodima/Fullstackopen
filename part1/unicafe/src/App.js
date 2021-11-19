import React, { useState } from 'react'

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
        <button onClick={addGood}>good</button>
        <button onClick={addNeutral}>neutral</button>
        <button onClick={addBad}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
      </div>
    </div>
  )
}

export default App