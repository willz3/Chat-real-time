import React from 'react';
import './styles.css'

const Chat = () => (
    <div id="container">
        <ul>
            <li className="message message-out">
                <p>
                    <span className="text-message">Oi aaaaaaaaaaaaaaaaaaa</span> <br />
                    <span className="hour-message">21:43</span>
                </p>
            </li>
            <li className="message message-in">
                <p>
                    <span className="text-message">Oi, tudo bem?</span> <br />
                    <span className="hour-message">21:43</span>
                </p>
            </li>
        </ul>
    </div>
)

export default Chat;