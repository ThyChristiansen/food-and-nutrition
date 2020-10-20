import React, { Component } from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import '../Recipes/Recipes.css'
import { Card, Container, Grid, Typography } from '@material-ui/core';
import RecipeSummary from '../Recipes/RecipeSummary';



const useStyles = (theme) => ({
  root: {
    marginTop: '25vh',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

  },
  card: {
    height: "100%",
    width: "100%",
    minWidth: "50%",
  },
  center: {
    textAlign: "center",

  },
  float: {
    float: "left",
    margin: theme.spacing(1),
  },
  section: {
    border: "1px solid gray",
  }
})


const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  console.log(result)
  return result;
};

const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'lightgrey',

  // styles we need to apply on draggables
  ...draggableStyle
});

class FavoriteList extends Component {

  state = {
    favorite_list: [],
    tried_list: []
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FEATCH_FAVORITE_RECIPE',
    });

    this.props.dispatch({
      type: 'FEATCH_TRIED_RECIPE',
    });
    setTimeout(() => {
      this.setState({
        favorite_list: this.props.items,
        tried_list: this.props.triedRecipe
      })
    }, 1000)
  }

  id2List = {
    droppable: 'favorite_list',
    droppable2: 'tried_list'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    this.props.dispatch({
      type: 'MOVE_FAVORITE_RECIPE_TO_TRIED',
      // payload: this.
    });
    // dropped outside the list
    if (!destination) {
      return;
    }

    console.log(source, destination)
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );


      let state = { items };

      console.log('clicked', state)


      if (source.droppableId === 'droppable2') {
        state = { tried_list: items };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        favorite_list: result.droppable,
        tried_list: result.droppable2
      });
    }
  };

  droppableSection(list) {
    let y = (provided, snapshot) => (
      <div ref={provided.innerRef}>
        {list.map((item, index) => {
          console.log(index)
          return (
            <Draggable
              key={`item-${item.id}`}
              draggableId={`item-${item.id}`}
              index={index}>
              {(provided, snapshot) => (
                this.cardContent(provided, item)
              )}
            </Draggable>
          )
        })}
        {provided.placeholder}
      </div>
    )
    return y
  }

  render() {
    const { classes, items } = this.props;

    return (
      <Container className={classes.root} maxWidth="md" >
        <Typography variant="h3" className={classes.center}>Your Favorite Recipe List </Typography>
        {/* {items.length === 0 && (
            <Typography className={classes.center}>You haven't any favorite recipes</Typography>
        )} */}

        <Grid container spacing={1}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid item xs={6} className={classes.section}>
              <Typography variant="h5" className={classes.center}>Not Try yet</Typography>
              <Droppable droppableId="droppable">
                {this.droppableSection(this.state.favorite_list)}
              </Droppable>
            </Grid>
            <Grid item xs={6} className={classes.section}>
              <Typography variant="h5" className={classes.center}>Tried</Typography>
              <Droppable droppableId="droppable2">
                {this.droppableSection(this.state.tried_list)}
              </Droppable>
            </Grid>
          </DragDropContext>
        </Grid>
      </Container >

    )
  }
};


const putReduxStateToProps = (reduxState) => {
  let items = reduxState.getFavoriteRecipe.map((item) => {
    console.log(item)
    return item
  })

  let triedRecipe = reduxState.getTriedRecipe.map((item) => {
    console.log(item)
    return item
  })



  return {
    items,
    triedRecipe
  }
};
export default connect(putReduxStateToProps)(withStyles(useStyles)(FavoriteList));
