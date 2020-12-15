import React, { useState } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, TextField } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
});

const PostForm = (props) => {
  const [text, setText] = useState("");
  const { classes } = props;
  const handleNewPostOnChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  const handleSubmitForm = () => {
    console.log(text);
    props.dispatch({
      type: "ADD_POST",
      payload: {
          text: text,
          time: new Date()
      },
    });
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={9}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              placeholder="What do you think?"
              variant="outlined"
              fullWidth
              onChange={handleNewPostOnChange}
            />
            <Button>Upload Image</Button>
                      </Grid>
          <Grid item xs={3}>
            <Button onClick={handleSubmitForm}>Post</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(PostForm));
