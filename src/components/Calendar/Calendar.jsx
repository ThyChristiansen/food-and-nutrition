import React from "react";
import * as dateFns from "date-fns";
import './Calendar.css'
import { connect } from 'react-redux';
import CalendarDetail from './CalendarDetail';

import { Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Slide, TextField, Typography, withStyles } from "@material-ui/core";
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(1),
  },

  closeButton: {
    position: "absolute",
    top: "0.75em",
    right: "0.75em",
  }

})


class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    open: false,
    mealTitle: '',
    mealType: '',
    mealDescription: '',
    selectedDate: new Date(),
    openMealPlanDetail: false,
    isEdit: false,
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "eeee";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  handleClose = () => {
    this.setState({
      open: false,
      isEdit: false,
    })
  }

  handleDialogMealPlanClose = () => {
    this.setState({
      openMealPlanDetail: false
    })
  }

  addMealButton = () => {
    this.setState({
      open: true
    })
  }

  featchMealPlan = (day) => {
    let dateFormat = 'eee MMM d y xx'
    let date = dateFns.format(dateFns.toDate(day), dateFormat)
    this.props.dispatch({
      type: 'FEATCH_MEAL_PLAN',
      payload: {
        date: date,
      }
    });
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
      openMealPlanDetail: true
    });
    setTimeout(() => {
      this.featchMealPlan(day);
    }, 700)
  };

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!dateFns.isSameMonth(day, monthStart)
              ? "disabled"
              : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  searchingMeal = () => {
    this.props.history.push(`/find-recipes`)
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

  addMeal = () => {
    let dateFormat = 'eee MMM d y xx'
    let date = dateFns.format(dateFns.toDate(this.state.selectedDate), dateFormat)
    this.props.dispatch({
      type: 'ADD_MEAL_PLAN',
      payload: {
        mealTitle: this.state.mealTitle,
        mealType: this.state.mealType,
        mealDescription: this.state.mealDescription,
        date: date,
      }
    });
    this.setState({
      open: false,
      mealType: ""
    })
    console.log('----------->', date)
  }



  render() {

    const { classes, reduxState } = this.props;
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

    let showOptionBreakfast = <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />;
    let showOptionLunch = <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />;
    let showOptionDinner = <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />;

    this.props.reduxState.getMealPlan.map((value) => {
      let mealType = value.meal_type;
      if (mealType === "breakfast") {
        // console.log(1);
        showOptionBreakfast = <div><FormControlLabel value="breakfast" disabled control={<Radio />} label="Breakfast" /></div>
      }
      else if (mealType === "lunch") {
        // console.log(2);
        showOptionLunch = <div><FormControlLabel value="lunch" disabled control={<Radio />} label="Lunch" /></div>
      }
      else if (mealType === "dinner") {
        // console.log(3);
        showOptionDinner = <div><FormControlLabel value="dinner" disabled control={<Radio />} label="Dinner" /></div>
      }
    })

    let addButtonToggle;
    if (this.props.reduxState.getMealPlan.length >= 3) {
      addButtonToggle = <div className={classes.root}>
        <Typography>Great! You did planning for all day.</Typography>
      </div >
    } else {
      addButtonToggle = <Button onClick={this.addMealButton} color="primary" variant="contained" className={classes.root}>
        Add meal
    </Button>
    }




    return (
      <Container maxWidth="md" >
        <div className="calendar" >
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
          <Dialog
            fullWidth="xs"
            maxWidth="xs"
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Let's plan your meal</DialogTitle>
            <DialogContent>
              <Button color="primary" variant="outlined" fullWidth onClick={this.searchingMeal}>Searching meal</Button>
              <DialogContentText>
                You can search more idea about meals and recipes by click on button above.
          </DialogContentText>

              {inputFieldTitle()}

              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={this.state.mealType}
                  onChange={this.handleMealTypeChange}
                >
                  {showOptionBreakfast}{showOptionLunch}{showOptionDinner}

                </RadioGroup>
              </FormControl>

              {inputFieldDescription()}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={this.addMeal}>Add</Button>
              <Button onClick={this.handleClose} color="primary">
                Close
          </Button>
            </DialogActions>
          </Dialog >

          <Dialog
            fullWidth="xs"
            maxWidth="xs"
            TransitionComponent={Transition}
            open={this.state.openMealPlanDetail}
            onClose={this.handleDialogMealPlanClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Detail</DialogTitle>
            <Button onClick={this.handleDialogMealPlanClose} color="primary" className={classes.closeButton} size="small">
              Close
            </Button>
            {addButtonToggle}

            {reduxState.getMealPlan.map((meal) => {
              return (
                <div key={meal.id}>
                  <CalendarDetail openMealPlanDetail={this.state.openMealPlanDetail}
                    meal={meal}
                    selectedDate={this.state.selectedDate}
                  />
                </div>

              )
            }
            )}
          </Dialog>
        </div >
      </Container>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(Calendar));
