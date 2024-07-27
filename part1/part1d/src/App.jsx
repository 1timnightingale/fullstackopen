import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <tr><td>{props.text}</td><td>{props.value} {props.suffix}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (<div>
    <table>
      <tbody>
        <Display text='Good' value={good} />
        <Display text='Neutral' value={neutral} />
        <Display text='Bad' value={bad} />
        <Display text='All' value={good + neutral + bad} />
        <Display text='Average' value={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} />
        <Display text='Positive' value={good / (good + neutral + bad) * 100} suffix='%' />
      </tbody>
    </table>
  </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(Array(anecdotes.length).fill(0))
  const [highest, setHighest] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const feedbackGoodClick = () => {
    const updatedGood = good + 1
    const updatedCount = count + 1
    setGood(updatedGood)
    setCount(updatedCount)
    setTotal(updatedGood + neutral + bad)
  }
  const feedbackNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }
  const feedbackBadClick = () => {
    const updatedBad = bad + 1
    const updatedCount = count - 1
    setBad(updatedBad)
    setCount(updatedCount)
    setTotal(good + neutral + updatedBad)
  }

  const addFeedback = (feedback) => {
    console.log('value now', newValue)
    addFeedback(feedback)
  }

  const Vote = (selected) => {
    const copyScores = [...scores]
    const updatedScore = copyScores[selected] + 1
    copyScores[selected] = updatedScore
    if (updatedScore > highest) {
      setMostVotes(selected)
      setHighest(updatedScore)
    }
    setScores(copyScores)
  }

  const getHelp = () => {
    const selection = Math.floor(Math.random() * anecdotes.length)
    setSelected(selection)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={feedbackGoodClick} text="Good" />
      <Button handleClick={feedbackNeutralClick} text="Neutral" />
      <Button handleClick={feedbackBadClick} text="Bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <p />
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> Has a score of {scores[selected]}</p>
      <button onClick={() => Vote(selected)} >Vote</button>
      <button onClick={getHelp} >Find another</button >
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>With {highest} votes</p>
    </div >
  )

}

export default App


