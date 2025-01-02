import React from "react";
import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";

function CommentView({ customer, isOpen, onClose }) {
  if (!customer) return null; // Prevent rendering if no customer is selected

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format("MM/DD/YYYY") : "N/A";
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#3f51b5", color: "#fff", textAlign: "center" }}>
        <Typography variant="h6">Comments</Typography>
      </DialogTitle>

      {/* Dialog Content to display customer details */}
      <DialogContent>
        <Grid container spacing={2}>
          {/* Displaying customer name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong> Chair Person Comment:</strong> {customer.chair_comment} {customer.lastName}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong> Chair Person Approval:</strong> {customer.chair_approval} {customer.lastName}</Typography>
          </Grid>


         

          

        </Grid>

        {/* Divider for better separation of content */}
        <Divider sx={{ margin: "16px 0" }} />

      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} color="primary" variant="contained" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentView;
