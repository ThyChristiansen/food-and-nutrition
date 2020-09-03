import React, { Component } from 'react';

import { connect } from 'react-redux';
import RecipeDetail from '../RecipeDetail/RecipeDetail';

import { fade, withStyles } from '@material-ui/core/styles';
import { Card, Grid, Container, Typography, Grow, CardActionArea, InputBase, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText, Chip, FormControlLabel, Switch } from '@material-ui/core';
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


// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

class FindRecipes extends Component {

  state = {
    meal: 'Breackfast',
    nutrition: [],
    myRecipes: false,
  }

  handleMealChange = (event) => {
    this.setState({
      meal: event.target.value,
    })
  };
  handleNutritionChange = (event) => {
    this.setState({
      nutrition: event.target.value,
    })
  };

  handleSwitchChange = () => {
    this.setState({
      myRecipes: !this.state.myRecipes,
    })
  }

  render() {
    const { classes } = this.props;

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
                {['Breakfast',
                  'Lunch',
                  'Dinner',
                  'Dessert'
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
                {['Breakfast',
                  'Lunch',
                  'Dinner',
                  'Dessert'
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
          {/* <RecipeDetail /> */}

        </Grid>
      </Container>

    )

  }
};


export default connect()(withStyles(useStyles)(FindRecipes));
