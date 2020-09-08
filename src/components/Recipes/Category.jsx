import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import './Recipes.css'
import { Card, Container, Grid, CardActionArea, CardContent } from '@material-ui/core';


import { Typography } from '@material-ui/core';

let WIGHT= 200
const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    textAlign: "center",
  },
  card:{
    wight: WIGHT,
    height: WIGHT,
    borderRadius: '100%'
  }
})

class Category extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="content-page">
        <Container maxWidth="md" className={classes.root}  >
          <Grid container spacing={2}>
          <Grid item xs={3} >
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Diet</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

            <Grid item xs={3}>
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Type meal</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

            <Grid item xs={3}>
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Cuisine</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

            <Grid item xs={3}>
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Nutrition</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

            <Grid item xs={3}>
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Calories</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

            <Grid item xs={3}>
              <CardActionArea className={classes.card}>
                <CardContent>
                  <Typography>Cholesterol</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>

          </Grid>
        </Container>
      </div>
    )
  }
};


export default connect()(withStyles(useStyles)(Category));
