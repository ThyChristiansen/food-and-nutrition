import React from "react";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

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
