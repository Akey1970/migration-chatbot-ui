import {
  Box,
  Paper,
  Typography,
  Avatar
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

function MessageBubble({ msg }) {

  const isUser = msg.role === "user";

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 3
      }}
    >

      {!isUser && (
        <Avatar
          sx={{
            bgcolor: "#19c37d",
            mr: 1
          }}
        >
          <SmartToyIcon />
        </Avatar>
      )}

      <Paper
        elevation={3}
        sx={{
          bgcolor: isUser ? "#1976d2" : "#303030",
          color: "white",
          p: 2,
          borderRadius: 3,
          maxWidth: "70%"
        }}
      >

        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            color: "#bdbdbd"
          }}
        >
          {isUser ? "You" : "Java Migration Assistant"}
        </Typography>

        <Typography
          sx={{
            whiteSpace: "pre-wrap"
          }}
        >
          {msg.text}
        </Typography>

      </Paper>

      {isUser && (
        <Avatar
          sx={{
            bgcolor: "#1976d2",
            ml: 1
          }}
        >
          <PersonIcon />
        </Avatar>
      )}

    </Box>

  );
}

export default MessageBubble;