import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Paper, Container, Typography, TableContainer, Table, TableBody, TableRow, TableCell, TextField, Slide, Collapse, Grow, Chip, Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RecipeDetail from '../Recipes/RecipeDetail';
import RecipeDetailTest from '../Recipes/RecipeDetailTest';


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  margin: {
    marginTop: '10%',
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
  table: {
    width: "100%",
    boderRadius: "10px",
    // backgroundColor: "rgb(250, 250, 250)",

  },
  contendCenter: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  answerCard: {
    width: "50%",
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
    margin: theme.spacing(1),

  },
  paper: {
    // "&:hover": {
    //   backgroundColor: "#fbefe8c7"
    // },
    padding: theme.spacing(2),
  },
  paperRecipes: {
    marginTop: '200px',
    padding: theme.spacing(2),
  },
  iconPaperClip: {
    display: 'float',
    position: "absolute",
    marginTop: '-120px',
    left: '45%',
  },
  iconCooker: {
    display: 'float',
    position: "absolute",
    marginTop: '-190px',
    left: '45%',
  },
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  }
});


class LandingPage extends Component {
  state = {
    question: '',
    tag: 'breakfast',
    answer: 'There are 5.52 g of Protein in 1 serving in an egg. This covers about 11% of your daily needs of Protein.',
    transitionShow: true,
    trasitionShowAnswer: true,
    transitionCooker: true,
  }

  handleFetchAnswer = () => {
    this.props.dispatch({
      type: 'FETCH_ANSWER',
      payload: { question: this.state.question }
    });
    setTimeout(() => {
      this.setState({
        trasitionShowAnswer: false
      })
    }, 100);
    setTimeout(() => {
      this.setState({
        trasitionShowAnswer: true
      })
    }, 700);
    setTimeout(() => {
      this.setState({
        answer: this.props.reduxState.answerReducer.answer,
      })
    }, 1000);
  }

  handleInputChangeFor = (event) => {
    this.setState({
      question: event.target.value
    });
  }

  handleRandomRecipe = (item) => {
    this.setState({
      tag: item
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RANDOM_RECIPE',
        payload: { meal: this.state.tag }
      });
    }, 100);
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
  }


  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RANDOM_RECIPE',
        payload: { meal: this.state.tag }
      });
    }, 500);
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
      "image": "https://spoonacular.com/recipeImages/1-556x370.jpg",
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
      <Container maxWidth="md" className={classes.margin}>
        <Grid container spacing={3} className={classes.contendCenter}>
          <Grid item className={classes.answerCard}>
            <Slide direction="down" in={this.state.transitionShow} mountOnEnter unmountOnExit>
              <Paper elevation={4} className={classes.paper}>
                <Typography variant="h6" color="secondary">Ask me something</Typography>
                <TextField id="outlined-basic" variant="outlined" onChange={this.handleInputChangeFor}
                  defaultValue="protein in an egg"
                />
                <Button onClick={this.handleFetchAnswer} color='primary' variant="contained" className={classes.root}>Ask</Button>
                <Collapse in={this.state.trasitionShowAnswer}>
                  <Typography><strong>Answer</strong>:  {this.state.answer}</Typography>
                </Collapse>
              </Paper>
            </Slide>


          </Grid>
        </Grid>

        <TableContainer component={Paper} className={classes.paperRecipes} maxWidth="100%" zIndex="modal">

          {/* <svg xmlns="http://www.w3.org/2000/svg"
            className={classes.iconPaperClip}
            width="150"
            height="150"
            viewBox="0 0 512 512"
            zIndex="tooltip"
          >
            <g>
              <path d="m225.167 277.493h58.666v15h-58.666z" /><path d="m56.429 322h15.063v14.999h-15.063z" transform="matrix(.091 -.996 .996 .091 -269.978 363.356)" /><path d="m53.651 352h15.07v15h-15.07z" transform="matrix(.097 -.995 .995 .097 -302.541 385.69)" /><path d="m493.849 442.505-12.658-139.159-29.359-25.853h-107.831v15h102.169l20.625 18.161 11.993 131.851h-111.742l-64.146-232.562c31.521-17.496 51.564-51.167 51.564-87.478 0-55.121-44.844-99.964-99.964-99.964s-99.964 44.844-99.964 99.964c0 37.93 21.295 72.248 54.792 89.2l-67.288 230.84h-111.828l12.001-131.938 19.706-18.074h105.074v-15h-110.912l-28.28 25.94-12.65 139.071h-15.151v44.996h419.5v-15h-404.5v-14.995h480v14.995h-30.5v15h45.5v-44.995zm-266.456-239.215c-28.429-12.099-50.335-33.441-56.335-64.757-6.058-31.619 6.715-64.596 32.409-83.958 25.105-18.919 59.572-22.346 87.888-8.658 28.441 13.748 47.363 42.973 48.086 74.574.849 37.09-21.956 66.165-54.298 81.493l66.341 240.521h-193.82z" /><path d="m434.5 472.5h15v15h-15z" />
            </g>
          </svg> */}
          <Grow
            direction="right" in={this.state.transitionCooker} mountOnEnter
            {...(this.state.transitionCooker ? { timeout: 1000 } : {})}
          >
            {/* <Slide direction="right" in={this.state.transitionCooker} mountOnEnter> */}
            <svg xmlns="http://www.w3.org/2000/svg"
              className={classes.iconCooker}
              width="200"
              height="200"
              viewBox="0 0 512 512"
              zIndex="tooltip"
            >
              <g>
                <path d="m437.34375 342.222656c-7.234375-30.753906-31.316406-45.171875-61.527344-50.492187-6.945312-1.222657-14.175781-1.976563-21.613281-2.324219-5.492187-.175781-10.050781-1.308594-13.917969-3.140625-21.699218 41.132813-120.902344 38.226563-137.460937 0v-.289063c-4.007813 2.003907-8.773438 3.253907-14.523438 3.429688-7.234375.347656-14.265625 1.042969-21.003906 2.207031-29.371094 5.03125-53.015625 18.574219-61.265625 47.207031 12.75 12.238282 116.285156 105.578126 117.097656 110.691407h217.378906v-52.320313c0-5.582031 2.527344-10.613281 6.507813-13.984375zm0 0" fill="#64b0d9" fill-rule="evenodd" /><path d="m72.1875 288.003906c-2.027344 0-4.050781-.785156-5.574219-2.351562-3.003906-3.078125-2.941406-8.007813.140625-11.007813 7.34375-7.15625 5.769532-10.238281 1.96875-17.675781-4.347656-8.511719-10.921875-21.371094 5.945313-37.242188 3.128906-2.945312 8.058593-2.800781 11.007812.332032 2.945313 3.132812 2.796875 8.058594-.335937 11.003906-8.351563 7.859375-6.710938 11.070312-2.746094 18.820312 4.21875 8.261719 10.597656 20.742188-4.96875 35.910157-1.515625 1.476562-3.476562 2.210937-5.4375 2.210937zm0 0" fill="#666" /><path d="m115.300781 246.261719c-2.027343 0-4.054687-.785157-5.578125-2.351563-3.003906-3.078125-2.941406-8.007812.140625-11.007812 7.34375-7.15625 5.765625-10.230469 1.957031-17.671875-4.355468-8.507813-10.941406-21.371094 5.925782-37.246094 3.132812-2.945313 8.058594-2.796875 11.007812.335937 2.949219 3.128907 2.800782 8.054688-.332031 11.003907-8.347656 7.855469-6.703125 11.0625-2.734375 18.8125 4.226562 8.261719 10.621094 20.742187-4.953125 35.917969-1.515625 1.472656-3.476563 2.207031-5.433594 2.207031zm0 0" fill="#666" /><path d="m473.042969 389.183594c-4.300781 0-7.785157-3.484375-7.785157-7.78125v-127.113282c0-4.296874 3.484376-7.78125 7.785157-7.78125s7.789062 3.484376 7.789062 7.78125v127.109376c0 4.300781-3.488281 7.785156-7.789062 7.785156zm0 0" fill="#666" /><g fill-rule="evenodd"><path d="m188.300781 289.40625c-7.234375.347656-14.265625 1.042969-21.003906 2.207031v47.207031l15.773437 14.15625 19.753907-14.15625v-52.84375c-4.007813 2.003907-8.773438 3.253907-14.523438 3.429688zm0 0" fill="#e6e6e6" /><path d="m165.785156 436.636719h42.296875c7.582031 0 13.914063 5.609375 15.046875 12.875h180.894532l-13.859376-80.199219c-1.304687-7.789062-6.449218-14.386719-14.351562-14.386719v-63.195312c-6.941406-1.222657-14.175781-1.976563-21.613281-2.324219-5.488281-.175781-10.050781-1.308594-13.914063-3.140625v68.660156h-108.613281c.230469 1.742188-53.21875 76.507813-65.886719 81.710938zm0 0" fill="#e6e6e6" /><path d="m323.292969 267.953125-49.472657-15.609375-54.46875 15.316406-.144531.261719c-3.628906 7.703125-8.773437 14.214844-16.382812 18.050781v.292969c16.558593 38.222656 115.761719 41.132813 137.460937 0-7.957031-3.78125-13.011718-10.582031-16.992187-18.3125zm0 0" fill="#fcc368" /><path d="m330.730469 119.0625c-39.390625-5.839844-79.015625-5.957031-118.871094 0-11.503906 1.714844-23.007813 3.953125-34.539063 6.6875v75.78125c0 26.832031 19.546876 50.523438 42.035157 66.132812 18.359375 12.789063 38.691406 20.144532 51.792969 19.445313 16.558593-.929687 35.558593-7.847656 52.144531-19.15625 23.589843-16.101563 42.296875-41.101563 42.296875-70.460937v-71.769532c-11.589844-2.707031-23.210938-4.945312-34.859375-6.660156zm0 0" fill="#ffdda6" /><path d="m273.910156 0c-18.15625.0585938-37.273437 9.359375-46.769531 27.878906h-25.507813c-36.863281 0-58.824218 40.519532-24.316406 62v56.363282c11.535156-2.730469 23.039063-4.941407 34.542969-6.683594 39.855469-5.960938 79.480469-5.84375 118.871094 0 11.648437 1.742187 23.265625 3.953125 34.859375 6.683594v-56.363282c34.511718-21.480468 13.507812-62-23.355469-62h-27.425781c-5.371094-18.519531-22.425782-27.8203122-40.550782-27.878906zm0 0" fill="#e6e6e6" /><path d="m365.589844 89.878906c34.511718-21.480468 13.507812-62.003906-23.355469-62.003906h-21.527344c33.058594 0 53.480469 29.5625 32.390625 51.800781-6.769531 7.121094-8.917968 3.429688-8.917968 13.402344l-.085938 48.6875c7.175781 1.308594 14.351562 2.792969 21.496094 4.476563zm0 0" fill="#c2c7cc" /><path d="m365.589844 183.945312c-1.21875-.234374-12.144532-2.324218-21.496094-9.765624v18.835937c0 29.355469-18.738281 54.386719-42.324219 70.460937-16.589843 11.335938-35.585937 18.226563-52.144531 19.15625-.582031.027344-1.164062.058594-1.773438.058594 8.773438 3.167969 16.90625 4.765625 23.296876 4.417969 16.558593-.929687 35.558593-7.847656 52.144531-19.15625 23.589843-16.105469 42.296875-41.105469 42.296875-70.464844zm0 0" fill="#fcc368" /><path d="m340.289062 286.265625c-7.960937-3.78125-13.015624-10.582031-16.996093-18.3125-9.761719 6.65625-20.390625 11.800781-30.820313 15.085937 4.792969 9.273438 8.742188 13.515626 22.601563 20.085938 1.65625.785156 3.457031 1.453125 5.371093 1.945312 8.714844-4.675781 15.6875-10.957031 19.84375-18.804687zm0 0" fill="#eda93b" />
                  <path d="m437.34375 342.222656c-7.234375-30.753906-31.316406-45.171875-61.527344-50.492187-6.945312-1.222657-14.175781-1.976563-21.613281-2.324219-5.492187-.175781-10.050781-1.308594-13.917969-3.140625-4.152344 7.847656-11.125 14.128906-19.839844 18.808594 2.585938.695312 5.402344 1.105469 8.542969 1.191406 3.832031.203125 7.582031.464844 11.296875.871094 3.515625.378906 6.945313.84375 10.316406 1.453125 9.03125 1.597656 17.542969 4.011718 25.214844 7.414062 17.921875 8.019532 31.253906 21.539063 36.339844 43.105469 7.320312 31.074219 10.109375 58.515625 10.109375 90.402344h18.242187v-52.320313c0-5.582031 2.527344-10.613281 6.507813-13.984375zm0 0" fill="#4a83c9" /><path d="m375.816406 291.730469c-6.945312-1.222657-14.175781-1.976563-21.613281-2.324219-5.492187-.175781-10.050781-1.308594-13.917969-3.140625v20.871094c3.515625.378906 6.945313.84375 10.316406 1.453125 9.03125 1.597656 17.542969 4.011718 25.214844 7.414062zm0 0" fill="#c2c7cc" /><path d="m505.578125 411.433594c0-17.90625-14.640625-32.554688-32.535156-32.554688h-14.234375c-4.472656 0-8.597656 1.625-11.792969 4.328125-3.980469 3.371094-6.507813 8.402344-6.507813 13.984375v58.863282c0 10.085937 8.25 18.339843 18.300782 18.339843h14.234375c17.894531 0 32.535156-14.648437 32.535156-32.554687zm0 0" fill="#ffdda6" /><path d="m489.574219 141.621094h-33.058594c-12.347656 0-22.425781 10.117187-22.425781 22.441406v67.785156c0 12.355469 10.078125 22.441406 22.425781 22.441406h33.058594c6.941406 0 13.15625-3.195312 17.285156-8.195312 3.195313-3.894531 5.140625-8.835938 5.140625-14.242188v-67.789062c0-5.378906-1.945312-10.347656-5.140625-14.214844-4.125-5-10.34375-8.226562-17.285156-8.226562zm0 0" fill="#e6e6e6" /><path d="m390.164062 369.3125c-1.304687-7.789062-6.445312-14.386719-14.347656-14.386719h-20.683594l16.933594 94.585938h31.957032zm0 0" fill="#c2c7cc" /><path d="m505.578125 411.433594c0-17.90625-14.640625-32.554688-32.535156-32.554688h-14.234375c-1.886719 0-3.714844.289063-5.460938.839844 14.382813 3.34375 25.1875 16.335938 25.1875 31.714844v30.40625c0 15.378906-10.804687 28.34375-25.1875 31.714844 1.746094.523437 3.574219.84375 5.460938.84375h14.234375c17.894531 0 32.535156-14.652344 32.535156-32.558594zm0 0" fill="#fcc368" /><path d="m289.042969 354.925781c-1.191407-9.039062-9.003907-16.105469-18.386719-16.105469h-31.199219c-10.953125 0-12.8125 10.320313-15.164062 20.929688-1.191407 5.289062 22.71875 11.25 20.828125 16.191406h25.535156c10.226562 0 18.5625-8.34375 18.5625-18.546875 0-.839843-.058594-1.65625-.175781-2.46875zm0 0" fill="#fcc368" />
                  <path d="m49.734375 338.820312h-31.199219c-10.199218 0-18.535156 8.371094-18.535156 18.574219s8.335938 18.546875 18.535156 18.546875h25.476563l24.195312-22.964844zm0 0" fill="#fcc368" /><path d="m202.824219 338.820312h-153.089844c-10.953125 0-12.636719 11.105469-10.285156 21.742188 1.191406 5.351562 2.730469 10.464844 4.5625 15.378906 10.804687 28.75 32.417969 49.96875 59.722656 60.695313l35.355469 22.089843 47.207031-22.089843c26.984375-11.132813 48.277344-33.226563 58.824219-60.695313 1.886718-4.941406 3.457031-10.085937 4.617187-15.378906 2.355469-10.636719.699219-21.742188-10.28125-21.742188zm0 0" fill="#f78411" /><path d="m186.296875 436.636719h-119.890625c-8.394531 0-15.222656 6.859375-15.222656 15.230469v15.902343c0 8.371094 6.828125 15.230469 15.222656 15.230469h162.183594c8.367187 0 15.222656-6.859375 15.222656-15.230469v-15.902343c0-.785157-.058594-1.597657-.203125-2.355469-1.132813-7.265625-7.464844-12.875-15.019531-12.875zm0 0" fill="#808080" /><path d="m239.457031 338.820312h-31.753906c10.953125 0 12.636719 11.105469 10.285156 21.742188-1.191406 5.292969-2.730469 10.4375-4.648437 15.378906-2.003906 5.261719-4.414063 10.289063-7.175782 15.117188-4.964843 8.632812-11.066406 16.507812-18.125 23.425781-.464843.4375-.929687.902344-1.394531 1.339844-9.296875 8.777343-20.160156 15.871093-32.128906 20.8125h31.78125c5.691406-2.355469 11.125-5.175781 16.265625-8.460938 19.203125-12.238281 34.21875-30.550781 42.558594-52.234375 1.886718-4.941406 3.457031-10.085937 4.617187-15.378906.4375-1.886719.726563-3.777344.84375-5.636719.640625-8.574219-2.089843-16.105469-11.125-16.105469zm0 0" fill="#f74311" /><path d="m243.609375 449.511719c-1.132813-7.265625-7.464844-12.875-15.019531-12.875h-31.78125c7.582031 0 13.886718 5.609375 15.050781 12.875.113281.757812.171875 1.570312.171875 2.355469v15.902343c0 8.371094-6.855469 15.230469-15.222656 15.230469h31.78125c8.367187 0 15.222656-6.859375 15.222656-15.230469v-15.902343c0-.785157-.054688-1.597657-.203125-2.355469zm0 0" fill="#666" /><path d="m506.859375 149.847656c-4.125-5-10.34375-8.226562-17.285156-8.226562h-30.417969c12.320312 0 22.429688 10.117187 22.429688 22.441406v67.785156c0 12.355469-10.109376 22.441406-22.429688 22.441406h30.417969c6.941406 0 13.15625-3.195312 17.285156-8.195312 3.195313-3.894531 5.140625-8.835938 5.140625-14.242188v-67.789062c0-5.378906-1.945312-10.347656-5.140625-14.214844zm0 0" fill="#c2c7cc" /><path d="m365.589844 146.242188c-11.589844-2.730469-23.210938-4.941407-34.859375-6.683594-4.097657 36.914062 32.535156 43.976562 34.859375 44.386718zm0 0" fill="#808080" /><path d="m211.859375 139.558594c-11.503906 1.742187-23.007813 3.953125-34.539063 6.683594v37.644531c5.023438-.988281 38.433594-9.070313 34.539063-44.328125zm0 0" fill="#808080" /><path d="m365.589844 146.242188c-7.144532-1.683594-14.320313-3.167969-21.496094-4.476563v32.410156c9.351562 7.441407 20.277344 9.535157 21.496094 9.769531zm0 0" fill="#666" /></g><path d="m224.285156 188.78125c-1.964844 0-3.929687-.742188-5.445312-2.222656-3.078125-3.003906-3.121094-7.945313-.117188-11.019532 5.558594-5.6875 15.199219-6.339843 19.089844-6.355468h.15625c4.046875 0 13.667969.640625 19.300781 6.308594 3.03125 3.050781 3.015625 7.980468-.035156 11.011718-3.050781 3.027344-7.980469 3.011719-11.011719-.035156-2.503906-2.253906-13.84375-2.277344-16.382812-.027344-1.523438 1.558594-3.535156 2.339844-5.554688 2.339844zm0 0" fill="#666" /><path d="m287.351562 188.78125c-1.964843 0-3.929687-.742188-5.449218-2.222656-3.074219-3.007813-3.121094-7.945313-.113282-11.019532 5.5625-5.6875 15.203126-6.339843 19.089844-6.355468h.15625c4.042969 0 13.664063.640625 19.300782 6.308594 3.03125 3.050781 3.015624 7.980468-.035157 11.011718-3.050781 3.027344-7.980469 3.011719-11.015625-.035156-2.503906-2.253906-13.839844-2.277344-16.378906-.027344-1.523438 1.558594-3.539062 2.339844-5.554688 2.339844zm0 0" fill="#666" /><path d="m270.308594 93.304688c-4.300782 0-7.789063-3.488282-7.789063-7.785157v-35.753906c0-4.300781 3.488281-7.785156 7.789063-7.785156 4.300781 0 7.785156 3.484375 7.785156 7.785156v35.753906c0 4.296875-3.484375 7.785157-7.785156 7.785157zm0 0" fill="#c2c7cc" /><path d="m217.4375 109.4375c-4.300781 0-7.789062-3.488281-7.789062-7.785156v-35.726563c0-4.296875 3.488281-7.78125 7.789062-7.78125s7.785156 3.484375 7.785156 7.78125v35.726563c0 4.296875-3.484375 7.785156-7.785156 7.785156zm0 0" fill="#c2c7cc" /><path d="m323.175781 109.4375c-4.300781 0-7.785156-3.488281-7.785156-7.785156v-35.726563c0-4.296875 3.484375-7.78125 7.785156-7.78125s7.789063 3.484375 7.789063 7.78125v35.726563c0 4.296875-3.488282 7.785156-7.789063 7.785156zm0 0" fill="#c2c7cc" />
              </g>
            </svg>
            {/* </Slide> */}
          </Grow>


          <Table
            className={classes.table}
            aria-label="a dense table"
            size="small"
          >
            <Grid container className={classes.itemCenter} maxWidth="100%">
              <TableBody className={classes.contendCenter} maxWidth="100%" >
                <TableRow>
                  <TableCell variant="head" className={classes.contendCenter}>
                    <Typography variant="h4" className={classes.root}>Random recipes for your day</Typography>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                      <Button onClick={() => this.handleRandomRecipe('breakfast')} >Breakfast</Button>
                      <Button onClick={() => this.handleRandomRecipe('lunch')} >Lunch</Button>
                      <Button onClick={() => this.handleRandomRecipe('dinner')} >Dinner</Button>
                      <Button onClick={() => this.handleRandomRecipe('dessert')} >Dessert</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell >
                    {/* Uncomment after test */}
                    {/* {reduxState.getRandomRecipeReducer.map((item) => {
                      return (<>
                        <Card className={classes.root}>
                          <RecipeDetailTest item={item} />
                          <CardContent>
                            {item.dishTypes.map((chip) => {
                              return <Chip className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} />
                            })}
                          </CardContent>
                        </Card>
                      </>)
                    })} */}
                    {/* Uncomment after test */}

                    {/* Delete after test */}
                    {getRandomRecipeReducer.map((item) => {
                      return (<>
                        <Card className={classes.root}>
                          <RecipeDetailTest item={item} />
                          <CardContent>
                            {item.dishTypes.map((chip) => {
                              return <Chip className={classes.hover} size="small" color="secondary" onClick={() => this.handleGetRecipeByChips(chip)} label={chip} />
                            })}
                          </CardContent>
                        </Card>
                      </>)
                    })}
                    {/* Delete after test */}

                  </TableCell>
                </TableRow>
              </TableBody>
            </Grid>
          </Table>
        </TableContainer>


      </Container>

    )
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(LandingPage));
