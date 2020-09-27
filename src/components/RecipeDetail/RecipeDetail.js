import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ingreadients from '../RecipeDetail/Ingreadients';
import toDate from 'date-fns/toDate'
import * as dateFns from "date-fns";
import { Link } from 'react-router-dom';



import { withStyles } from '@material-ui/core/styles';
import { CardHeader, CardMedia, CardContent, IconButton, Typography, Container, Popover, Chip, ListItem, ListItemIcon, ListItemText, Divider, List, Dialog, DialogTitle, DialogContent, DialogContentText, Button, FormControl, RadioGroup, FormControlLabel, Radio, DialogActions } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';


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
  padding: {
    padding: theme.spacing(2),
  }

});

let dateFormat = 'eee MMM d y xx'
let date = dateFns.format(toDate(new Date()), dateFormat)

class RecipeDetail extends Component {
  state = {
    anchorEl: '',
    openListIcons: false,
    tag: 'breakfast',
    checked: false,
    mealType: '',
    openAddToCalendarDialog: false,
    currentMonth: ""
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FEATCH_MEAL_PLAN',
      payload: {
        date: date,
      }
    });
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      openListIcons: true,
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      openListIcons: false,
    })
  };

  addToFavorite = () => {
    this.setState({
      openListIcons: false,
    })
    this.props.dispatch({
      type: 'ADD_FAVORITE_RECIPE',
      payload: {
        item: this.props.item,
      }
    });
  }

  addToCalendar = () => {
    this.setState({
      openAddToCalendarDialog: true,
    })

  }


  handleDialogClose = () => {
    this.setState({
      openAddToCalendarDialog: false,
    })
  }

  handleMealTypeChange = (event) => {
    this.setState({
      mealType: event.target.value,
    })
  }

  addThisRecipeToCalendar = () => {

    this.setState({
      openListIcons: false,
      openAddToCalendarDialog: false,
      mealType: ""
    })
    this.props.dispatch({
      type: 'ADD_RECIPE_TO_CALENDAR',
      payload: {
        item: this.props.item,
        mealType: this.state.mealType,
        date: date
      }
    });
    // console.log(this.props.item, this.state.mealType,date)
  }


  render() {

    const { classes, item, reduxState } = this.props;

    const id = this.state.openListIcons ? 'simple-popover' : undefined;

    let showOptionBreakfast = <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />;
    let showOptionLunch = <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />;
    let showOptionDinner = <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />;

    reduxState.getMealPlan.map((value) => {
      let mealType = value.meal_type;
      if (mealType === "breakfast") {
        showOptionBreakfast = <div><FormControlLabel value="breakfast" disabled control={<Radio />} label="Breakfast" /></div>
      }
      else if (mealType === "lunch") {
        showOptionLunch = <div><FormControlLabel value="lunch" disabled control={<Radio />} label="Lunch" /></div>
      }
      else if (mealType === "dinner") {
        showOptionDinner = <div><FormControlLabel value="dinner" disabled control={<Radio />} label="Dinner" /></div>
      }
    })

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
                open={this.state.openListIcons}
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
                  <ListItem button onClick={this.addToCalendar} >
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
            return (<div key={i.id}>
              <Ingreadients i={i} />
            </div>
            )
          })}
          <Divider />
          <Typography paragraph>Directions: </Typography>
          <ol>
            {item.analyzedInstructions[0].steps.map(step => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ol>
        </CardContent>

        <Dialog
          fullWidth="xs"
          maxWidth="xs"
          open={this.state.openAddToCalendarDialog}
          onClose={this.handleDialogClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Let's plan your meal</DialogTitle>

          <DialogActions>
            {reduxState.getMealPlan.length !== 3 ?
              (<>
                <DialogContent >
                  <FormControl component="fieldset" >
                    <RadioGroup aria-label="gender" name="gender1" value={this.state.mealType}
                      onChange={this.handleMealTypeChange}
                    >
                      {showOptionBreakfast}{showOptionLunch}{showOptionDinner}

                    </RadioGroup>
                  </FormControl>
                </DialogContent>
                <Button variant="contained" color="primary" onClick={this.addThisRecipeToCalendar}>Add</Button>
              </>)
              :
              <Typography className={classes.padding}>You did planning for all day. Check your <Link to="/calendar"> calendar</Link> </Typography>
            }
            <Button onClick={this.handleDialogClose} color="primary">
              Close
          </Button>
          </DialogActions>
        </Dialog >


      </Container>

    )
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetail));
