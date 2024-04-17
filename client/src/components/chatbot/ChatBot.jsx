import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { message: "Hey Alice is here!! 👋\nHow can I help you today?", role: "incoming" },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Create a ref to access the chatbox element
  const chatboxRef = useRef(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    if (!showChatbot) {
      document.body.classList.add('show-chatbot');
    } else {
      document.body.classList.remove('show-chatbot');
    }
  };

  const handleChat = async () => {
    const message = userMessage.trim();
    if (!message) return;

    // Add the user's message to the chat history
    const updatedChatHistory = [...chatHistory, { message, role: "outgoing" }];
    setChatHistory(updatedChatHistory);
    setIsThinking(true);

    try {
        // Make an HTTP POST request to the backend /send_msg endpoint using axios
        const response = await axios.post(`http://localhost:8080/api/chat/send_msg`, { msg: message });
        console.log(response)

  
        const updatedChatHistoryWithAnswer = [
            ...updatedChatHistory,
            { message: response.data.message, role: "incoming" },
        ];
        setChatHistory(updatedChatHistoryWithAnswer);

    } catch (error) {
        console.error('Error making HTTP request:', error);
    }

    // Reset thinking state and user message input
    setIsThinking(false);
    setUserMessage('');
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  // useEffect to scroll to the bottom of the chatbox when a new message is added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">Bot</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={`chatbot ${showChatbot ? '' : 'hidden'}`}>
        <ul className="chatbox" ref={chatboxRef}>
          {chatHistory.map((item, index) => (
            <li key={index} className={`chat ${item.role}`}>
              {item.role === 'incoming' && (
                <span className="material-symbols-outlined">smart_toy</span>
              )}
              <p>{item.message}</p>
            </li>
          ))}
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Enter a question..."
            spellCheck="false"
            required
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
            Send
          </span>
        </div>
        {isThinking && <p className="thinking-message">Thinking...</p>}
      </div>
    </div>
  );
}

export default Chatbot;
