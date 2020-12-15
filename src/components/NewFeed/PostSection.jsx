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
import Post from "./Post";
const moment = require("moment");

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

class PostSection extends Component {
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

  handleEditPost = () => {};

  render() {
    const { classes, posts } = this.props;

    return (
      <Grid item xs={6} className={classes.root}>
        
            <PostForm />
          
        <Post posts={posts} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.allPost,
});

export default connect(mapStateToProps)(withStyles(useStyles)(PostSection));
