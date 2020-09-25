import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Card, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, TextField, Typography, DialogActions, Button } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = (theme) => ({
  // root: {
  //   marginTop: '30vh',
  //   display: 'flex',
  //   textAlign: "center",
  // },
})

class CalendarDetail extends Component {

  state = {
    mealTitle: this.props.meal.meal_title,
    mealType: this.props.meal.meal_type,
    mealDescription: this.props.meal.meal_description,
    selectedDate: new Date(),
    openMealPlanDetail: this.props.openMealPlanDetail,
    isEdit:false
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
    console.log(this.state.openMealPlanDetail)
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
        date:this.props.meal.date
      }
    });
    console.log(this.props.meal.id,)
  }

  render() {
    const { classes } = this.props;
    

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


   
    return (
      <div>
          <DialogContent>
            <DialogContentText>
              {this.state.isEdit === true ? (
                <div>
                  <Typography variant="h6" color="secondary" className={this.props.classes.mealType}>{this.state.mealType}</Typography>
                  {inputFieldTitle(this.state.mealTitle)}
                  {inputFieldDescription(this.state.mealDescription)}
                  <Divider className={classes.root} />
                </div>
              ) : (
                  <div>
                    <Typography variant="h6" color="secondary" className={this.props.classes.mealType}>{this.state.mealType}</Typography>
                    <Typography className={classes.mealTitle} color="primary">{this.state.mealTitle}</Typography>
                    <Typography className={classes.mealDesc}>{this.state.mealDescription}</Typography>
                    <Divider className={classes.root} />

                  </div>
                )
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            {!this.state.isEdit === true ?
              <div>
                <Button onClick={this.handleEdit} color="primary" className={classes.root}>
                  Edit
              </Button>
              </div>
              :
              <div><Button onClick={this.handleSaveChanges} color="primary" className={classes.root}>
                Save
          </Button></div>
            }
          </DialogActions>

      </div >

    )
  }
};


export default connect()(withStyles(useStyles)(CalendarDetail));
