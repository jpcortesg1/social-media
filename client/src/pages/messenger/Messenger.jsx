import { useContext, useState, useEffect, useRef } from "react";
import Topbar from "./../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import "./messenger.css";

export default function Messenger() {
  // Save all conversations of current user
  const [conversations, setConversations] = useState([]);
  // When change of conversation
  const [currentChat, setCurrentChat] = useState(null);
  // Save all messages of selected conversation
  const [messages, setMessagess] = useState([]);
  // Save the value of textarea
  const [newMessage, setNewMessage] = useState("");
  // Message of sender user
  const [arriveMessage, setArriveMessage] = useState(null);
  // To know the friend online
  const [onlineUsers, setOnlineUsers] = useState([]);

  // User of session
  const { user } = useContext(AuthContext);

  // Reference of new message
  const newMessage1 = useRef();
  // Socket
  const socket = useRef();
  // To referencer last message
  const scrollRef = useRef();

  // Connect with socket and receive new Message
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET);
    socket.current.on("getMessage", (data) => {
      setArriveMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Add message only in the correct conversation
  useEffect(() => {
    arriveMessage &&
      currentChat?.members.includes(arriveMessage.sender) &&
      setMessagess((prev) => [...prev, arriveMessage]);
  }, [arriveMessage, currentChat]);

  // Add current user and socketId to users in server socket
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  // Get all conversations of user in session
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/conversation/` + user._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);

  // Get messages of conversation selected
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/message/` + currentChat?._id
        );
        setMessagess(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // Save in db the new message and send message to receiver user
  const handleSubmit = async (e) => {
    // Create new message to save in db
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // Find the user that received the message
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    // Send to socket the request to show the new Message in the chat of receiver user
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    // Save message and update the messages in the screen
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/message`,
        message
      );
      setMessagess([...messages, res.data]); // Add new message to screen
      setNewMessage("");
      newMessage1.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  // Allways see the last message in the conversation
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message own={m.sender === user._id} message={m} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    ref={newMessage1}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline1">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
