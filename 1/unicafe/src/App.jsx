import { useState } from 'react'

const Header = (props) => {
  const { text } = props;
  return (
    <h1>{text}</h1>
  )
}

const Button = (props) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = (props) => {
  const header = "give feedback";
  const { feedback, good, neutral, bad } = props
  return (
    <>
    <Header text={header} />
    <Button onClick={good} text="good" />
    <Button onClick={neutral} text="neutral" />
    <Button onClick={bad} text="bad" />
    </>
  )
}

const StatisticLine = (props) => {
  const { reviewType, value } = props;
  return (
    <tr>
      <td>{reviewType}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const header = "statistics";
  const { feedback } = props
  if (feedback.all == 0)
  {
      return (
        <>
        <Header text={header} />
        <div>No feedback given</div>
        </>
      )
  }
  else
  return (
    <>
    <Header text={header} />
    <table>
    <tbody>
    <StatisticLine reviewType="good" value={feedback.good} />
    <StatisticLine reviewType="neutral" value={feedback.neutral} />
    <StatisticLine reviewType="bad" value={feedback.bad} />
    <StatisticLine reviewType="all" value={feedback.all} />
    <StatisticLine reviewType="average" value={feedback.average} />
    <StatisticLine reviewType="positive" value={feedback.positive} />
    </tbody>
    </table>

    </>
  )
}

function App(props) {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [all, setAll] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateStats = () => {
    const total = good + neutral + bad + 1;
    setAll(total);
    setAverage((good * 1 + bad * -1) / total);
    setPositive(good / total * 100);
  }

  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad,
    average: average,
    all: all,
    positive: positive
  }

  return (
    <>
    <Feedback feedback={feedback}
      bad={() => {setBad(bad + 1); updateStats()}}
      good={() => {setGood(good + 1); updateStats()}}
      neutral={() => {setNeutral(neutral + 1); updateStats()}}/>
    <Statistics feedback={feedback} />
    </>
  )
}

export default App
