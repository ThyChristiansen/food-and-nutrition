import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
// import './Recipes.css'
import { Card, Container, Grid, Typography, CardContent, Chip } from '@material-ui/core';

import RecipeDetail from './RecipeDetail';


const useStyles = (theme) => ({
  root: {
    marginTop: '50px',
   
  },
})

class RecipeDetailPage extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;

    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPE_INFO',
        payload: {
          id: match.params.id,
        }
      });
    }, 500);
  }


  handleGetRecipeByChips = (item) => { 
    console.log(this.props.history.push(`/recipes/type-meal/${item}`))
  }


  render() {
    const { classes, reduxState } = this.props;
    return (
      <div className="content-page">
        <Container maxWidth="md" className={classes.root}  >
          <Grid container spacing={2}>
            <Grid item xs={12}>

              {reduxState.getRecipeSummrizeReducer.map((item) => {
                return (<div key={item}>
                  <Card className={classes.root} >
                    <RecipeDetail item={item} key={item}/>
                    <CardContent>
                      {item.dishTypes.map((chip) => {
                        return <Chip className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} key={chip}/>
                      })}
                    </CardContent>
                  </Card>
                </div>)
              })}

            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetailPage));
