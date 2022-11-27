import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrement = () => {
    setGood(good + 1)
  }

  const neutralIncrement = () => {
    setNeutral(neutral + 1)
  }

  const badIncrement = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  const averageScore = (good - bad)/all
  const positivePorcent = 100 / all * good

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={goodIncrement}>Good</button>
      <button onClick={neutralIncrement}>Neutral</button>
      <button onClick={badIncrement}>Bad</button>
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {averageScore}%</div>
      <div>positive {positivePorcent}%</div>
    </div>
  )
}

export default App