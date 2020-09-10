import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
// import './Recipes.css'
import { Card, Container, Grid, Typography, CardContent, Chip } from '@material-ui/core';

import RecipeDetail from '../RecipeDetail/RecipeDetail';


const useStyles = (theme) => ({
  root: {
    // marginTop: '30vh',
    // display: 'flex',
    // textAlign: "center",
  },
})

class RecipeDetailPage extends Component {
  state = {
    tag: '',
    myRecipes: false,
    input: 'egg',
    id: '',
    diet: 'none',
    calories: [150, 1500],
    fat: [5, 100],
    protein: [5, 100],
    intolerances: ["none"],
    expan: true
  }

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
    this.setState({
      tag: item
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RANDOM_RECIPE',
        payload: { meal: this.state.tag }
      });
      // console.log('------->', item)
    }, 100);
    console.log(this.props.history.push(`/find-recipes`))

  }


  render() {
    const { classes, reduxState } = this.props;
    return (
      <div className="content-page">
        <Container maxWidth="md" className={classes.root}  >
          <Grid container spacing={2}>
            <Grid item xs={12}>

              {reduxState.getRecipeSummrizeReducer.map((item) => {
                return (<>
                  <Card className={classes.root}>
                    <RecipeDetail item={item} />
                    <CardContent>
                      {item.dishTypes.map((chip) => {
                        return <Chip className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} />
                      })}
                    </CardContent>
                  </Card>
                </>)
              })}
              {/* <RecipeDetail recipe={reduxState.getRandomRecipeReducer} /> */}


            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetailPage));
