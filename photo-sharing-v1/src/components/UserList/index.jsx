import React from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const users = models.userListModel();
  const location = useLocation();

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, px: 2, pt: 1 }}>
        Users
      </Typography>
      <List component="nav" disablePadding>
        {users.map((item) => {
          const isSelected =
            location.pathname === `/users/${item._id}` ||
            location.pathname === `/photos/${item._id}`;
          return (
            <React.Fragment key={item._id}>
              <ListItemButton
                component={Link}
                to={`/users/${item._id}`}
                selected={isSelected}
              >
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                  secondary={item.occupation}
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default UserList;
