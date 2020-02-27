import React from 'react';
import logo from './logo.svg';
import './App.css';

const questions = [{
    q: "Who are you?",
    rs: [
      "A person.",
      "Nobody.",
      "Just me."
    ]
  },
  {
    q: "What's going on?",
    rs:[
      "Nothing.",
      "Something.",
      "All the things."
    ]
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Questionaire questions={questions} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class Questionaire extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {}
    }
  }

  registerResponse(q, a) {
    var results = {...this.state.results}
    results[q] = a
    this.setState({
      results: results
    })
  }

  displayQuestions() {
    return this.props.questions.map((q) =>
      <TextOptionSelect
        question={q.q}
        responses={q.rs}
        registerResponse={(q, a) => this.registerResponse(q, a)}
      />
    )
  }

  hasResults() {
    const r = this.state.results
    return Object.entries(r).length !== 0 && r.constructor === Object
  }

  displayResultSummary() {
    return Object.keys(this.state.results).map((question) => 
      <p>
        Q: {question} A: {this.state.results[question]}
      </p>
    )
  }

  displayResults() {
    if (this.hasResults()) {
      return <div>
          <h2>Questionaire Results</h2>
          {this.displayResultSummary()}
        </div>
    }
  }

  render() {
    return <div>
        <h2>Please answer the following questions.</h2>
        {this.displayQuestions()}
        {this.displayResults()}
      </div>
  }
}

class TextOptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onSelect(question, response) {
    this.setState({activeResponse: response})
    this.props.registerResponse(question, response)
  }

  activityClass(response) {
    if ("activeResponse" in this.state && this.state.activeResponse === response) {
      return "active"
    }
  }

  render() {
    return <div className="text-option-select">
      <p>
        Q: {this.props.question}
      </p>
      
      <p>
        <ul>
          {this.props.responses.map((r) =>
            <li 
              onClick={() => this.onSelect(this.props.question, r)}
              className={this.activityClass(r)}
            >
              {r}
            </li>
          )}
        </ul>
      </p>
    </div>
  }
}

export default App;
