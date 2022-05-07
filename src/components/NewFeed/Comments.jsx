import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  CardHeader,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";


import DisplayEditAndDelete from "../utils/DisplayEditAndDelete";
const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: "lightgray",
  },
  optionMenu:{
    display:"block",
    margin: "5px"
  }
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

  //   useEffect(()=>{
  //     setTimeout(() => {
  //         props.dispatch({
  //           type: "FETCH_COMMENT",
  //           payload: { postId: post.id },
  //         });
  //      }, 100);
  //   }, comment.id)

  const getComment = () => {
    console.log('iiiipost id', post.id)
    setTimeout(() => {
      props.dispatch({
        type: "FETCH_COMMENT",
        payload: { postId: post.id },
      });
    }, 100);
  };

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
    getComment();
  };

  const handleDeleteComment = () => {
    props.dispatch({
      type: "DELETE_COMMENT",
      payload: {
        id: comment.id,
      },
    });
    getComment();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>

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
              <Grid item xs={9}>
                <Typography variant="subtitle2">{comment.name}</Typography>
                <Typography variant="caption">
                  {comment.content.toString()}
                </Typography>
                {/* <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
                  title="Paella dish"
                /> */}
              </Grid>
              <Grid item xs={3} className={classes.optionMenu}>
                <CardHeader
                  action={
                    <>
                      <DisplayEditAndDelete
                        userId={user.id}
                        type={"comment"}
                        postOrCommentUserId={comment.users_who_commented_id}
                        setEditComment={setOpenEditComment}
                        handleDeleteComment={handleDeleteComment}
                      />
                      <Typography variant="caption" display="block">
                        {countTime}
                      </Typography>
                    </>
                  }
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(useStyles)(Comment));
