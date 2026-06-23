import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function Sidebar({ newChat }) {

  return (

    <Box
      sx={{
        width: 250,
        bgcolor: "#171717",
        color: "white",
        p: 2
      }}
    >

     <Button
  fullWidth
  startIcon={<AddIcon />}
  variant="outlined"
  onClick={newChat}
  sx={{
    color: "white",
    borderColor: "#555",
    borderRadius: 3,
    textTransform: "none",
    "&:hover": {
      borderColor: "#888",
      bgcolor: "#2d2d2d"
    }
  }}
>
  New Chat
</Button>

      <Typography sx={{ mt: 4 }}>
        Chat History
      </Typography>

      <List>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Java8 Migration" />
          </ListItemButton>
        </ListItem>

      </List>

    </Box>

  );
}

export default Sidebar;