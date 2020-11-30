import React, {Component} from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import '../Recipes/Recipes.css'
import {Card, Container, Grid,Typography} from '@material-ui/core';



const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    textAlign: "center",
  },
})

class ClassName extends Component {

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


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(ClassName));
