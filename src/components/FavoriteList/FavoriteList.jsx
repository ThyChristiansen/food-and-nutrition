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
    x: [],
    selected: getItems(10, 15)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FEATCH_FAVORITE_RECIPE',
    });
    setTimeout(() => {
      this.setState({
        x: this.props.items
      })
    }, 1000)
  }

  id2List = {
    droppable: 'x',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

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

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
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
        x: result.droppable,
        selected: result.droppable2
      });
    }
  };

  cardContent = (item) => {
    return <Grid item xs={5} className={this.props.classes.float}>
      <Card className={this.props.classes.card}>
        <RecipeSummary item={item} />
      </Card>
    </Grid>
  }

  render() {
    const { classes, items } = this.props;

    return (
      <Container className={classes.root} maxWidth="md" >
        {/* {JSON.stringify(this.state)} */}
        <Typography variant="h3" className={classes.center}>Your Favorite Recipe List </Typography>
        {items.length === 0 && (
            <Typography className={classes.center}>You haven't any favorite recipes</Typography>
        )}

        <Grid container spacing={1}>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid item xs={6} className={classes.section}>

              <Typography variant="h5" className={classes.center}>Not Try yet</Typography>

              <Droppable droppableId="droppable">

                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                  >
                    {this.state.x.map((item, index) => {
                      console.log(index)
                      return (
                        <Draggable
                          key={`item-${item.id}`}
                          draggableId={`item-${item.id}`}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={getItemStyle(
                              //   snapshot.isDragging,
                              //   provided.draggableProps.style
                              // )}
                            >

                                {this.cardContent(item)}
                                {item.id}
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
            <Grid item xs={6} className={classes.section}>

              <Typography variant="h5" className={classes.center}>Tried</Typography>
              <Droppable droppableId="droppable2">

                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                  >
                    {this.state.selected.map((item, index) => {
                      console.log(index)
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>

                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
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


  return {
    items
  }
};
export default connect(putReduxStateToProps)(withStyles(useStyles)(FavoriteList));
