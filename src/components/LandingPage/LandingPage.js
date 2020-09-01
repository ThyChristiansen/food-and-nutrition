import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Paper, Container, Typography, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RecipeDetail from '../RecipeDetail/RecipeDetail';


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  margin: {
    marginTop: '10%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
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

  },paper:{
    "&:hover": {
      backgroundColor: "#fbefe8c7"
    },
    padding: theme.spacing(2),

  }

});


class LandingPage extends Component {
  state = {
    question: '',
    tag: 'breakfast',
    answer: 'There are 5.52 g of Protein in 1 serving in an egg. This covers about 11% of your daily needs of Protein.'
  }


  handleFetchData = () => {
    console.log('clicked!');

    this.props.dispatch({
      type: 'FETCH_ANSWER',
      payload: { question: this.state.question }
    });
    setTimeout(() => {
      this.setState({
        answer: this.props.reduxState.answerReducer.answer
      })
    }, 600);

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
        type: 'FETCH_RECIPE',
        payload: { meal: this.state.tag }
      });
    }, 100);
  }


  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch({
        type: 'FETCH_RECIPE',
        payload: { meal: this.state.tag }
      });
    }, 100);
  }


  render() {
    const { classes, reduxState } = this.props;
    return (
      <Container maxWidth="md" className={classes.margin}>
        <Grid container spacing={3} className={classes.contendCenter}>
          <Grid item className={classes.answerCard}>
            <Paper className={classes.paper} >
              <Typography variant="h6" color="secondary">Ask me something</Typography>
              <TextField id="outlined-basic" variant="outlined" onChange={this.handleInputChangeFor}
                defaultValue="protein in an egg"
              />
              <Button onClick={this.handleFetchData} color='primary' variant="contained" className={classes.root}>Ask</Button>
              <Typography ><strong>Answer</strong>:  {this.state.answer}</Typography>
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
                    <RecipeDetail recipe={reduxState.getRecipeReducer} />
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
