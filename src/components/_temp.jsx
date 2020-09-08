import React, {Component} from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import './Recipes.css'
import {Card, Container, Grid} from '@material-ui/core';


import { Typography } from '@material-ui/core';


const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    textAlign: "center",
  },
})

class FindRecipes extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="content-page">
        <Container maxWidth="md" className={classes.root}  >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>sdfsdf</Typography>

            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
};


export default connect()(withStyles(useStyles)(FindRecipes));
