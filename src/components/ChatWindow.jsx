import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";

function ChatWindow() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

const sendMessage = async () => {

  if (!message.trim() && !selectedFile) {
    return;
  }

  const userMessage =
    (message ? message : "") +
    (selectedFile ? "\n📎 " + selectedFile.name : "");

  // Show user message immediately
  setMessages(prev => [
    ...prev,
    {
      role: "user",
      text: userMessage
    }
  ]);

  const formData = new FormData();

  if (message) {
    formData.append("message", message);
  }

  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  try {

    // ===== SPRING BOOT API =====
    const response = await axios.post(
    "http://localhost:8080/department/chat",
    formData
);
    // ===========================

    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        text: response.data
      }
    ]);

  } catch (error) {

    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        text: "Error calling backend."
      }
    ]);

    console.error(error);
  }

  setMessage("");
  setSelectedFile(null);
};


  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          bgcolor: "#171717",
          color: "white",
          p: 2
        }}
      >

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          fullWidth
          sx={{
            color: "white",
            borderColor: "#444"
          }}
        >
          New Chat
        </Button>

        <Typography sx={{ mt: 4, mb: 2 }}>
          Chat History
        </Typography>

        <List>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Java8 Migration" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Spring Upgrade" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Dependency Fixes" />
            </ListItemButton>
          </ListItem>

        </List>

      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#1e1e1e",
          p: 3,
          display: "flex",
          flexDirection: "column"
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "white",
            mb: 3
          }}
        >
          Java Migration Assistant
        </Typography>

        <Paper
          sx={{
            flexGrow: 1,
            bgcolor: "#2d2d2d",
            p: 2,
            overflowY: "auto"
          }}
        >

          {messages.map((msg, index) => (

            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",
                mb: 2
              }}
            >

            <Paper
  sx={{
    p: 2,
    bgcolor:
      msg.role === "user"
        ? "#1976d2"
        : "#424242",
    color: "white",
    maxWidth: "60%"
  }}
>
                {msg.text}
              </Paper>

            </Box>

          ))}

        </Paper>




<Box
  sx={{
    display: "flex",
    alignItems: "center",
    mt: 2
  }}
>

  <Button
    component="label"
    variant="outlined"
    startIcon={<CloudUploadIcon />}
    sx={{ mr: 2 }}
  >
    Attach

    <input
      hidden
      type="file"
      accept=".zip"
      onChange={(e) => setSelectedFile(e.target.files[0])}
    />
  </Button>

  {selectedFile && (
    <Paper
      sx={{
        bgcolor: "#424242",
        color: "white",
        p: 1,
        mr: 2
      }}
    >
      📎 {selectedFile.name}
    </Paper>
  )}

  <TextField
    fullWidth
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Ask something..."
    sx={{
      input: {
        color: "white"
      }
    }}
  />

<Button
  variant="contained"
  sx={{ ml: 2 }}
  onClick={sendMessage}
>
  Send
</Button>

</Box>     {/* closes input area */}

</Box>     {/* closes Main Chat Area */}

</Box>     

);
}

export default ChatWindow;