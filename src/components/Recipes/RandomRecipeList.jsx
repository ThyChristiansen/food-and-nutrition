import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@mui/styles';
import '../Recipes/Recipes.css'
import { Card, Grid } from '@mui/material';
import RecipeSummary from '../Recipes/RecipeSummary';


const useStyles = (theme) => ({
  root: {
    // marginTop: '30vh',
    // display: 'flex',
    // textAlign: "center",
  },
  card: {
    height: "100%",
    wight: "100%",
  },
})

class FindRecipes extends Component {

  componentDidMount() {
    const { match } = this.props;
    this.setState({
      tag: match.params.type_meal
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RANDOM_RECIPES',
        payload: { meal: match.params.type_meal }
      });
    }, 500);
  }

  render() {
    const { classes, reduxState } = this.props;
    return (
      <div className="content-page">
        <Grid container spacing={2}>
          {reduxState.getRandomRecipeReducer.map((item) => {
            return (
              <>
                <Grid item xs={3} >
                  <Card className={classes.card}>
                    <RecipeSummary item={item} />
                  </Card>
                </Grid>
              </>
            )
          })}
        </Grid>
      </div >
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(FindRecipes));
