import React, { useState } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginBottom: "20px",
  },
});

const DisplayEditAndDelete = (props) => {
  const { userId, postOrCommentUserId } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openListIcons, setOpenListIcons] = useState(false);

  const id = openListIcons ? "simple-popover" : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenListIcons(true);
  };

  const handleClose = () => {
    setOpenListIcons(false);
    setAnchorEl(null);
  };

  const handleOpenEditPost = () => {
    props.setEditPost(true);
    setOpenListIcons(false);
  };

  const handleOpenEditComment = () => {
    props.setEditComment(true);
    setOpenListIcons(false);
  };

  let display;

  if (props.type === "post" && userId === postOrCommentUserId) {
    display = (
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
            <ListItem button onClick={props.handleDeletePost}>
              {/* <ListItemIcon>
                <FavoriteBorderIcon />
              </ListItemIcon> */}
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </Popover>
      </IconButton>
    );
  } else if (props.type === "comment" && props.postOrCommentUserId === userId) {
      console.log(true);
      display = (
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
              <ListItem button onClick={handleOpenEditComment}>
                {/* <ListItemIcon>
                          <FavoriteBorderIcon />
                        </ListItemIcon> */}
                <ListItemText primary="Edit" />
              </ListItem>
              <ListItem button onClick={props.handleDeletePost}>
                {/* <ListItemIcon>
                          <FavoriteBorderIcon />
                        </ListItemIcon> */}
                <ListItemText primary="Delete" />
              </ListItem>
            </List>
          </Popover>
        </IconButton>
      );
   
  } else {
    display = "";
  }
  return display;
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(DisplayEditAndDelete)
);
