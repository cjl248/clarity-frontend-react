// import React from 'react';
import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

// Dark Mode
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// Icons
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import OndemandVideoRoundedIcon from '@material-ui/icons/OndemandVideoRounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import BlurOnRoundedIcon from '@material-ui/icons/BlurOnRounded';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingRight: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
  leftMenuButtons: {
    marginRight: theme.spacing(2),
  },
  rightMenuButtons: {
    marginLeft: theme.spacing(152),
    paddingRight: theme.spacing(0)
  },
  title: {
    flexGrow: 1,
  }
}));

export default function Nav(props) {

  const classes = useStyles()
  const [active, setActive] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // useEffect(()=> {
  //
  //   , [])

  const renderMenu = () => {
    if (active) {
      return (
        <Drawer anchor="left" open={active} onClose={handleClick}>
          {renderList()}
        </Drawer>)
    }
  }

  const renderIcon = (name) => {
    if (name === 'Journal') return (<BorderColorRoundedIcon />)
    if (name === 'Meditate') return (<BlurOnRoundedIcon />)
    if (name === 'Videos') return (<OndemandVideoRoundedIcon />)
    if (name === 'Inspirations') return (<WbSunnyRoundedIcon />)
  }

  const renderList = () => {
    return (
      <List>
        {['Journal', 'Meditate', 'Videos', 'Inspirations'].map((text, index) => (
          <ListItem button key={text} onClick={ () => {handleMenuItemClick(text)} }>
            <ListItemIcon>{renderIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {renderDarkModeSwitch()}
      </List>
    )
  }

  const renderDarkModeSwitch = () => {
    return (
      <FormControl component="fieldset">
        <FormControlLabel
          value="dark-mode"
          control={<Switch color="primary" value = {darkMode} onChange={handleDarkModeToggle} />}
          label="Dark Mode"
          labelPlacement="start"
        />
      </FormControl>
    )
  }

  const handleDarkModeToggle = (e) => {
    setDarkMode(!darkMode)
    const button = e.target

    // add classlist to APP
    const darkClass = null
    if (darkMode) {
      const darkClass = {background: "black" }
      e.target.classList.add(classes.darkClass)
    }
    else {
      e.target.classList.remove(classes.darkClass)
    }
  }

  const handleMenuItemClick = (text) => {
    setActive(!active)
    props.setActivePage(text)
  }

  const handleClick = () => {
    setActive(!active)
  }

  const handleLogoMouseEnter = (e) => {
    e.target.classList.add(classes.hover)
  }

  const handleLogoMouseLeave = (e) => {
    e.target.classList.remove(classes.hover)
  }

  const renderNavBar = () => {
    if (props.loggedIn) {
      return (
        <>
        <Typography
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
          onClick={()=>{props.setActivePage('Inspirations')}}
          variant="h4"
          className={classes.leftMenuButtons}>
          Clarity
        </Typography>
        <IconButton
          edge="start"
          className={classes.leftMenuButtons}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}>
          <MenuIcon />
        </IconButton>

        <span className={classes.rightMenuButtons}>
        <IconButton
          edge="start"
          className={classes.leftMenuButtons}
          color="inherit"
          aria-label="home"
          onClick={()=>{props.setActivePage('Inspirations')}}>
          <HomeRoundedIcon />
          Home
          </IconButton>
          <IconButton
            edge="start"
            className={classes.leftMenuButtons}
            color="inherit"
            aria-label="logOut"
            onClick={props.logOut}>
            <ExitToAppRoundedIcon />
            Logout
          </IconButton>
          </span>
        </>
      )
    } else {
      return (
        <Typography
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
          variant="h4"
          className={classes.leftMenuButtons}>
          Clarity
        </Typography>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {renderNavBar()}
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </div>
  )

}
