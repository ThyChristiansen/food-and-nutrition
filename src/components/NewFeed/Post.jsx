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
import PersonIcon from "@material-ui/icons/Person";
import { SimpleDialog } from "./UsersWhoLikedDialog";
const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginBottom: "10px",
  },
});

const Post = (props) => {
  const { classes, post, user } = props;

  const [openListIcons, setOpenListIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countTime, setCountTime] = useState(
    moment.utc(props.post.time).fromNow()
  );
  const [editPost, setEditPost] = useState(false);
  const [contentPost, setContentPost] = useState(post.content);
  const [liked, setLiked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = openListIcons ? "simple-popover" : undefined;

  useEffect(() => {
    if (post.users_who_liked_array === null) {
      setLiked(
        <IconButton>
          <FavoriteIcon color="secondary" />
        </IconButton>
      );
    } else if (
      post.users_who_liked_array &&
      post.users_who_liked_array.indexOf(user.name) === -1
    ) {
      setLiked(
        <IconButton>
          <FavoriteIcon color="secondary" />
        </IconButton>
      );
    } else {
      setLiked(
        <IconButton>
          <FavoriteIcon color="primary" />
        </IconButton>
      );
    }
  }, [post.users_who_liked_array]);

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

  //-----------------displayEditAndDeleteForPostOwner-----------------
  let displayEditAndDeleteForPostOwner;
  user.id === post.user_id
    ? (displayEditAndDeleteForPostOwner = (
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
              <ListItem button onClick={handleDeletePost}>
                {/* <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon> */}
                <ListItemText primary="Delete" />
              </ListItem>
            </List>
          </Popover>
        </IconButton>
      ))
    : (displayEditAndDeleteForPostOwner = "");
  //-----------------displayEditAndDeleteForPostOwner-----------------

  const handleLikeButton = () => {
    if (post.users_who_liked_array === null) {
      props.dispatch({
        type: "LIKE",
        payload: {
          id: post.id,
          userWhoLiked: user.id,
        },
      });
    } else if (
      post.users_who_liked_array &&
      post.users_who_liked_array.indexOf(user.name) === -1
    ) {
      console.log(user.name, " doesn't liked");
      props.dispatch({
        type: "LIKE",
        payload: {
          id: post.id,
          userWhoLiked: user.id,
        },
      });
    } else {
      console.log(user.name, " liked");
      props.dispatch({
        type: "UNLIKE",
        payload: {
          post_id: post.id,
          user_id: user.id,
        },
      });
    }
  };

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (value) => {
    setDialogOpen(false);
    // setSelectedValue(value);
  };
  return (
    <Paper className={classes.paper}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        }
        action={displayEditAndDeleteForPostOwner}
        title={post.name}
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
        <p onClick={handleClickDialogOpen}>
          {post.users_who_liked_array && post.users_who_liked_array.length}
        </p>
        {/* <p>
          {post.users_who_liked_array && post.users_who_liked_array.join(",")}
        </p> */}
        <SimpleDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          usersWhoLiked={post.users_who_liked_array}
        />
        <div onClick={() => handleLikeButton()}>{liked}</div>
        <Button>Comment</Button>
      </CardActions>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(useStyles)(Post));
