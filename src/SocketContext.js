import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://video-chat-app-server.onrender.com/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getUserMedia();

    const peer = new Peer({ initiator: false, trickle: false, stream });
    connectionRef.current = peer;
    
    socket.on('me', (id) => setMe(id));
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    const username = sessionStorage.getItem('myMeetUser');
    if (!username && name) {
      sessionStorage.setItem('myMeetUser', name);
    } else if (username) {
      setName(username);
    }
  }, [name]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
        connectionRef.current.destroy();
      }
    window.location.reload();
  };

  const socketContextValue = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  };

  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
