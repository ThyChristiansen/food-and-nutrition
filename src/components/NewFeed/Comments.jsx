import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
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
import DisplayEditAndDelete from "./DisplayEditAndDelete";
const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginBottom: "10px",
    marginTop: "5px",
  },
  cardAction: {
    marginLeft: "5px",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paperComment: {
    marginBottom: "10px",
    marginTop: "-7px",
  },
});

const Comment = (props) => {
  const { classes, post, comment, user } = props;
  const [countTime, setCountTime] = useState(
    moment.utc(comment.time).fromNow()
  );
  const [commentEditText, setCommentEditText] = useState(comment.content);
  const [openEditComment, setOpenEditComment] = useState(false);

  setInterval(function () {
    setCountTime(moment.utc(comment.time).fromNow());
  }, 10000);

  const handleEditCommentOnChange = (e) => {
    setCommentEditText(e.target.value);
  };

  const handleSaveComment = (e) => {
    props.dispatch({
      type: "EDIT_COMMENT",
      payload: {
        id: comment.id,
        content: commentEditText,
      },
    });
    setOpenEditComment(false);
  };

  return (
    <>
      <Divider />

      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
        }
        action={
          <DisplayEditAndDelete
            userId={user.id}
            type={"comment"}
            postOrCommentUserId={comment.users_who_commented_id}
            setEditComment={setOpenEditComment}
          />
        }
        title={comment.name}
        subheader={countTime}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        {openEditComment ? (
          <>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              value={commentEditText}
              variant="outlined"
              fullWidth
              onChange={handleEditCommentOnChange}
            />
            <Button onClick={handleSaveComment}>Save</Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="textSecondary" component="p">
              {comment.content}
            </Typography>
          </>
        )}
      </CardContent>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(useStyles)(Comment));
