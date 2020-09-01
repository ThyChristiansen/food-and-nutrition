import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOut/LogOut';
import './Nav.css';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { SwipeableDrawer, Button, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";


const useStyles = (theme) => ({
  list: {
    width: 550,
  },
  fullList: {
    width: 'auto',
  },
});



const Nav = (props) => {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['My Calendar', 'Recipes', 'Favorite Recipes', 'Keep Track Paymeny'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Log out'].map((text) => (
          <ListItem button key={text}>
            <ListItemText onClick={() => props.dispatch({ type: 'LOGOUT' })} primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="nav">
      {props.user.id && (
        <>
          {
            ['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}><RestaurantMenuIcon /></Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))
          }
        </>
      )}

      <Link to="/home">
        <h2 className="nav-title">
        <img
            className="logo"
            src="images/logo1.gif"
            alt="profile"
            height="130"
            width="130"
          />
          

        </h2>
      </Link>

          <div className="nav-right">
            {!props.user.id &&
              <Link className="nav-link" to="/login">
                Login / Register
         </Link>
            }

            {props.user.id && (
              <>
                {/* <Link className="nav-link" to="/home">
              Home
          </Link>
            <Link className="nav-link" to="/info">
              Info Page
          </Link> */}
                <div className="right_links">
                  <span className="profile">Hi, <span className="user_name">{props.user.username}</span></span>
                  <FavoriteIcon className="profile" />
                </div>

              </>
            )}
            {/* <Link className="nav-link" to="/about">
          About
      </Link> */}
          </div>
    </div>
  )
};


const mapStateToProps = state => ({
          user: state.user,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Nav));
