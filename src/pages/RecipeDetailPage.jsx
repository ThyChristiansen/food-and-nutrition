import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
// import './Recipes.css'
import { Card, Container, Grid, Typography, CardContent, Chip, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';

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
      this.props.dispatch({
        type: 'FETCH_RECIPE_INFO',
        payload: {
          id: match.params.id,
        }
      });
    }, 500);
    //Delete this after test
    this.props.dispatch({
      type: 'FETCH_FAVORITE_RECIPE',
    });
    //Delete this after test

    this.props.dispatch({
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

    let getRandomRecipeReducer = [{
      "vegetarian": false,
      "vegan": false,
      "glutenFree": false,
      "dairyFree": true,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "weightWatcherSmartPoints": 9,
      "gaps": "no",
      "lowFodmap": false,
      "aggregateLikes": 3,
      "spoonacularScore": 74,
      "healthScore": 29,
      "pricePerServing": 560.51,
      "extendedIngredients": [
        {
          "id": 15001,
          "aisle": "Seafood",
          "image": "fresh-anchovies.jpg",
          "consistency": "solid",
          "name": "anchovies",
          "original": "1lb of anchovies cleaned, spine removed",
          "originalString": "1lb of anchovies cleaned, spine removed",
          "originalName": "anchovies cleaned, spine removed",
          "amount": 1,
          "unit": "lb",

        },
        {
          "id": 18371,
          "aisle": "Baking",
          "image": "white-powder.jpg",
          "consistency": "solid",
          "name": "baking powder",
          "original": "1 teaspoon of baking powder",
          "originalString": "1 teaspoon of baking powder",
          "originalName": "baking powder",
          "amount": 1,
          "unit": "teaspoon",
        },
        {
          "id": 1123,
          "aisle": "Milk, Eggs, Other Dairy",
          "image": "egg.png",
          "consistency": "solid",
          "name": "egg",
          "original": "1 egg",
          "originalString": "1 egg",
          "originalName": "egg",
          "amount": 1,
          "unit": "",
        },
        {
          "id": 20081,
          "aisle": "Baking",
          "consistency": "solid",
          "name": "flour",
          "original": "1 cup of flour",
          "originalString": "1 cup of flour",
          "originalName": "flour",
          "amount": 1,
          "unit": "cup",

        },
        {
          "originalString": "sage leaves (optional - if you are not a fan of sage just omit)"
        },
        {
          "originalString": "1 teaspoon of salt",
        },
        {
          "originalString": "seltzer water",
        },
        {
          "originalString": "vegetable oil for frying",
        }
      ],
      "id": 1,
      "title": "Fried Anchovies with Sage",
      "readyInMinutes": 45,
      "servings": 3,
      "image": "https://spoonacular.com/recipeImages/221397-556x370.jpg",
      "imageType": "jpg",
      "summary": 'Fried Anchovies with Sage might be just the main course you are searching for. One portion of this dish contains roughly <b>37g of protein</b>, <b>11g of fat</b>, and a total of <b>384 calories</b>. This recipe serves 3 and costs $5.61 per serving. Head to the store and pick up anchovies, sage leaves, seltzer water, and a few other things to make it today. To use up the baking powder you could follow this main course with the <a href="https://spoonacular.com/recipes/simple-raspberry-lemon-cake-671414">Simple Raspberry Lemon Cake</a> as a dessert. 2 people have tried and liked this recipe. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. With a spoonacular <b>score of 73%</b>, this dish is good. Try <a href="https://spoonacular.com/recipes/fried-sage-with-anchovies-493285">Fried Sage With Anchovies</a>, <a href="https://spoonacular.com/recipes/veal-shanks-with-olives-anchovies-and-sage-597839">Veal Shanks with Olives, Anchovies, and Sage</a>, and <a href="https://spoonacular.com/recipes/homemade-spaghetti-with-shallots-sage-lemons-anchovies-568523">Homemade Spaghetti with Shallots, Sage, Lemons & Anchovies</a> for similar recipes.',
      "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner",
      ],
      "diets": [
        "dairy free",
        "pescatarian",
      ],
      "instructions": "<p>If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza ('extra anchovies')! These little suckers are delicious &amp; actually good for you! Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with SageAcciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for fryingIn a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.Heat oil in a pot to 350 degree.Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.Remove from oil &amp; drain on a paper towel.Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.</p>",
      "analyzedInstructions": [
        {
          "name": "",
          "steps": [
            {
              "number": 1,
              "step": "If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza ('extra anchovies')! These little suckers are delicious &amp; actually good for you!",
              "ingredients": [
                {
                  "id": 15001,
                  "name": "anchovies",
                  "localizedName": "anchovies",
                },
                {
                  "id": 0,
                  "name": "lollipops",
                  "localizedName": "lollipops",
                },
              ],
            },
            {
              "number": 2,
              "step": "Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with Sage",
              "ingredients": [{
                "id": 15001,
                "name": "anchovies",
                "localizedName": "anchovies",
              },
              {
                "id": 10115261,
                "name": "fish",
                "localizedName": "fish",
              },
              {
                "id": 99226,
                "name": "sage",
                "localizedName": "sage",
              },
              ],

            },
            {
              "number": 3,
              "step": "Acciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for frying",
              "ingredients": [
                {
                  "id": 15001,
                  "name": "anchovies",
                  "localizedName": "anchovies",
                },
                {
                  "id": 99226,
                  "name": "sage",
                  "localizedName": "sage",
                },
                {
                  "name": "cooking oil",
                  "localizedName": "cooking oil",
                },
              ],
            },
            {
              "number": 4,
              "step": "In a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.",
              "ingredients": [
                {
                  "id": 18369,
                  "name": "baking powder",
                  "localizedName": "baking powder",
                },
                {
                  "id": 14121,
                  "name": "sparkling water",
                  "localizedName": "sparkling water",
                },
                {
                  "id": 20081,
                  "name": "all purpose flour",
                  "localizedName": "all purpose flour",
                },
                {
                  "id": 1123,
                  "name": "egg",
                  "localizedName": "egg",
                },
                {
                  "id": 2047,
                  "name": "salt",
                  "localizedName": "salt",
                },
              ],
            },
            {
              "number": 5,
              "step": "Heat oil in a pot to 350 degree.",
              "ingredients": [
                {
                  "id": 4582,
                  "name": "cooking oil",
                  "localizedName": "cooking oil",
                },
              ],
              "equipment": [
                {
                  "id": 404752,
                  "name": "pot",
                  "localizedName": "pot",
                },
              ],
            },
            {
              "number": 6,
              "step": "Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.",
              "ingredients": [
                {
                  "id": 15001,
                  "name": "anchovies",
                  "localizedName": "anchovies",
                  "image": "anchovies.jpg",
                },
                {
                  "id": 99226,
                  "name": "sage",
                  "localizedName": "sage",
                },
                {
                  "id": 0,
                  "name": "dip",
                  "localizedName": "dip",
                },
              ],

            },
            {
              "number": 7,
              "step": "Remove from oil &amp; drain on a paper towel.",
              "ingredients": [
                {
                  "id": 4582,
                  "name": "cooking oil",
                  "localizedName": "cooking oil",
                },
              ],
              "equipment": [
                {
                  "id": 405895,
                  "name": "paper towels",
                  "localizedName": "paper towels",
                },
              ],
            },
            {
              "number": 8,
              "step": "Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.",
              "ingredients": [
                {
                  "id": 14106,
                  "name": "white wine",
                  "localizedName": "white wine",
                },
                {
                  "id": 0,
                  "name": "prosecco",
                  "localizedName": "prosecco",
                },
                {
                  "id": 2047,
                  "name": "salt",
                  "localizedName": "salt",
                },
              ],

            },
          ],
        },
      ],

    }]
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
              {getRandomRecipeReducer.map((item) => {
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
