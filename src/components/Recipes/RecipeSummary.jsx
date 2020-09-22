import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import './Recipes.css'

import clsx from 'clsx';
import { Container, CardMedia, CardContent, CardActionArea, Typography, IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = (theme) => ({
  root: {
    // marginTop: '30vh',
    // display: 'flex',
    // textAlign: "center",
  },
  media: {
    height: 180,
    size: 80,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class RecipeSummary extends Component {
  state = {
    expanded: false
  }


  handleGetRecipeInfo = () => {
    console.log(this.props.history.push(`/recipe/${this.props.item.id}/${this.props.item.title}`))
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    })

    this.props.dispatch({
      type: 'FETCH_RECIPE_SUMMARY',
      payload: {
        id: this.props.item.id,

      }
    });
    console.log(this.props.item.id)
  }


  render() {
    const { classes, reduxState } = this.props;
    return (
      <div className="content-page">
        <Container maxWidth="md" className={classes.root}  >
          <CardActionArea >
            <CardMedia
              className={classes.media}
              image={this.props.item.image}
              title="Contemplative Reptile"
              onClick={this.handleGetRecipeInfo}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" onClick={this.handleGetRecipeInfo}>
                {this.props.item.title}
              </Typography>

              {/* <Typography gutterBottom variant="p" component="p">
                Protein: {this.props.item.protein}, Calories: {this.props.item.calories}, Carbs:{this.props.item.carbs}
              </Typography> */}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardContent>
          </CardActionArea>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* <Typography paragraph></Typography> */}
              <div>{reduxState.getRecipeSummrizeReducer.summary}</div>
            </CardContent>
          </Collapse>
        </Container>
        {/* <div>{reduxState.getRecipeSummrizeReducer.summary}</div> */}
      </div>
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default withRouter(connect(putReduxStateToProps)(withStyles(useStyles)(RecipeSummary)));
