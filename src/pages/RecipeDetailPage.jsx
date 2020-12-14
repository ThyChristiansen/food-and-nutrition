import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipeReducer } from "../recipeToTest";

import { withStyles } from '@material-ui/core/styles';
import { Card, Container, Grid, CardContent, Chip, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';

import RecipeDetail from '../components/Recipes/RecipeDetail';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = (theme) => ({
 
  similarRecipeList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
})

class RecipeDetailPage extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'FETCH_RECIPE_INFO',
        payload: {
          id: match.params.id,
        }
      });
    }, 500);
    //Delete this after test
    dispatch({
      type: 'FETCH_FAVORITE_RECIPE',
    });
    //Delete this after test

    dispatch({
      type: 'FETCH_SIMILAR_RECIPE',
      payload: {
        id: match.params.id,
      }
    });
  }

  handleGetRecipeByChips = (item) => {
    console.log(this.props.history.push(`/recipes/type-meal/${item}`))
  }


  render() {
    const { classes, reduxState } = this.props;

    
    return (
      <div className="content-page">
        <Container maxWidth="md"   >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Uncomment after test */}
              {/* {reduxState.getRecipeSummrizeReducer.map((item) => {
                return (<div key={item}>
                  <Card className={classes.root} >
                    <RecipeDetail item={item} key={item} />
                    <CardContent>
                      {item.dishTypes.map((chip) => {
                        return <Chip className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} key={chip} />
                      })}
                    </CardContent>
                  </Card>
                </div>)
              })} */}
              {/* Uncomment after test */}


              {/* Delete after test */}
              {getRecipeReducer.map((item) => {
                return (<>
                  <Card className={classes.root}>
                    <RecipeDetail item={item} />
                    <CardContent>
                      {item.dishTypes.map((chip) => {
                        return <Chip key ={chip}className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} />
                      })}
                    </CardContent>
                  </Card>
                </>)
              })}
              {/* Delete after test */}


            </Grid>
          </Grid>
          <div className={classes.similarRecipeList}>
            <GridList className={classes.gridList} cols={2.5}>
              {/* Uncomment after test */}
              {/* {reduxState.getSimilarRecipeReducer.map((item) => ( */}
              {/* Uncomment after test */}


              {/* //Delete this after test */}
              {reduxState.getFavoriteRecipe.map((item) => (
                //Delete this after test

                <GridListTile key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <GridListTileBar
                    title={item.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}

                    actionIcon={
                      <IconButton aria-label={`star ${item.title}`}>
                        <FavoriteBorderIcon className={classes.title} />
                      </IconButton>
                    }
                  />
                </GridListTile>

              ))}
            </GridList>
          </div>
        </Container>
      </div>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetailPage));
