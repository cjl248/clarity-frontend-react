// import React from 'react';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(props) {

  const classes = useStyles()
  const [active, setActive] = useState(false)

  const renderList = () => {
    return (
      <List>
        {['Journal', 'Meditate', 'Videos', 'Inspirations'].map((text, index) => (
          <ListItem button key={text} onClick={ () => {handleMenuItemClick(text)} }>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    )
  }

  const handleMenuItemClick = (text) => {
    setActive(!active)
    props.setActivePage(text)
  }

  const handleClick = () => {
    setActive(!active)
  }

  // console.log(active)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
          props.loggedIn
          ?
          <>
          <Typography variant="h4" className={classes.menuButton}>
          Clarity
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Button
          variant="contained"
          color="primary"
          style={ {margin: '1vh'} }
          onClick={ props.logOut }>
          Log Out
          </Button>
          </>
          :
          <Typography variant="h4" className={classes.menuButton}>
          Clarity
          </Typography>
          }
        </Toolbar>
      </AppBar>
      {
      active
      ?
      <Drawer anchor="left" open={active} onClose={handleClick}>
        {renderList()}
      </Drawer>
      :
      ''
      }

    </div>
  );
}
