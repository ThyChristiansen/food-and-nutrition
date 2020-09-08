import React, { Component } from 'react';

import { connect } from 'react-redux';
import RecipeDetail from '../RecipeDetail/RecipeDetail';

import { fade, withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, InputBase, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, FormControlLabel, Switch, Card, CardHeader, Table, TableBody, TableRow, TableCell, CardMedia, CardActionArea, CardContent, CardActions, Button } from '@material-ui/core';
import './Recipes.css'
import SearchIcon from '@material-ui/icons/Search';


const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: 'lightgray',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  formControl: {
    width: 150,
    marginBottom: '10px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  media: {
    height: 180,
    size: 80,
  },
  card: {
    height: "100%",
    wight: "100%",

  }

})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class FindRecipes extends Component {

  state = {
    meal: 'breakfast',
    nutrition: [],
    myRecipes: false,
    input: '',
    id: '',
    cuisine:'', 
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_RECIPES',
      payload: {
        meal: this.state.meal,
      }
    });
  }

  handleInputOnChange = (event) => {
    this.setState({
      input: event.target.value,
    })
    // console.log(this.state.input)
    this.props.dispatch({
      type: 'FETCH_RECIPES',
      payload: {
        input: this.state.input,
        // typeMeal: this.state.meal,
      }
    });

  }
  handleMealChange = (event) => {
    this.setState({
      meal: event.target.value,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          // input: this.state.input,
          meal: this.state.meal,
        }
      });
    }, 100);

  };
  handleNutritionChange = (event) => {
    this.setState({
      nutrition: event.target.value,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          // input: this.state.input,
          // typeMeal: this.state.meal,
          nutrition: this.state.nutrition,

        }
      });
    }, 100);
  };

  handleCuisineChange=(event)=>{
    this.setState({
      cuisine: event.target.value,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          // typeMeal: this.state.meal,
          cuisine: this.state.cuisine,
        }
      });
    }, 100);
    console.log(this.state.cuisine)
  }

  handleSwitchChange = () => {
    this.setState({
      myRecipes: !this.state.myRecipes,
    })
  }

  render() {
    const { classes, reduxState } = this.props;

    return (
      <Container maxWidth="md" className={classes.root}  >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={this.handleInputOnChange}
          />
        </div>


        <Grid container spacing={2}>
          <Grid item xs={3} >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Meal Options</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                value={this.state.meal}
                onChange={this.handleMealChange}
              >
                {['breakfast',
                  'main course',
                  'dessert',
                  'drink',
                  'salad',

                ].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Nutrition Options</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={this.state.nutrition}
                onChange={this.handleNutritionChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}

              >
                {['maxCalories',
                  'maxFat',
                  'maxProtein',
                  'maxCarbs',
                  'maxCholesterol',
                  'maxFluoride',
                  'maxVitaminA',
                  'maxVitaminC',
                  'maxVitaminD',
                  'maxVitaminE',
                  'maxVitaminB1',
                  'maxVitaminB2',
                  'maxIron',
                ].map((name) => (
                  <MenuItem key={name} value={name} >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} >
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Cuisine</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                value={this.state.cuisine}
                onChange={this.handleCuisineChange}
              >
                {['american','african', 'chinese', 'japanese', 'korean', 'vietnamese', 'italian',
                  'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun',
                  'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american'
                ].map((name) => (
                  <MenuItem key={name} value={name} >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} >
            <FormControlLabel
              label="My recipes"
              control={
                <Switch
                  checked={this.state.myRecipes}
                  onChange={this.handleSwitchChange}
                  name="myRecipes"
                  color="primary"
                />
              }
            />
          </Grid>
        </Grid>




        <Grid container spacing={2}>

          {reduxState.getRecipeReducer.map((item) => {
            return (
              <>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.title}
                        </Typography>

                      </CardContent>
                    </CardActionArea>
                    <CardActions>

                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          })}

        </Grid>
      </Container>

    )

  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(putReduxStateToProps)(withStyles(useStyles)(FindRecipes));
