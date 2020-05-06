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
    activePage: null,
    activePicture: '',
    darkMode: false,
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
      return (<MeditationContainer style={{width: '100%', height: '100%'}} currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Journal') {
      return (<JournalContainer currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Videos') {
      return(<VideoContainer currentUser={this.state.currentUser} />)
    } else if (this.state.activePage === 'Inspirations') {
      return (<InspirationsContainer style={{width: '100%', height: '100%'}} currentUser={this.state.currentUser} setActivePage={this.setActivePage} />)
    }
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      currentUser: null
    })
    localStorage.clear()
  }

  toggleDarkMode = () => {
    console.log("clicked")
  }

  render() {
    // console.log(this.state)
    return (
      <div className="App" style={{width: '100%', height: '100%'}}>
        <Nav
          loggedIn={this.state.loggedIn}
          logOut={this.logOut}
          setActivePage={this.setActivePage}
          toggleDarkMode={this.toggleDarkMode}
          id="nav"
        />
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
