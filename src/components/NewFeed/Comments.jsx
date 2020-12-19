import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Paper,
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
  //   root: {
  //     flexGrow: 1,
  //     overflow: "hidden",

  //     // margin: "3px 20px",
  //     // padding: "-10px",
  //     // border: "1px gray solid",
  //     borderRadius: "10px",
  //     backgroundColor: "lightgray",
  //     // display: "flex",
  //     // flexWrap: "wrap"
  //   },

  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor:"lightgray"
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

  const message = comment.content.toString()


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle2">{comment.name}</Typography>
            <Typography variant="caption">{message}</Typography>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            />
          </Grid>
          <Grid item xs={3}>
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
                <CardHeader
                  action={
                    <>
                      <DisplayEditAndDelete
                        userId={user.id}
                        type={"comment"}
                        postOrCommentUserId={comment.users_who_commented_id}
                        setEditComment={setOpenEditComment}
                      />
                      <Typography variant="caption" display="block">
                        {countTime}
                      </Typography>
                    </>
                  }
                />
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(useStyles)(Comment));
