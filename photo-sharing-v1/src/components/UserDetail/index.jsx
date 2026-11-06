import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return (
      <Typography variant="h6" color="error">
        User not found!
      </Typography>
    );
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 700, margin: "auto", mt: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          {`${user.first_name} ${user.last_name}`}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Occupation
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.occupation || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.location || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography
              variant="body1"
              component="div"
              dangerouslySetInnerHTML={{ __html: user.description || "" }}
              sx={{ fontStyle: "italic", mt: 0.5 }}
            />
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/photos/${user._id}`}
          >
            View Photos
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default UserDetail;
