import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '1rem 0',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function JournalCard(props) {

  const classes = useStyles()

  const [values, setValues] = React.useState({
    title: '',
    date: '',
    content: '',
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const [editing, setEditing] = React.useState(false)

  const handleDelete = (id) => {
    props.deleteJournalEntry(id)
  }

  const handleSubmit = (id, title) => {
    setEditing(!editing)
    props.editJournalEntry(id, title)
  }

  const toggleEditing = () => {
    setEditing(!editing)
  }

  const renderEditForm = () => {
    if (editing) {
      return (
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
        >
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
          <Button
            style={{}}
            size="large"
            color="primary"
            variant="contained"
            onClick={ () => { handleSubmit(props.entry.id, values.title) } }
          >
            Submit
          </Button>
        </form>
      )
    } else return
  }

  // console.log(values.title)

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {`Title: ${props.entry.title}`}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {`Date: ${props.entry.date}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`Entry`}
        </Typography>
        <Typography variant="body2" component="p">
          {`${props.entry.content}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={toggleEditing}>
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={ () => { handleDelete(props.entry.id) } }>
          Delete
        </Button>
      </CardActions>
      {renderEditForm()}
    </Card>
  )
}

// onClick={ () => { handleSubmit(props.entry.id) } }
