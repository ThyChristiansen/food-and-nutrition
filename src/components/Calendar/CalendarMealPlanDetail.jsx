import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class CalendarMealPlanDetail extends Component {
  state = {
    id: "",

  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    // dispatch({
    //   type: 'FEATCH_MEAL_PLAN',
    //   payload: {
    //     id: match.params.id,
    //   }
    // });
    // console.log(match.params.id)
  }

  breakfastClick = () => {
    // this.props.history.push(`/meal-detail/${}`)

  }



  render() {
    const { classes } = this.props;
    return (
      <div>

        <div className="meals_icon">
          <p>dfg{this.props.day}</p>
          <FiberManualRecordIcon onClick={this.breakfastClick} />
          <FiberManualRecordIcon />
          <FiberManualRecordIcon />
        </div>


      </div>
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(CalendarMealPlanDetail);
