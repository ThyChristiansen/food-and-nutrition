import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import PostForm from "./PostForm";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: "10px",
  },
  name: {
    padding: theme.spacing(1),
  },
});

class Posts extends Component {
  state = {
    newPostText: "",
    image: "",
    openListIcons: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_ALL_POSTS",
    });
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      openListIcons: true,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      openListIcons: false,
    });
  };
  handleEditPost =() =>{
    
  }

  render() {
    const { classes, posts } = this.props;
    const id = this.state.openListIcons ? "simple-popover" : undefined;

    return (
      <Grid item xs={6} className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <PostForm />
          </Grid>
        </Paper>

        {posts.map((post) => (
          <Paper className={classes.paper}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        aria-describedby={id}
                        onClick={this.handleOpen}
                      />
                      <Popover
                        id={id}
                        open={this.state.openListIcons}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <List component="nav" aria-label="main mailbox folders">
                          <ListItem button onClick={this.handleEditPost}>
                            {/* <ListItemIcon>
                              <FavoriteBorderIcon />
                            </ListItemIcon> */}
                            <ListItemText primary="Edit" />
                          </ListItem>
                          
                        </List>
                        <Divider />
                      </Popover>
                    </IconButton>
                  }
                  title={post.name}
                  subheader={post.date}
                />
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
          </Paper>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.allPost,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Posts));
