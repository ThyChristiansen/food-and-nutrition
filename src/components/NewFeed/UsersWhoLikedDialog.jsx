import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export function SimpleDialog(props) {
  const classes = useStyles();

  const { onClose, selectedValue, open, usersWhoLiked } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="simple-dialog-title">Reactions</DialogTitle>
      <List>
        {usersWhoLiked &&
          usersWhoLiked.map((userName) => (
            <ListItem
              button
              onClick={() => handleListItemClick(userName)}
              key={userName}
            >
              <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              </ListItemAvatar>
              <ListItemText primary={userName} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}
