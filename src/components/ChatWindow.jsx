import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

import Sidebar from "./Sidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatWindow() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const sendMessage = async () => {

    if (!message.trim() && !selectedFile) {
      return;
    }

    // Add user message immediately
    const userMessage =
      message +
      (selectedFile ? "\n📎 " + selectedFile.name : "");

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

      const response = await axios.post(
        "http://localhost:8080/department/chat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

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

  const newChat = () => {

  setMessages([]);
  setMessage("");
  setSelectedFile(null);

};

  return (

    <Box sx={{ display: "flex", height: "100vh" }}>

      {/* Left Sidebar */}
      <Sidebar newChat={newChat} />

      {/* Right Chat Area */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#212121",
          display: "flex",
          flexDirection: "column"
        }}
      >

        {/* Messages */}
        <ChatMessages messages={messages} />

        {/* Bottom Input */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          sendMessage={sendMessage}
        />

      </Box>

    </Box>

  );
}

export default ChatWindow;