import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({
  message,
  setMessage,
  selectedFile,
  setSelectedFile,
  sendMessage
}) {

  return (

    <Box sx={{ p: 2, bgcolor: "#1e1e1e" }}>

      {/* Selected File */}
      {selectedFile && (
        <Paper
          sx={{
            bgcolor: "#303030",
            color: "white",
            p: 1,
            mb: 1,
            width: "fit-content"
          }}
        >
          📎 {selectedFile.name}
        </Paper>
      )}

      {/* Input Area */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "flex-end",
          bgcolor: "#2d2d2d",
          borderRadius: 4,
          p: 1
        }}
      >

        {/* Attach Button */}
        <IconButton
          component="label"
          sx={{ color: "white" }}
        >
          <AttachFileIcon />

          <input
            hidden
            type="file"
            accept=".zip"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </IconButton>


        {/* Message Box */}
        <TextField
          multiline
          maxRows={6}
          fullWidth
          variant="standard"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }

          }}
          InputProps={{
            disableUnderline: true
          }}
          sx={{
            ml: 1,
            mr: 1,
            textarea: {
              color: "white"
            }
          }}
        />


        {/* Send Button */}
        <IconButton
          onClick={sendMessage}
          sx={{
            color: "#19c37d"
          }}
        >
          <SendIcon />
        </IconButton>

      </Paper>

      <Typography
        sx={{
          color: "#777",
          fontSize: 12,
          mt: 1,
          textAlign: "center"
        }}
      >
        Java Migration Assistant can make mistakes.
      </Typography>

    </Box>
  );
}

export default ChatInput;