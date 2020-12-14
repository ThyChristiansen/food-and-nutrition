import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import RecipeSummary from "../Recipes/RecipeSummary";

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
});

class FavoriteSection extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_FAVORITE_RECIPE",
    });

   
  }
  render() {
    const { classes,reduxState } = this.props;
    return (
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <h5>Favorite Receipes</h5>
          {reduxState.getFavoriteRecipe.map((item) => 
            <RecipeSummary item={item}  />
          )}
        </Paper>
      </Grid>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(FavoriteSection)
);
