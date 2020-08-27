import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Container } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import Chip from '@material-ui/core/Chip';

import Grid from '@material-ui/core/Grid';

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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
});


class RecipeDetail extends Component {


  render() {

    const { classes } = this.props;
    console.log(typeof this.props.recipe)
    return (
      <Container maxWidth="md">
        {this.props.recipe.map((item) => {
          return (<>
            <p>{item.preparationMinutes}</p>
            <Card className={classes.root}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.title}
                subheader={"Cooking: " + item.readyInMinutes + " mins" + "  ,   " +
                  "Serving: " + item.servings
                }
              />
              <CardMedia
                className={classes.media}
                image={item.image}
                title={item.title}
              />
              <CardContent>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                </Typography> */}
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />

                </IconButton>
              </CardActions>
              {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
              <CardContent>
                <Typography paragraph>Ingreadients: </Typography>
                {item.extendedIngredients.map((i) => {
                  return (<>
                    <Typography paragraph > {i.originalString}</Typography>
                  </>
                  )
                })}
                <Typography paragraph>Cooking: </Typography>

                <Typography paragraph>
                  {item.instructions}
                </Typography>

                {item.dishTypes.map((chip) => {
                  return <Chip label={chip} />
                })}
              </CardContent>
              {/* </Collapse> */}
            </Card>
          </>
          )
        })}
      </Container>

    )
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(RecipeDetail));
