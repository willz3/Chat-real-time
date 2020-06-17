import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';
import { MdSend } from 'react-icons/md';
import './styles.css'

import DateUtil from '../../utils/DateUtil';

let socket;
const myId = uuid();

const Chat = ({ location }) => {
    const scrollBar = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState('');
    const room = 'uniqueRoom';

    const ENDPOINT = 'http://localhost:3333';

    useEffect(() => {
        console.log(scrollBar.current);
        console.log('PASSEEEEEI');

    }, [scrollBar]);

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
            setMessages((previousState) => {
                const oldMessages = [...previousState];
                oldMessages.push(newMessage);
                return oldMessages;
            });
        });
    }, []);

    useEffect(() => {
        const scrollHeight = scrollBar.current.scrollHeight - scrollBar.current.clientHeight;
        scrollBar.current.scrollTop = scrollHeight > 0 ? scrollHeight : 0;
    }, [messages]);

    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if(message.trim()){
            let dateNow = new Date();

            let data = {
                user: nickname,
                message,
                date: DateUtil.newDateMessage(dateNow),
                hour: DateUtil.newHourMessage(dateNow)
            }
            console.log(data);
            socket.emit('sendMessage', data);
            setMessage('');
        }
    }

    return (
        <div id="chat">
            <ul className="content" ref={scrollBar} onScroll={}>
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
                    <button type="submit">
                        <MdSend size={22} id="button-message-submit" />
                    </button>
            </form>
        </div>
    )
}

export default Chat;