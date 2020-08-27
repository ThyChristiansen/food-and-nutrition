import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Paper, Container, Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),

  },
  margin: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // padding: theme.spacing(1),
    marginTop: '10%',

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    width: "100%",
    backgroundColor: "#FFC2B4",
    boderRadius: "10px",
    backgroundColor: "rgb(250, 250, 250)",

  },
  contendCenter: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",

  },

});


class LandingPage extends Component {
  state = {
    question: '',
    tag: 'breakfast'
  }

  handleFetchData = () => {
    console.log('clicked!');
    this.props.dispatch({
      type: 'FETCH_ANSWER',
      payload: { question: this.state.question }
    });
  }

  handleInputChangeFor = (event) => {
    this.setState({
      question: event.target.value
    });
  }


  handleRandomRecipe = (event) => {
    if (event.target.value === 'breakfast') {
      this.setState({
        tag: 'breakfast'
      })
    } else if (event.target.value === 'lunch') {
      this.setState({
        tag: 'lunch'
      })
    } else if (event.target.value === 'dinner') {
      this.setState({
        tag: 'dinner'
      })
    }
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPE',
        payload: { meal: this.state.tag }
      });
      console.log('------->', this.state.tag)
    }, 100);
  }



  render() {
    const { classes } = this.props;

    return (
      <Container  maxWidth="md">
        <Grid container spacing={3} className={classes.contendCenter}>
          <Grid item maxWidth="md">
            <Paper className={classes.paper}>
              <input type="text" onChange={this.handleInputChangeFor} />
              <Button onClick={this.handleFetchData}>Ask</Button>

              <img src={this.props.reduxState.answer.image} />
              <Typography>Answer: {this.props.reduxState.answer.answer}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <TableContainer component={Paper} className={classes.paper} maxWidth="100%">
          <Table
            className={classes.table}
            aria-label="a dense table"
            size="small"
          >
            <Grid container className={classes.itemCenter} maxWidth="100%">
            <TableBody className={classes.contendCenter} maxWidth="100%">
              <TableRow>
                <TableCell variant="head">
                  <Typography variant="h4" >Random recipes</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={this.handleRandomRecipe} value="breakfast">Breakfast</Button>
                    <Button onClick={this.handleRandomRecipe} value="lunch">Lunch</Button>
                    <Button onClick={this.handleRandomRecipe} value="dinner">Dinner</Button>
                  </ButtonGroup>
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
