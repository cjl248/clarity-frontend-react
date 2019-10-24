import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: 'white',
    color: '#3F51B5'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  }
}));

export default function JournalForm(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: '',
    date: '',
    content: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const renderEntryErrors = () => {
    if (props.entryError) {
      return props.entryErrorMessages.map((error, index) => {
        return (
          <Typography
            key={index}
            component="div"
            style={{color: '#3f51b5', height: '3vh', marginTop: '3vh', marginBottom: '3vh', borderRadius: '5px' }}>
            {error+"!"}
          </Typography>
        )
      })
    } else return
  }

  // console.log(values)

  return (
    <>
    <Typography
      component="div"
      variant="h5"
      style={{ paddingTop: '0.5rem', backgroundColor: '#3f51b5', color: 'white', height: '2.5rem', marginTop: '2rem', borderRadius: '5px' }}>
      {"New Entry"}
    </Typography>
    {renderEntryErrors()}
    <form
      className={classes.container}
      noValidate
      autoComplete="off">
      <TextField
        id="outlined-title"
        label="Title"
        fullWidth
        className={classes.textField}
        value={values.title}
        onChange={handleChange('title')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-date"
        label="Date"
        fullWidth
        className={classes.textField}
        value={values.date}
        onChange={handleChange('date')}
        margin="normal"
        variant="outlined"
        helperText="YYYY-MM-DD"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Content"
        multiline
        rows="6"
        fullWidth
        value={values.content}
        onChange={handleChange('content')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <Button
        style={{}}
        size="large"
        color="primary"
        variant="contained"
        onClick={() => {props.createJournalEntry(values.title, values.date, values.content)}}>
        Submit
      </Button>
    </form>
    </>
    )
  }
