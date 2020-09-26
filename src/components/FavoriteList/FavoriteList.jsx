import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import '../Recipes/Recipes.css'
import { Card, Container, Grid, Typography } from '@material-ui/core';



const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    textAlign: "center",
  },
})

class FavoriteList extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="content-page">
        <Grid item xs={4} >
          <Card className={this.props.classes.card}>
            {/* <RecipeSummary item={this.props.item} /> */}
          </Card>
        </Grid>
      </div>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(FavoriteList));
