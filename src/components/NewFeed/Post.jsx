import React, { useState } from "react";
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
const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
});

const Post = (props) => {
  const [openListIcons, setOpenListIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { classes } = props;
  const id = openListIcons ? "simple-popover" : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenListIcons(true);
  };

  const handleClose = () => {
    setOpenListIcons(false);
    setAnchorEl(null);
  };

  return props.posts.map((post) => (
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
                <ListItem
                  button
                  //onClick={handleEditPost}
                >
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
        subheader={moment().startOf(post.date).fromNow()}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Paper>
  ));
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(Post));
