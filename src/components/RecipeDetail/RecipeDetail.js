import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ingreadients from '../RecipeDetail/Ingreadients';



import { withStyles } from '@material-ui/core/styles';
import { CardHeader, CardMedia, CardContent, IconButton, Typography, Container, Popover, Chip, ListItem, ListItemIcon, ListItemText, Divider, List } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteList from '../FavoriteList/FavoriteList';


const useStyles = (theme) => ({
  root: {
    maxWidth: '100%',

  },
  media: {
    paddingTop: '56.25%',
    size: 80,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },

});

class RecipeDetail extends Component {
  state = {
    anchorEl: '',
    open: false,
    tag: 'breakfast',
    checked: false
  }
  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    })
    console.log('clicked')
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
  };

  addToFavorite = () => {
    // return (
    //   <FavoriteList
    //     item={this.props.item}
    //   />
    // )
    this.props.dispatch({
      type: 'ADD_FAVORITE_RECIPE',
      payload: {
        item: this.props.item,
      }
    });
    console.log( "clicked")
  }


  render() {

    const { classes, item } = this.props;

    const id = this.state.open ? 'simple-popover' : undefined;
    return (
      <Container>

        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon aria-describedby={id}
                onClick={this.handleOpen}
              />
              <Popover
                id={id}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button onClick={this.addToFavorite}>
                    <ListItemIcon>
                      <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add to favorite" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add to calender" />
                  </ListItem>
                </List>
                <Divider />
              </Popover>
            </IconButton>
          }
          title={item.title}
          subheader={"Cooking: " + item.readyInMinutes + " mins" + "  ,   " +
            "Serving: " + item.servings
          }
        />
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.title}
        />
        <CardContent>
          {/* <Typography variant="body2" color="textSecondary" component="p">
                </Typography> */}
        </CardContent>

        <CardContent>
          <Typography paragraph>Ingreadients: </Typography>
          {item.extendedIngredients.map((i) => {
            return (<div key={i}>
              <Ingreadients i={i} />
            </div>
            )
          })}
          <Divider />
          <Typography paragraph>Directions: </Typography>
          <ol>
            {item.analyzedInstructions[0].steps.map(step => (
              <li key={step}>{step.step}</li>
            ))}
          </ol>
        </CardContent>
      </Container>

    )
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetail));
