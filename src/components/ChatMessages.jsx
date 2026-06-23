import { useEffect, useRef } from "react";
import {
  Box,
  Typography
} from "@mui/material";

import MessageBubble from "./MessageBubble";

function ChatMessages({ messages }) {

  const bottomRef = useRef(null);

  // Auto scroll when new message arrives
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (

    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        p: 3,
        bgcolor: "#1e1e1e"
      }}
    >

      {/* Welcome Screen */}
      {messages.length === 0 && (

        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white"
          }}
        >

          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 600
            }}
          >
            Java Migration Assistant
          </Typography>

          <Typography
            sx={{
              color: "#999"
            }}
          >
            Upload your Maven project and ask anything
          </Typography>

        </Box>

      )}

      {/* Chat Messages */}
      {messages.map((msg, index) => (

        <MessageBubble
          key={index}
          msg={msg}
        />

      ))}

      {/* Auto Scroll Target */}
      <div ref={bottomRef}></div>

    </Box>

  );
}

export default ChatMessages;