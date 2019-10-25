import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Countdown from 'react-countdown-now';

  const marks = [
    {
      value: 0,
      label: '0 min',
    },
    {
      value: 10,
      label: '10 min',
    },
    {
      value: 20,
      label: '20 min',
    },
    {
      value: 30,
      label: '30 min',
    },
    {
      value: 40,
      label: '40 min',
    },
    {
      value: 50,
      label: '50 min',
    },
    {
      value: 60,
      label: '60 min',
    },
  ];

  const containerStyle = {
    height: '93vh',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }

class MeditationContainer extends React.Component {

  state = {
    minutes: 0,
    timerStarted: false
  }

  handleChange = (e, newValue) => {
    this.setState({
      minutes: newValue
    })
  }

  valueText = (value) => {
    return `${value} minutes`
  }

  logSession = () => {
    const time = new Date()
    const currentDate = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
    const seconds = (this.state.minutes)*60
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        date: currentDate,
        length: seconds,
        category: ""
      })
    }

    fetch("http://localhost:3000/meditation_sessions", config)
    .then(r => r.json())
    .then(() => {
      this.setState({
        timerStarted: false
      })
    })
  }

  renderTimer = (time) => {
    if (this.state.timerStarted) {
      const newTime = time*60000
      return (
        <Countdown
          date={Date.now() + newTime}
          renderer={
            props => <Typography variant="h2">{`Minutes: ${props.minutes} | Seconds: ${props.seconds}`}</Typography>
          }
          onComplete={ this.logSession }>
        </Countdown>
      )
    } else {
      return (
        <Typography variant="h2">{`Minutes: 00 | Seconds: 00`}</Typography>
      )
    }
  }

  renderButtons = () => {
    if (this.state.timerStarted) {
      return (
          <Button
          variant="contained"
          color="primary"
          onClick={ () => {this.setState({timerStarted: false})} }>
          End
        </Button>
      )
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={ () => {this.setState({timerStarted: true})} }>
          Start
        </Button>
      )
    }
  }

  render() {
    return (
      <Container maxWidth="lg" style={containerStyle}>
        <Typography
          id="discrete-slider-always"
          component="span"
          variant="h4"
          gutterBottom>
          How long would you like your session to be?
        </Typography>
        <Slider
          max={60}
          defaultValue={this.state.minutes}
          getAriaValueText={this.valueText}
          aria-labelledby="discrete-slider-always"
          step={5}
          marks={marks}
          valueLabelDisplay="on"
          onChangeCommitted={this.handleChange}
        />
        {this.renderTimer(this.state.minutes)}
        {this.renderButtons()}
      </Container>
    )
  }

}

export default MeditationContainer

// <h1>{`${props.minutes}: ${props.seconds}`}</h1>
