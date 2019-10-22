import React from 'react';
import './App.css';

import Nav from './components/Nav'
import LoginForm from './components/LoginForm'
import MeditationContainer from './containers/MeditationContainer'
import JournalContainer from './containers/JournalContainer'
import VideoContainer from './containers/VideoContainer'
import InspirationsContainer from './containers/InspirationsContainer'

import 'typeface-roboto';

class App extends React.Component {

  state = {
    loggedIn: false,
    currentUser: null,

    formError: false,
    formErrorText: null,

    activePage: null
  }

  logIn = (username, password) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }
    fetch("http://localhost:3000/login", config)
      .then(r => r.json())
      .then(user => {
        if (user.messages) {
          this.setState({
            formError: true,
            formErrorText: user.messages
          })
        }
        else {
          localStorage.username = user.username
          localStorage.pw = user.password_digest
          this.setState({
            loggedIn: true,
            currentUser: user,
            activePage: 'Inspirations'
          })
        }
      })

  }

  setActivePage = (activePage) => {
    this.setState({
      activePage
    })
  }

  renderActivePage = () => {
    if (this.state.activePage === 'Meditate') {
      return (<MeditationContainer currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Journal') {
      return (<JournalContainer currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Videos') {
      return(<VideoContainer currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Inspirations') {
      return (<InspirationsContainer currentUser={this.state.currentUser} />)
    }
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      currentUser: null
    })
    localStorage.clear()
  }

  render() {
    // console.log(this.state.activePage)
    return (
      <div className="App">
        <Nav loggedIn={this.state.loggedIn} setActivePage={this.setActivePage} logOut={this.logOut}/>
        {
          this.state.loggedIn
          ?
          this.renderActivePage()
          :
          <LoginForm logIn={this.logIn} formError={this.state.formError} formErrorText={this.state.formErrorText}/>
        }
      </div>
    );
  }

  componentDidMount() {
    if (!this.state.currentUser) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: localStorage.username,
          password: 'abc'
        })
      }
      // console.log(config)
      fetch("http://localhost:3000/login", config)
      .then(r => r.json())
        // .then(console.log)
      .then(data => {
        // if (data.messages) {
        //   this.setState({
        //     formError: true,
        //     formErrorText: data.messages
        //   })
        // } else {
          this.setState({
            loggedIn: true,
            currentUser: data,
            activePage: 'Inspirations'
          })
        // }
      })
    }
  }

}

export default App;

// <MeditationContainer currentUser={this.state.currentUser} />
