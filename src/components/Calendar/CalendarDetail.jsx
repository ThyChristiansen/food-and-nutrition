import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";


import { withStyles } from '@material-ui/core/styles';
import { Slide, TextField, Typography, DialogActions, Button, CardHeader, fade, CardMedia, CardActionArea } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = (theme) => ({

  mealType: {
    backgroundColor: 'lightgray',
    marginTop: theme.spacing(0),
    borderRadius: "5px",
    paddingTop: 1,
    paddingBottom: 1,
  },
  mealTitle: {
    textDecoration: "underline",
    marginLeft: theme.spacing(2),
  },
  mealDesc: {
    marginLeft: theme.spacing(2),

  },
  padding: {
    padding: "0px 0px 0px 0px",
    paddingTop: '0px'
  },

  cardPaper: {
    borderRadius: "5px",
    border: "1px solid darkgray",
    margin: "10px",
  },
  media: {
    height: 180,
    size: 80,
  },
})

class CalendarDetail extends Component {

  state = {
    mealTitle: this.props.meal.meal_title,
    mealType: this.props.meal.meal_type,
    mealDescription: this.props.meal.meal_description,
    recipeId: this.props.meal.recipe_id,
    selectedDate: new Date(),
    openMealPlanDetail: this.props.openMealPlanDetail,
    isEdit: false
  }

  handleMealTitleChange = (event) => {
    this.setState({
      mealTitle: event.target.value
    });
    console.log(this.state.mealTitle)
  }
  handleMealTypeChange = (event) => {
    this.setState({
      mealType: event.target.value,
    })
  }
  handleMealDescriptionChange = (event) => {
    this.setState({
      mealDescription: event.target.value
    })
  }
  handleDialogMealPlanClose = () => {
    this.setState({
      openMealPlanDetail: false
    })
    // console.log(this.state.openMealPlanDetail)
  }

  handleEdit = () => {
    this.setState({
      isEdit: true
    });
  }

  handleSaveChanges = () => {
    this.setState({
      isEdit: false
    });
    this.props.dispatch({
      type: 'EDIT_MEAL_PLAN',
      payload: {
        mealTitle: this.state.mealTitle,
        mealDescription: this.state.mealDescription,
        id: this.props.meal.id,
        date: this.props.meal.date
      }
    });
    // console.log(this.props.meal.id,)
  }
  handleGetRecipeInfo = () => {
    this.props.history.push(`/recipe/${this.state.recipeId}/${this.state.mealTitle}`)
  }

  render() {
    const { classes, meal } = this.props;


    const inputFieldTitle = (defaulValue) => <TextField id="standard-basic"
      label="Meal Title"
      fullWidth
      onChange={this.handleMealTitleChange}
      defaultValue={defaulValue}
    />
    const inputFieldDescription = (defaulValue) => <TextField id="standard-basic"
      label="Meal Detail"
      fullWidth
      multiline
      rows={6}
      defaultValue={defaulValue}
      onChange={this.handleMealDescriptionChange}
    />


    let isShow;
    let isImage =meal.meal_description.slice(0, 4)
    // console.log(isImage)
    if (isImage === "http") {
      isShow = <CardActionArea >
        <Typography className={classes.mealTitle} color="primary">{meal.meal_title}</Typography>
        <CardMedia
          className={classes.media}
          image={meal.meal_description}
          title="Recipe"
        onClick={this.handleGetRecipeInfo}
        />
      </CardActionArea >
    } else {
      isShow = <div>
        <Typography className={classes.mealTitle} color="primary">{meal.meal_title}</Typography>
        <Typography className={classes.mealDesc}>{meal.meal_description}</Typography>
      </div>

    }

    return (
      <div >
        <div className={classes.cardPaper}>
          {this.state.isEdit === true ? (
            <div className={classes.padding}>
              <CardHeader
                title={this.state.mealType}
                className={classes.mealType}
              />
              {inputFieldTitle(meal.meal_title)}
              {inputFieldDescription(meal.meal_description)}
            </div>
          ) : (
              <div>
                <CardHeader
                  title={this.state.mealType}
                  className={classes.mealType}
                />
                {isShow}
              </div>
            )
          }
          <DialogActions>
            {!this.state.isEdit === true ?
              <div className={classes.editButton}>
                <Button onClick={this.handleEdit} color="primary" className={classes.padding}>
                  Edit
              </Button>
              </div>
              :
              <div><Button onClick={this.handleSaveChanges} color="primary" className={classes.padding}>
                Save
          </Button></div>
            }
          </DialogActions>
        </div>

      </div >

    )
  }
};

export default withRouter(connect()(withStyles(useStyles)(CalendarDetail)));
