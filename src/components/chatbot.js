import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  // Reference for the messages div
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    // Add user message to the chat
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    // Show loader
    setLoading(true);

    // Simulate a delay (e.g., 1 second)
    setTimeout(async () => {
      // Make the API request
      const response = await axios.post(
        "https://mlm-back.onrender.com/api/chatbot/chat",
        { message: userInput }
      );

      // Hide loader and add bot's response to the chat
      setLoading(false);
      setMessages([
        ...newMessages,
        { sender: "bot", text: response.data.reply },
      ]);

      // Clear the input field
      setUserInput("");
    }, 1000); // 1-second delay
  };

  // Scroll to the bottom of the messages div when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.length === 0 ? (
          <div className="no-messages">Hi! How can I help you?</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))
        )}
        {loading && <div className="message bot"><img width={'50px'} height={'40px'} src="/images/chatbot_icon.gif"/></div>} {/* Loader */}
        {/* This div will act as the anchor to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={userInput}
        className="chatbot-input"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="chatbot-button"
        onClick={sendMessage}
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
