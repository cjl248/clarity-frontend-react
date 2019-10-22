import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 50,
    width: 50,
  },
}));

export default function VideoResultCard(props) {

  const classes = useStyles()
  const theme = useTheme()
  const {id, title, thumbnail, date} = props.video

  const formatTitle = () => {
    const rawTitle = props.video.title
    return rawTitle.replace("&amp;", "and")
  }

  return (
    <Card
      className={classes.card}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        border: 'solid #3f51b5 2px',
        borderRadius: '5px',
        height: '100%',
        padding: '1vh',
        margin: '1vh 0'
      }}
    >
      <div className={classes.details} style={{ flexGrow: '5' }}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {formatTitle()}
          </Typography>
          <Typography component="h5" variant="h5" color="textSecondary" style={{paddingTop: '1rem'}}>
            {`Posted on: ${date}`}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause" onClick={() => {props.setActiveVideo(id)}}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
        </div>
      </div>

        <CardMedia
          className={classes.cover}
          image={thumbnail}
          title={formatTitle()}
          style={{
            flexGrow: '3',
            minWidth: '520px',
            maxWidth: '520px',
            height: '280px'
          }}
        />
    </Card>
  );
}
