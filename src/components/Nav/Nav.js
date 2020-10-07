import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { SwipeableDrawer, Button, List, Divider, ListItem, ListItemText, Badge, ButtonGroup, FormControlLabel, Switch, IconButton } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";


const useStyles = (theme) => ({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    backgroundColor: "#f7f7f7",
    borderBottom: "2px solid #195C60",
    position: "fixed",
    marginTop: "0px",
    width: "100%",
    height: "70px",
    top: "0px",
    // zIndex: theme.zIndex.drawer + 1,
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Nav = (props) => {

  const { classes } = props;
  const [state, setState] = React.useState({
    left: false,
  });

  const [count, setCount] = React.useState(localStorage.getItem("notification"));
  const [invisible, setInvisible] = React.useState(false);


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
        {[<Link to="/home">
          <img
            src="images/logoName.png"
            alt="profile"
            width="310"
          />
        </Link>,
        <Link className="nav-link-drawer" to="/calendar">
          My Calendar
        </Link>,
        <Link className="nav-link-drawer" to="/recipes">
          Recipes
        </Link>,
        <Link className="nav-link-drawer" to="/favorite-recipes">
          Favorite Recipes
       </Link>,
        <Link className="nav-link-drawer" to="/payment-keep-track">
          PaymentKeepTrack
        </Link>].map((text) => (
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


  const handleEmptyCount = () => {
    window.localStorage.setItem('notification', 0);
    setTimeout(() => {
      window.location.reload();
    }, 50)
  }

  // if (localStorage.getItem("notification") > 0) {
  //   console.log("yes")
  //   setInvisible(false)
  // } else {
  //   console.log("no")
  //   setInvisible(true)
  // }



  return (
    <HideOnScroll {...props}>

      <div className={classes.root}>
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
            <Link className="nav-link" to="/sign-in">
              Sign in
         </Link>
          }

          {props.user.id && (
            <>
              <div className="nav-right">
                {props.user.name ?
                  (<span className="profile">Hi, <span className="user_name">{props.user.name}</span></span>)
                  :
                  (<span className="profile">Hi, <span className="user_name">{props.user.email}</span></span>
                  )
                }
              </div>

              <Link to="/favorite-recipes" >
                <div style={{
                  "float": "left",
                  "textAlign": "center",
                  "padding": "13px 0px"
                }}>
                  <IconButton aria-label="favorite" color="secondary">
                    <Badge color="primary" badgeContent={localStorage.getItem("notification")} invisible={invisible}>
                      <FavoriteIcon onClick={handleEmptyCount} />
                    </Badge>
                  </IconButton>

                </div>
              </Link>
            </>
          )}
          {/* <Link className="nav-link" to="/about">
          About
      </Link> */}
        </div>
      </div>
    </HideOnScroll>
  )
};


const mapStateToProps = state => ({
  user: state.user,
  setNotification: state.setNotification,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Nav));
