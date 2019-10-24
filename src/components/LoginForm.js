import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 520,
  },
  button: {
    margin: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
}))

export default function LoginForm(props) {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    password: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:
      'center', alignItems: 'center', marginTop: '1rem'}}>
        <LockOpenIcon style={{width: '40px', height: '40px'}} />
        <Typography
          variant="h4">
          Login
        </Typography>
      </div>
    {
    props.formError
    ?
    <Typography component="div" variant="h6" style={{ backgroundColor: '#cfe8fc', height: '5vh' }}>{`${props.formErrorText}`}</Typography>
    :
    ""
    }

    <form
      className={classes.container}
      noValidate
      autoComplete="off">
      <TextField
        id="standard-username"
        label="Username"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        className={classes.textField}
        value={values.password}
        onChange={handleChange('password')}
        type="password"
        margin="normal"

      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={ () => {props.logIn(values.name, values.password)} }>
        Login
      </Button>
    </form>
    </Container>
  );
}
