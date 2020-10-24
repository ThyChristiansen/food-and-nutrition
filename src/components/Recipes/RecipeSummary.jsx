import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import './Recipes.css'

import clsx from 'clsx';
import { Container, CardMedia, CardContent, CardActionArea, Typography, IconButton, Collapse, ListItem, ListItemIcon, Grow, Dialog, DialogActions, Button, DialogTitle } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = (theme) => ({
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
  iconHeart: {
    display: 'float',
    position: "absolute",
    // top: '1%',
    // left: '80%',
  },
})

class RecipeSummary extends Component {
  state = {
    expanded: false,
    checked: false,
    confirmationDialogOpen: false,
  }


  handleGetRecipeInfo = () => {
    this.props.history.push(`/recipe/${this.props.item.id}/${this.props.item.title}`)
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

  deleteThisFavoriteRecipe = () => {
    this.setState({
      confirmationDialogOpen: true
    })

  }

  handleClose = () => {
    this.setState({
      confirmationDialogOpen: false
    })
  }

  handleYesConfirm = () => {
    this.setState({
      confirmationDialogOpen: false
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'DELETE_FAVORITE_RECIPE',
        payload: {
          itemId: this.props.item.id,
          droppableId: this.props.droppableId
        }
      })
    }, 300)
  }

 

  render() {
    const { classes, reduxState } = this.props;

    let getRecipeSummrizeReducer = {
      "id": 4632,
      "title": "Soy-and-Ginger-Glazed Salmon with Udon Noodles",
      "summary": "Soy-and-Ginger-Glazed Salmon with Udon Noodles is a main course that serves 4. Watching your figure? This dairy free and pescatarian recipe has <b>552 calories</b>, <b>48g of protein</b>, and <b>17g of fat</b> per serving. For <b>$5.91 per serving</b>, this recipe <b>covers 47%</b> of your daily requirements of vitamins and minerals. 1 person has tried and liked this recipe. If you have sesame seeds, udon noodles, lime juice, and a few other ingredients on hand, you can make it. To use up the sesame seeds you could follow this main course with the <a href=' / orange - sesame - crunch - brownie - 226051'>Orange Sesame Crunch Brownie</a> as a dessert. It is brought to you by Food and Wine. From preparation to the plate, this recipe takes around <b>1 hour and 35 minutes</b>. With a spoonacular <b>score of 90%</b>, this dish is tremendous. Try <a href='/salmon-with-soy-ginger-noodles-4861'>Salmon With Soy-ginger Noodles</a >, < a href = '/soy-ginger-salmon-with-soba-noodles-220518' > Soy & ginger salmon with soba noodles</a >, and < a href = '/ginger-soy-salmon-with-soba-noodles-86918' > Ginger - Soy Salmon With Soba Noodles</a > for similar recipes.",
    }

    // console.log('----------->',this.props.history.location.pathname)
    // console.log(this.props.droppableId)
    return (
      <div >
        {/* <CardActionArea> */}
        <div>
          {this.props.history.location.pathname === "/find-recipes" ?
            ""
            :
            (<IconButton onClick={this.deleteThisFavoriteRecipe} className={classes.iconHeart}>
              <FavoriteIcon button style={{ color: "white", fontSize: 35 }} />
            </IconButton>)
          }

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
        {/* </CardActionArea> */}
        </div>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* Uncomment after test */}
            {/* <div dangerouslySetInnerHTML={{ __html: reduxState.getRecipeSummrizeReducer.summary }} /> */}
            {/* Uncomment after test */}

            {/* Delete after test */}
            <div dangerouslySetInnerHTML={{ __html: getRecipeSummrizeReducer.summary }} style={{ "font-size": "12px" }} />
            {/* Delete after test */}

          </CardContent>
        </Collapse>
        {/* <div>{reduxState.getRecipeSummrizeReducer.summary}</div> */}


        <Dialog
          open={this.state.confirmationDialogOpen}
          onClose={this.handleClose}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Do you want to remove this recipe?
        </DialogTitle>

          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleYesConfirm} color="primary">
              Yes
          </Button>
          </DialogActions>
        </Dialog>



      </div >
    )
  }
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default withRouter(connect(putReduxStateToProps)(withStyles(useStyles)(RecipeSummary)));

