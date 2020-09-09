import React, { Component } from 'react';

import { connect } from 'react-redux';
import RecipeDetail from '../RecipeDetail/RecipeDetail';

import { fade, withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, InputBase, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, FormControlLabel, Switch, Card, CardHeader, Table, TableBody, TableRow, TableCell, CardMedia, CardActionArea, CardContent, CardActions, Button, Slider, List, ListSubheader, ListItem, Collapse } from '@material-ui/core';
import './Recipes.css'
import SearchIcon from '@material-ui/icons/Search';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: 'lightgray',

  },
  sideSearchBar: {
    backgroundColor: 'lightgray',
    paddingLeft: "20px",
    borderRadius: "10px",
    paddingRight: theme.spacing(2),

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
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nutritionName:{
    paddingRight: theme.spacing(5),

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
    meal: 'main course',
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
    this.props.dispatch({
      type: 'FETCH_RECIPES',
      payload: {
        input: this.state.input,
        meal: this.state.meal,
        calories: this.state.calories,
        fat: this.state.fat,
        protein: this.state.protein,
        intolerances: this.state.intolerances,

      }
    });
  }

  handleInputOnChange = (event) => {
    this.setState({
      input: event.target.value,
    })
    // console.log(this.state.input)
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);
  }

  handleMealChange = (event) => {
    this.setState({
      meal: event.target.value,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);

  };

  handleIntolerancesChange = (event) => {
    this.setState({
      intolerances: event.target.value,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);
  };

  handleCaloriesChange = (event, newValue) => {
    this.setState({
      calories: newValue,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);
  };

  handleFatChange = (event, newValue) => {
    this.setState({
      fat: newValue,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);
  };

  handleProteinChange = (event, newValue) => {
    this.setState({
      protein: newValue,
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPES',
        payload: {
          input: this.state.input,
          meal: this.state.meal,
          calories: this.state.calories,
          fat: this.state.fat,
          protein: this.state.protein,
          intolerances: this.state.intolerances,

        }
      });
    }, 100);
  };

  handleSwitchChange = () => {
    this.setState({
      myRecipes: !this.state.myRecipes,
    })
  }

  handleExpan = () => {
    this.setState({
      expan: !this.state.expan
    })
  }

  render() {
    const { classes, reduxState } = this.props;

    return (
      <Container className={classes.root}  >

        <Grid container spacing={2} >

          <Grid item xs={3} className={classes.sideSearchBar}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Search your recipes</ListSubheader>
              }
            >
              <ListItem >
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    value={this.state.input}
                    placeholder="Search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={this.handleInputOnChange}
                  />
                </div>
              </ListItem>
              <ListItem >
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
              </ListItem>
             
              <ListItem onClick={this.handleExpan}>
                <ListItemText primary="Nutritions" />
                {this.state.expan ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.expan} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <Typography id="range-slider" gutterBottom className={classes.nutritionName}>Fat</Typography>
                    <Slider
                      value={this.state.fat}
                      min={5}
                      step={10}
                      max={100}
                      getAriaValueText={(value) => { return `${value}` }}
                      onChange={this.handleFatChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <Typography id="range-slider" gutterBottom className={classes.nutritionName}>Protein</Typography>
                    <Slider
                      value={this.state.protein}
                      min={5}
                      step={10}
                      max={100}
                      getAriaValueText={(value) => { return `${value}` }}
                      onChange={this.handleProteinChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <Typography id="range-slider" gutterBottom className={classes.nutritionName}>Calories</Typography>
                    <Slider
                      value={this.state.calories}
                      min={150}
                      step={10}
                      max={1500}
                      getAriaValueText={(value) => { return `${value}` }}
                      onChange={this.handleCaloriesChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>

            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Diet</InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  value={this.state.diet}
                  onChange={this.handleDietChange}
                >
                  {['none',
                    'pescetarian',
                    'lacto vegetarian',
                    'ovo vegetarian',
                    'vegan',
                    'paleo',
                    'primal',
                    'vegetarian'
                  ].map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Exclude Ingredients Options</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={this.state.intolerances}
                  onChange={this.handleIntolerancesChange}
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
                  {["none", "dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", " sulfite", "tree nut", "wheat"].map((name) => (
                    <MenuItem key={name} value={name} >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>

            <ListItem>
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
            </ListItem>
          </Grid>
          <Grid item xs={9} >
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
          </Grid>

        </Grid>

      </Container>
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(putReduxStateToProps)(withStyles(useStyles)(FindRecipes));
