import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import '../Recipes/Recipes.css'
import { Card, Container, Grid, Typography } from '@material-ui/core';
import RecipeSummary from '../Recipes/RecipeSummary';



const useStyles = (theme) => ({
  root: {
    marginTop: '25vh',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

  },
  card: {
    height: "100%",
    width: "100%",
    minWidth: "50%",
  },
  center: {
    textAlign: "center",

  },
  float:{
    float: "left",
    margin: theme.spacing(1),
  },
  section:{
    border: "1px solid gray",
  }
})



class FavoriteList extends Component {


  componentDidMount() {
    this.props.dispatch({
      type: 'FEATCH_FAVORITE_RECIPE',
    });
  }


  render() {
    const { classes, reduxState } = this.props;
    return (
      <Container className={classes.root} maxWidth="md" >
        <Typography variant="h3" className={classes.center}>Your Favorite Recipe List </Typography>
        {reduxState.getFavoriteRecipe.length === 0 && (
            <Typography className={classes.center}>You haven't any favorite recipes</Typography>
          )}
        <Grid container spacing={1}>
        <Grid item xs={6} className={classes.section}>
        <Typography variant="h5" className={classes.center}>Not Try yet</Typography>

          {reduxState.getFavoriteRecipe.map((item) => {
            return (
              <Grid item xs={5} className={classes.float}>
                <Card className={classes.card}>
                  <RecipeSummary item={item} />
                </Card>
               </Grid>
            )
          })}
</Grid>
          <Grid item xs={6} className={classes.section}>
          <Typography variant="h5" className={classes.center}>Tried</Typography>


        </Grid>
       
        </Grid>
      </Container >

    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(FavoriteList));
