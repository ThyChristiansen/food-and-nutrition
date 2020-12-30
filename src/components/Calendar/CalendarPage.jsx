import React from "react";
import * as dateFns from "date-fns";
import "./Calendar.css";
import { connect } from "react-redux";
import CalendarDetail from "../utils/CalendarDetail";

import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  Slide,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MealPlanDetailDialog from "./MealPlanDetailDialog";
import AddMealPlanDialog from "./AddMealPlanDialog";
import { withRouter } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = (theme) => ({
  
  spacing: {
    margin: theme.spacing(1),
  },
  mealTypeOnCalendar: {
    marginTop: "25px",
  },
  mealType: {
    background: "lightgray",
    borderRadius: "5px",
    margin: "2px 5px 5px 5px",
    // padding:"3px",
    fontSize: "0.5em",
  },
  addMealDialog: {
    padding: "100px",
    color: "red",
  },
});

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    openAddMealPlan: false,
    mealTitle: "",
    mealType: "",
    mealDescription: "",
    openMealPlanDetail: false,
    isEdit: false,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_ALL_MEAL_PLAN",
    });
  }
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
      openAddMealPlan: false,
      isEdit: false,
    });
  };

  handleDialogMealPlanClose = () => {
    this.setState({
      openMealPlanDetail: false,
    });
  };

  addMealButton = () => {
    this.setState({
      openAddMealPlan: true,
    });
  };

  fetchMealPlan = (day) => {
    let dateFormat = "eee MMM d y xx";
    let date = dateFns.format(dateFns.toDate(day), dateFormat);
    this.props.dispatch({
      type: "FETCH_MEAL_PLAN",
      payload: {
        date: date,
      },
    });
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
      openMealPlanDetail: true,
    });
    setTimeout(() => {
      this.fetchMealPlan(day);
    }, 700);
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
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <div className={this.props.classes.mealTypeOnCalendar}>
              {this.props.reduxState.getAllMealPlan.map(
                (item) =>
                  new Date(item.date).getTime() === new Date(day).getTime() && (
                    <div className={this.props.classes.mealType} key={item.id}>
                      <FiberManualRecordIcon color="primary" fontSize="small" />
                      {item.meal_type}
                    </div>
                  )
              )}
            </div>
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
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  searchingMeal = () => {
    this.props.history.push(`/find-recipes`);
  };

  handleMealTitleChange = (event) => {
    this.setState({
      mealTitle: event.target.value,
    });
    //console.log(this.state.mealTitle);
  };

  handleMealTypeChange = (event) => {
    this.setState({
      mealType: event.target.value,
    });
  };

  handleMealDescriptionChange = (event) => {
    this.setState({
      mealDescription: event.target.value,
    });
  };

  addMeal = () => {
    let dateFormat = "eee MMM d y xx";
    let date = dateFns.format(
      dateFns.toDate(this.state.selectedDate),
      dateFormat
    );
    this.props.dispatch({
      type: "ADD_MEAL_PLAN",
      payload: {
        mealTitle: this.state.mealTitle,
        mealType: this.state.mealType,
        mealDescription: this.state.mealDescription,
        date: date,
      },
    });
    this.setState({
      openAddMealPlan: false,
      mealType: "",
    });
  };

  render() {
    const { classes, reduxState } = this.props;
    const inputFieldTitle = (defaulValue) => (
      <TextField
        id="standard-basic"
        label="Meal Title"
        fullwidth
        onChange={this.handleMealTitleChange}
        defaultValue={defaulValue}
      />
    );
    const inputFieldDescription = (defaulValue) => (
      <TextField
        id="standard-basic"
        label="Meal Detail"
        fullwidth
        multiline
        rows={6}
        defaultValue={defaulValue}
        onChange={this.handleMealDescriptionChange}
      />
    );

    let showOptionBreakfast = (
      <FormControlLabel
        value="breakfast"
        control={<Radio />}
        label="Breakfast"
      />
    );
    let showOptionLunch = (
      <FormControlLabel value="lunch" control={<Radio />} label="Lunch" />
    );
    let showOptionDinner = (
      <FormControlLabel value="dinner" control={<Radio />} label="Dinner" />
    );

    this.props.reduxState.getMealPlan.map((value) => {
      if (value.meal_type === "breakfast") {
        return (showOptionBreakfast = (
          <div>
            <FormControlLabel
              value="breakfast"
              disabled
              control={<Radio />}
              label="Breakfast"
            />
          </div>
        ));
      } else if (value.meal_type === "lunch") {
        return (showOptionLunch = (
          <div>
            <FormControlLabel
              value="lunch"
              disabled
              control={<Radio />}
              label="Lunch"
            />
          </div>
        ));
      } else if (value.meal_type === "dinner") {
        return (showOptionDinner = (
          <div>
            <FormControlLabel
              value="dinner"
              disabled
              control={<Radio />}
              label="Dinner"
            />
          </div>
        ));
      }
      return [];
    });

    let addButtonToggle;
    if (this.props.reduxState.getMealPlan.length >= 3) {
      addButtonToggle = (
        <div className={classes.spacing}>
          <Typography>Great! You did planning for all day.</Typography>
        </div>
      );
    } else {
      addButtonToggle = (
        <Button
          onClick={this.addMealButton}
          color="primary"
          variant="contained"
          className={classes.spacing}
        >
          Add meal
        </Button>
      );
    }

    return (
      <Container maxWidth="lg">
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
          <AddMealPlanDialog
            openAddMealPlan={this.state.openAddMealPlan}
            handleClose={this.handleClose}
            searchingMeal={this.searchingMeal}
            inputFieldTitle={inputFieldTitle()}
            inputFieldDescription={inputFieldDescription()}
            addMeal={this.addMeal}
            mealType={this.state.mealType}
            showOptionBreakfast={showOptionBreakfast}
            showOptionLunch={showOptionLunch}
            showOptionDinner={showOptionDinner}
            handleMealTypeChange={this.handleMealTypeChange}
          />
          <MealPlanDetailDialog
            openMealPlanDetail={this.state.openMealPlanDetail}
            handleDialogMealPlanClose={this.handleDialogMealPlanClose}
            Transition={Transition}
            handleDialogMealPlanClose={this.handleDialogMealPlanClose}
            getMealPlan={reduxState.getMealPlan}
            selectedDate={this.state.selectedDate}
            addButtonToggle={addButtonToggle}
          />
        </div>
      </Container>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default withRouter(
  connect(putReduxStateToProps)(withStyles(useStyles)(Calendar))
);
