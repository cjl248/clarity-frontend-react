import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';

import VideoLabelTwoToneIcon from '@material-ui/icons/VideoLabelTwoTone';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: .05,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  channel: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  channelInputRoot: {
    color: 'inherit',
  },
  channelInputInput: {
    color: 'white',
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 150,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }
}));


// ============================================================= //
// ============================================================= //
// ====> COMPONENT COMPONENT COMPONENT COMPONENT COMPONENT <==== //
// ============================================================= //
// ============================================================= //

export default function VideoSearchBar(props) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [channel, setChannel] = React.useState('');
  const [keywords, setKeywords] = React.useState('');

  const isMenuOpen = Boolean(anchorEl);

  const handleChannelMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleKeywordChange = (event) => {
    setKeywords(event.target.value)
  }

  const setActiveChannel = (event) => {
    const channel = event.currentTarget.id
    setChannel(channel)
    setAnchorEl(null);
  }

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem id ={'Great Meditation'} onClick={setActiveChannel}>Great Meditation</MenuItem>
      <MenuItem id ={'The Honest Guys'} onClick={setActiveChannel}>The Honest Guys</MenuItem>
      <MenuItem id ={'Stephen Procter'} onClick={setActiveChannel}>Stephen Procter</MenuItem>
      <MenuItem id ={'Michael Sealey'} onClick={setActiveChannel}>Michael Sealey</MenuItem>
    </Menu>
  )

  // ============================================================== //
  // ============================================================== //
  // =====> RETURN RETURN RETURN RETURN RETURN RETURN RETURN <===== //
  // ============================================================== //
  // ============================================================== //


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {"Keyword: "}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="type your keywords…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={keywords}
              onChange={handleKeywordChange}
            />
          </div>

          <div className={classes.grow} />

          <Typography className={classes.title} variant="h6" noWrap>
            {"Channel: "}
          </Typography>

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleChannelMenuOpen}
              color="inherit"
            >
              <VideoLabelTwoToneIcon />
            </IconButton>
          </div>

          <div className={classes.channel}>
            <InputBase
              disabled
              placeholder="choose a channel..."
              value={channel}
              classes={{
                root: classes.channelInputRoot,
                input: classes.channelInputInput,
              }}
              inputProps={{ 'aria-label': 'channel' }}
            />
          </div>

          <Button
          variant="contained"
          color="primary"
          style={ {margin: '1vh 1vh 1vh 3vh'} }
          onClick={ () => {props.handleSearch(keywords, props.channelList[channel]) } }>
          Search
          </Button>

        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )

}
