import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
});

const Post = (props) => {
  const { classes, post } = props;

  const [openListIcons, setOpenListIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countTime, setCountTime] = useState(
    moment.utc(props.post.time).fromNow()
  );
  const [editPost, setEditPost] = useState(false);
  const [contentPost, setContentPost] = useState(post.content);
  const id = openListIcons ? "simple-popover" : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenListIcons(true);
  };

  const handleClose = () => {
    setOpenListIcons(false);
    setAnchorEl(null);
  };

  setInterval(function () {
    setCountTime(moment.utc(props.post.time).fromNow());
  }, 10000);

  const handleOpenEditPost = () => {
    setEditPost(true);
    setOpenListIcons(false);
  };

  const handlePostOnChange = (e) => {
    setContentPost(e.target.value);
  };

  const handleSavePost = (e) => {
    console.log(post);
    props.dispatch({
      type: "EDIT_POST",
      payload: {
        id: post.id,
        content: contentPost,
      },
    });
    setEditPost(false);
  };

  const handleDeletePost = (e) => {
    console.log(post);
    props.dispatch({
      type: "DELETE_POST",
      payload: {
        id: post.id,
      },
    });
    setEditPost(false);
  };
  return (
    <Paper className={classes.paper}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon aria-describedby={id} onClick={handleOpen} />
            <Popover
              id={id}
              open={openListIcons}
              anchorEl={anchorEl}
              onClose={handleClose}
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
                <ListItem button onClick={handleOpenEditPost}>
                  {/* <ListItemIcon>
                            <FavoriteBorderIcon />
                          </ListItemIcon> */}
                  <ListItemText primary="Edit" />
                </ListItem>
                <ListItem
                  button
                  onClick={handleDeletePost}
                >
                  {/* <ListItemIcon>
                            <FavoriteBorderIcon />
                          </ListItemIcon> */}
                  <ListItemText primary="Delete" />
                </ListItem>
              </List>
            </Popover>
          </IconButton>
        }
        title={props.post.name ? props.post.name : props.post.email}
        subheader={countTime}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        {editPost ? (
          <>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              value={contentPost}
              variant="outlined"
              fullWidth
              onChange={handlePostOnChange}
            />
            <Button onClick={handleSavePost}>Save</Button>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Paper>
  );
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(Post));
