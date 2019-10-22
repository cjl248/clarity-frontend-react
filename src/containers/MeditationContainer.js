import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


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

  class MeditationContainer extends React.Component {

  state = {
    minutes: 0
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
    .then(console.log)
  }

render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <Typography component="div" variant="h6" style={{ backgroundColor: '#cfe8fc', height: '5vh' }}>
        {`Welcome back, ${this.props.currentUser.first_name}`}
        </Typography>


        <Container maxWidth="sm">
          <Typography id="discrete-slider-always" gutterBottom>{"How long would you like to meditate for?"}</Typography>
          <Slider
            max={60}
            defaultValue={this.state.minutes}
            getAriaValueText={this.valueText}
            aria-labelledby="discrete-slider-always"
            step={5}
            marks={marks}
            valueLabelDisplay="auto"
            onChangeCommitted={this.handleChange}
          />
        <Typography variant="h6" style={{flexGrow: 1}}>{`${this.state.minutes} minutes`}</Typography>

        <Button
          variant="contained"
          color="primary"
          style={ {margin: '10vh'} }
          onClick={ this.logSession }>
          Log Session
        </Button>
      </Container>

      </React.Fragment>
    )
  }

}

export default MeditationContainer
