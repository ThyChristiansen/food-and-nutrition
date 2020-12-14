import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Grid,Paper} from '@material-ui/core';



const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
})

class Posts extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={6}>
      <Paper className={classes.paper}>xs Post</Paper>
    </Grid>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(Posts));
