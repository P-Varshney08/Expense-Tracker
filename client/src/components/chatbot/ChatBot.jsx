import React, { useState } from 'react';
import './index.css';
function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { message: "Hey Alice is here !! 👋\nHow can I help you today?", role: "incoming" },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    if (!showChatbot) {
      document.body.classList.add('show-chatbot');
    } else {
      document.body.classList.remove('show-chatbot');
    }
  };

  const customQuestionsAndAnswers = [
    { keywords: ["hi", "hello", "hey","hy","How are you","how are u","can u help me","Can u help me","hy my name is","suno bhai mera naam" ,"suno"], answer: "How may I help you?" },
    { keywords: ["fever medicine", "today's weather"], answer: "The weather is sunny and warm today." },
    { keywords: ["paracetamol","govind"], answer: "Paracetamol is a medicine used to treat mild to moderate pain. Paracetamol can also be used to treat fever (high temperature). It's dangerous to take more than the recommended dose of paracetamol. Paracetamol overdose can damage your liver and cause death." },
    { keywords: [" i am  suffering from fever"], answer: "tell me about your problem" },
    { keywords: ["99-103"], answer: "drink plenty of water" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    { keywords: ["joke","govind"], answer: "Why did the chicken cross the road? To get to the other side!" },
    // Add more keyword-answer pairs as needed
  ];

  const handleChat = () => {
    let message = userMessage.trim();
    if (!message) return;

    const updatedChatHistory = [...chatHistory, { message, role: "outgoing" }];
    setChatHistory(updatedChatHistory);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      let answerMessage = "I'm sorry, I don't have an answer to that.";

      customQuestionsAndAnswers.forEach(item => {
        if (item.keywords.some(keyword => message.toLowerCase().includes(keyword))) {
          answerMessage = item.answer;
        }
      });

      const updatedChatHistoryWithAnswer = [...updatedChatHistory, { message: answerMessage, role: "incoming" }];
      setChatHistory(updatedChatHistoryWithAnswer);

      // Clear the user input field
      setUserMessage('');
    }, 2000); // Adjust the delay time as needed (2 seconds in this example)
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  };


  return (
    <div>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">Bot</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={`chatbot ${showChatbot ? '' : 'hidden'}`}>
        <ul className="chatbox">
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
