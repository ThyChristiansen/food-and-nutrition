import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import {
  Button,
  Grid,
  TextField,
} from "@mui/material";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  commentForm: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    textAlign: "center",
    padding: `${theme.spacing(1)}px auto`,
  },
});

const AddCommentForm = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.commentForm}>
        <Grid item xs={9}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={2}
            value={props.commentText}
            variant="outlined"
            fullWidth
            onChange={props.handleCommentOnChange}
            className={classes.commentForm}
            type="search"
            aria-label="Search"
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={props.handleAddComment}
            variant="contained"
            color="secondary"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyles(useStyles)(AddCommentForm));
