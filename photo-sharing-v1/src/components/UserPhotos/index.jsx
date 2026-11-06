import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ advancedFeatures, setAdvancedFeatures }) {
  const { userId, photoIndex } = useParams();
  const navigate = useNavigate();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  // If entering using a deep linked URL to an individual photo, auto-enable Advanced Features
  useEffect(() => {
    if (photoIndex !== undefined && !advancedFeatures && setAdvancedFeatures) {
      setAdvancedFeatures(true);
    }
  }, [photoIndex, advancedFeatures, setAdvancedFeatures]);

  if (!photos || photos.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No photos found for this user.
        </Typography>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/users/${userId}`}
          sx={{ mt: 2 }}
        >
          Back to User Profile
        </Button>
      </Box>
    );
  }

  // Parse current index for Stepper mode
  const parsedIndex = parseInt(photoIndex, 10);
  const currentIndex =
    Number.isNaN(parsedIndex) || parsedIndex < 0
      ? 0
      : Math.min(parsedIndex, photos.length - 1);

  const handleStep = (newIndex) => {
    navigate(`/photos/${userId}/${newIndex}`);
  };

  // Helper to render comments of a photo
  const renderComments = (photo) => (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        Comments ({photo.comments ? photo.comments.length : 0}):
      </Typography>

      {photo.comments && photo.comments.length > 0 ? (
        <List disablePadding>
          {photo.comments.map((comment) => (
            <ListItem
              key={comment._id}
              alignItems="flex-start"
              sx={{
                px: 1.5,
                py: 1,
                mb: 1,
                backgroundColor: "#fafafa",
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <RouterLink
                      to={`/users/${comment.user._id}`}
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        fontWeight: 600,
                      }}
                    >
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </RouterLink>
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(comment.date_time)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 0.5 }}
                  >
                    {comment.comment}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          No comments yet.
        </Typography>
      )}
    </>
  );

  // ==========================================
  // MODE 1: STEPPER VIEW (ADVANCED FEATURES ON)
  // ==========================================
  if (advancedFeatures) {
    const currentPhoto = photos[currentIndex];

    return (
      <Box sx={{ maxWidth: 800, margin: "auto", py: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {user ? `Photos of ${user.first_name} ${user.last_name}` : "User Photos"}
          </Typography>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/users/${userId}`}
            size="small"
          >
            Back to Profile
          </Button>
        </Box>

        {/* Stepper Navigation Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            p: 1.5,
            backgroundColor: "#f5f5f5",
            borderRadius: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={currentIndex <= 0}
            onClick={() => handleStep(currentIndex - 1)}
          >
            Previous
          </Button>

          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Photo {currentIndex + 1} of {photos.length}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            disabled={currentIndex >= photos.length - 1}
            onClick={() => handleStep(currentIndex + 1)}
          >
            Next
          </Button>
        </Box>

        {/* Single Photo Display */}
        <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={require(`../../images/${currentPhoto.file_name}`)}
            alt={`Photo ${currentIndex + 1} by ${user?.first_name || "user"}`}
            sx={{
              maxHeight: 520,
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Posted on: {formatDateTime(currentPhoto.date_time)}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            {renderComments(currentPhoto)}
          </CardContent>
        </Card>
      </Box>
    );
  }

  // ==========================================
  // MODE 2: REGULAR VIEW (ADVANCED FEATURES OFF)
  // ==========================================
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", py: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {user ? `Photos of ${user.first_name} ${user.last_name}` : "User Photos"}
        </Typography>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/users/${userId}`}
          size="small"
        >
          Back to Profile
        </Button>
      </Box>

      {photos.map((photo) => (
        <Card key={photo._id} variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt={`Photo by ${user?.first_name || "user"}`}
            sx={{
              maxHeight: 500,
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Posted on: {formatDateTime(photo.date_time)}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            {renderComments(photo)}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
