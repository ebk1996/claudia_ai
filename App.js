import React, { useState, useRef, useEffect } from 'react';

// The main App component for the chat interface.
const App = () => {
  // State to hold all the messages in the conversation.
  const [messages, setMessages] = useState([]);
  // State to hold the current user input.
  const [input, setInput] = useState('');
  // State to show a loading indicator while the AI is "typing".
  const [isLoading, setIsLoading] = useState(false);
  // Ref to automatically scroll to the latest message.
  const messagesEndRef = useRef(null);

  // UseEffect hook to scroll to the bottom of the chat window whenever messages update.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message.
  const handleSendMessage = async () => {
    // If the input is empty or the app is already loading, do nothing.
    if (input.trim() === '' || isLoading) {
      return;
    }

    // Create a new message object for the user's message.
    const userMessage = {
      text: input,
      sender: 'user',
    };

    // Add the user message to the messages state.
    setMessages(prevMessages => [...prevMessages, userMessage]);
    // Clear the input field.
    setInput('');
    // Set the loading state to true to show the AI is responding.
    setIsLoading(true);

    // This is the part where you would call your backend API.
    // Replace this placeholder with an actual fetch or axios call to your GraphQL endpoint.
    // Example:
    // try {
    //   const response = await fetch('/api/chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ message: input })
    //   });
    //   const data = await response.json();
    //   const aiResponse = { text: data.response, sender: 'ai' };
    //   setMessages(prevMessages => [...prevMessages, aiResponse]);
    // } catch (error) {
    //   console.error('Error fetching AI response:', error);
    //   const errorMessage = { text: 'Sorry, something went wrong.', sender: 'ai' };
    //   setMessages(prevMessages => [...prevMessages, errorMessage]);
    // } finally {
    //   setIsLoading(false);
    // }

    // --- Placeholder AI response simulation ---
    // Simulate a network delay with a setTimeout.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create a dummy AI response. You'll replace this with the actual response from your backend.
    const aiResponse = {
      text: `Hello there! You said: "${input}". This is a placeholder response. You'll connect your GraphQL backend here to get a real answer.`,
      sender: 'ai',
    };
    
    // Add the AI response to the messages state.
    setMessages(prevMessages => [...prevMessages, aiResponse]);
    // Set loading back to false.
    setIsLoading(false);
  };

  // Function to handle the Enter key press in the input field.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to scroll to the bottom of the message container.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 sm:p-6">
      <div className="flex flex-col w-full max-w-2xl h-[80vh] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Claude Clone (Frontend)
          </h1>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
          </div>
        </div>

        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-sm lg:max-w-md p-3 rounded-xl shadow-md ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* Loading indicator for AI response */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-light italic">Typing...</span>
                  <div className="dot-flashing"></div>
                </div>
              </div>
            </div>
          )}
          {/* This ref is used for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Area */}
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Message Claude..."
              className="flex-1 p-3 text-sm rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`p-3 rounded-xl text-white transition-colors duration-200 ${
                isLoading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.45-1.8a1 1 0 00.177-.07L10 12.02l2.67 1.335a1 1 0 00.781-.091l1.107-.741a1 1 0 00.32-1.554l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* CSS for the dot-flashing animation */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #9ca3af; /* Tailwind gray-400 */
          color: #9ca3af;
          animation: dot-flashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dark .dot-flashing {
          background-color: #d1d5db; /* Tailwind gray-300 */
          color: #d1d5db;
        }
        .dot-flashing::before,
        .dot-flashing::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #9ca3af;
          color: #9ca3af;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dark .dot-flashing::before {
          background-color: #d1d5db;
          color: #d1d5db;
        }
        .dot-flashing::after {
          left: 8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #9ca3af;
          color: #9ca3af;
          animation: dot-flashing 1s infinite alternate;
          animation-delay: 1s;
        }
        .dark .dot-flashing::after {
          background-color: #d1d5db;
          color: #d1d5db;
        }
        @keyframes dot-flashing {
          0% {
            background-color: #9ca3af;
          }
          50%,
          100% {
            background-color: rgba(156, 163, 175, 0.2);
          }
        }
        .dark @keyframes dot-flashing {
          0% {
            background-color: #d1d5db;
          }
          50%,
          100% {
            background-color: rgba(209, 213, 219, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
