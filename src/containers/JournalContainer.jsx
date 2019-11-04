import React from 'react'
import Container from '@material-ui/core/Container'

import JournalCard from '../components/JournalCard'
import JournalForm from '../components/JournalForm'

export default class JournalContainer extends React.Component {

  state = {
    entries: this.props.currentUser.journal_entries,
    entryError: false,
    entryErrorMessages: null,

    editError: false,
    editErrorMessages: null
  }

  createJournalEntry = (title, date, content) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        title,
        date,
        content
      })
    }
    fetch("http://localhost:3000/journal_entries", config)
    .then(r => r.json())
    .then(entry => {
      if (entry.errors) {
        console.log(entry.errors);
        this.setState({
          entryError: true,
          entryErrorMessages: entry.errors
        })
      } else {
        this.setState({
          entries: [...this.state.entries, entry]
        })
      }
    })
  }

  renderJournalEntries = () => {
    if (this.state.entries) {
      return this.state.entries.map(entry => {
        return (
          <JournalCard
            key={entry.id}
            entry={entry}
            editJournalEntry={this.editJournalEntry}
            deleteJournalEntry={this.deleteJournalEntry}
          />
        )
      })
    }
  }

  // need editing parameters
  editJournalEntry = (id, title) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Accept": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title
      })
    }
    console.log("config: ", config);
    fetch(`http://localhost:3000/journal_entries/${id}`, config)
    .then(r => r.json())
    .then(console.log)
  }

  deleteJournalEntry = (id) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id
      })
    }
    fetch(`http://localhost:3000/journal_entries/${id}`, config)
    .then(r  => r.json())
    .then(() => {
      const updatedEntries = this.state.entries.filter(entry => {
        return !(entry.id === id)
      })
      this.setState({
        entries: updatedEntries
      })
    })
  }

  render() {
    return (
      <>
        <h1>{`Your Journal`}</h1>
        <Container maxWidth="md">
          {this.renderJournalEntries()}
          <JournalForm
            createJournalEntry={this.createJournalEntry}
            entryError={this.state.entryError}
            entryErrorMessages={this.state.entryErrorMessages}
          />
        </Container>
      </>
    )

  }
}
