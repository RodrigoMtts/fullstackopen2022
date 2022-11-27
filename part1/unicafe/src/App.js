import { useState } from 'react'

const StatisticLine = ({text,value}) => {
  const porcentSimbol = text==="positive" ? "%" : ""
  return <div>{text} {value}{porcentSimbol}</div>
}

const Statistics = ({good,neutral,bad}) => {
  const all = good + neutral + bad
  const averageScore = (good - bad)/all
  const positivePorcent = 100 / all * good

  if(all > 0){
  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={averageScore}/>
      <StatisticLine text="positive" value={positivePorcent}/>
    </>
  )
  }else{
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
}

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

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={goodIncrement}>Good</button>
      <button onClick={neutralIncrement}>Neutral</button>
      <button onClick={badIncrement}>Bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>      
    </>
  )
}

export default App