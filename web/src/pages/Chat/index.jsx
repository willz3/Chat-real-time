import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';
import { MdSend } from 'react-icons/md';
import './styles.css'

import DateUtil from '../../utils/DateUtil';

const socket = io('http://localhost:3333');
const myId = uuid();

socket.on('connect', () => {
    console.log('Novo usuário conectado');
})

const Chat = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('entrei no useEffect');
        socket.on('receivedMessage', function (newMessage) {
            console.log('entrei no receivedMessage');
            console.log(newMessage);
            setMessages([...messages, newMessage]);
        });
    }, [messages])

    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if(message.trim()){
            let dateNow = new Date();

            let messageObject = {
                id: myId,
                message,
                date: DateUtil.newDateMessage(dateNow),
                hour: DateUtil.newHourMessage(dateNow)
            }

            socket.emit('sendMessage', messageObject);
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
                            <span className="hour-message">{men.hour}</span>
                        </p>
                    </li>
                ))}
            </ul>
            <form id="form-message" className="end" onSubmit={handleFormSubmit}>
                <input type="text"
                    onChange={handleInputChange}
                    placeholder="Type a message"
                    value={message} />
                <MdSend size={22} id="button-message-submit" onClick={handleFormSubmit}/>
            </form>
        </div>
    )
}

export default Chat;