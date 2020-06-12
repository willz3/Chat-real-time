import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';
import { MdSend } from 'react-icons/md';
import './styles.css'

const socket = io('http://localhost:3333');
const myId = uuid();

socket.on('connect', () => {
    console.log('[IO] Connect -> New connection')
});

const Chat = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('entrou!')
        const handleNewMessage = newMessage => {
            setMessages([...messages, newMessage]); 
        }
        socket.on('chat.message', handleNewMessage);

        return () => socket.off('chat.message', handleNewMessage)
    }, [messages])

    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if(message.trim()){
            socket.emit('chat.message', {
                id: myId,
                message
            });
            setMessage('');
        }
    }

    return (
        <div id="chat">
            <ul className="content">
                {messages.map((men, index) => (
                    <li className={`message message-${men.id === myId ? 'out' : 'in'}`} key={index}>
                        <p>
                            <span className="text-message">
                                {men.message}</span> <br />
                            <span className="hour-message">21:44</span>
                        </p>
                    </li>
                ))}
            </ul>
            <form id="form-message" className="end" onSubmit={handleFormSubmit}>
                <input type="text"
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    value={message} />
                <MdSend size={22} id="button-message-submit" />
            </form>
        </div>
    )
}

export default Chat;