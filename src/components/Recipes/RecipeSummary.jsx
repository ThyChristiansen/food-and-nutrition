import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import './Recipes.css'
import { Card, Container, Grid, CardMedia, CardContent, CardActionArea } from '@material-ui/core';


import { Typography } from '@material-ui/core';


const useStyles = (theme) => ({
  root: {
    // marginTop: '30vh',
    // display: 'flex',
    // textAlign: "center",
  }, media: {
    height: 180,
    size: 80,
  },
})

class RecipeSummary extends Component {

 

  handleGetRecipeInfo = () => {
    console.log(this.props.history.push(`/recipe/${this.props.item.id}/${this.props.item.title}`))
  }

  render() {
    const { classes, reduxState } = this.props;
    return (
      <div className="content-page">
      <Container maxWidth="md" className={classes.root}  >
        <CardActionArea onClick={this.handleGetRecipeInfo}>
          <CardMedia
            className={classes.media}
            image={this.props.item.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.item.title}
            </Typography>

            <Typography gutterBottom variant="p" component="p">
              Protein: {this.props.item.protein}, Calories: {this.props.item.calories}, Carbs:{this.props.item.carbs}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Container>

      </div>
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default withRouter(connect(putReduxStateToProps)(withStyles(useStyles)(RecipeSummary)));
