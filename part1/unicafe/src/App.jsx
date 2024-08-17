import { useState } from 'react'

const Header = () => {
  return (
    <>
    <h1>give feedback</h1>
    </>
  )
}

const FeedbackButton = (props) => {
  return (
    <>
    <button onClick={props.handleClick}>{props.type}</button>
    </>
  )
}

const StatisticsHeader = () => {
  return (
    <h1>statistics</h1>
  )
}

const StatisticsComponent = (props) => {
  return (
    <>
    <p>{props.title} {props.value}</p>
    </>
  )
}

const StatisticsTotal = (props) => {
  return (
    <>
      <p>all {props.total}</p>
    </>
  )
}

const StatisticsAverage = (props) => {
  const totalPositive = props.good * 1;
  const totalNegative = props.bad * -1;
  return (
    <>
    <p>average {(totalPositive + totalNegative) / props.total}</p>
    </>
  )
}

const StatisticsPositivePercentage = (props) => {
  const positivePercentage = props.good / props.total * 100;
  return (
    <>
    <p>positive {positivePercentage} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  if (good != 0 || neutral != 0 || bad != 0) {
    return (
      <div>
        <Header></Header>
        <FeedbackButton type='good'  handleClick={() => setGood(good + 1)}></FeedbackButton>
        <FeedbackButton type='neutral' handleClick={() => setNeutral(neutral + 1)}></FeedbackButton>
        <FeedbackButton type='bad' handleClick={() => setBad(bad + 1)}></FeedbackButton>
        <StatisticsHeader></StatisticsHeader>
        <table>
        <tbody>
        <tr><StatisticsComponent title='good' value={good}></StatisticsComponent></tr>
        <tr><StatisticsComponent title='neutral' value={neutral}></StatisticsComponent></tr>
        <tr><StatisticsComponent title='bad' value={bad}></StatisticsComponent></tr>
        <tr><StatisticsTotal total={good + neutral + bad}></StatisticsTotal></tr>
        <tr><StatisticsAverage good={good} bad={bad} total={good + neutral + bad}></StatisticsAverage></tr>
        <tr><StatisticsPositivePercentage good={good} total={good + neutral + bad}></StatisticsPositivePercentage></tr>
        </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Header></Header>
        <FeedbackButton type='good'  handleClick={() => setGood(good + 1)}></FeedbackButton>
        <FeedbackButton type='neutral' handleClick={() => setNeutral(neutral + 1)}></FeedbackButton>
        <FeedbackButton type='bad' handleClick={() => setBad(bad + 1)}></FeedbackButton>
        <StatisticsHeader></StatisticsHeader>
        <p>No feedback given</p>
      </div>
    )
  }


}

export default App