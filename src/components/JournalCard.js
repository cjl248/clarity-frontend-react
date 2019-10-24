import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  // console.log(props.entry)

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
          {`Content`}
        </Typography>
        <Typography variant="body2" component="p">
          {`${props.entry.content}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained">
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={ () => {props.deleteJournalEntry(props.entry.id)} }>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
