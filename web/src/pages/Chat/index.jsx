import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';
import { MdSend } from 'react-icons/md';
import './styles.css'

import DateUtil from '../../utils/DateUtil';

let socket;
const myId = uuid();

const Chat = ({ location }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('');
    const room = 'uniqueRoom';

    const ENDPOINT = 'http://localhost:3333';

    useEffect(() => {
        const { nickname } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setNickname(nickname);
        
        socket.emit('join', { nickname, room }, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            console.log(newMessage);
            setMessages([...messages, newMessage]);
        });
    }, [messages])

    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if( message.trim()){
            let dateNow = new Date();

            let data = {
                user: nickname,
                message,
                date: DateUtil.newDateMessage(dateNow),
                hour: DateUtil.newHourMessage(dateNow)
            }

            socket.emit('sendMessage', data);
            setMessage('');
        }
    }

    return (
        <div id="chat">
            <ul className="content">
                {messages.map((men, index) => (
                    <li className={`message message-${men.user === nickname ? 'out' : 'in'}`} key={index}>
                        <p>{men.user}</p>
                        <p className="text-message">{men.message}</p>
                        <p className="hour-message">{men.hour}</p>
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