import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Container,Popover,Chip, List, ListItem, ListItemIcon,ListItemText,Divider } from '@material-ui/core';
// import {MoreVertIcon,ShareIcon} from '@material-ui/icons';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
});

class RecipeDetail extends Component {
  state = {
    anchorEl: '',
    open: false,
  }
  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    })
    console.log('clicked')
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
  };
  ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  render() {

    const { classes } = this.props;

    const id = this.state.open ? 'simple-popover' : undefined;
    return (
      <Container maxWidth="md">
        {this.props.recipe.map((item) => {
          return (<>
            <Card className={classes.root}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon aria-describedby={id}
                      onClick={this.handleOpen}
                    />
                    <Popover
                      id={id}
                      open={this.state.open}
                      anchorEl={this.state.anchorEl}
                      onClose={this.handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                          <ListItemIcon>
                            <FavoriteBorderIcon />

                          </ListItemIcon>
                          <ListItemText primary="Add to favorite" />
                        </ListItem>
                        <ListItem button>
                          <ListItemIcon>
                            <ShareIcon />
                          </ListItemIcon>
                          <ListItemText primary="Share" />
                        </ListItem>
                        <ListItem button>
                          <ListItemIcon>
                            <CalendarTodayIcon />
                          </ListItemIcon>
                          <ListItemText primary="Add to calender" />
                        </ListItem>
                      </List>
                      <Divider />
                    </Popover>
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
