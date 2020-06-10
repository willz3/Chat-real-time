import React from 'react';
import { MdSend } from 'react-icons/md'
import './styles.css'

const Chat = () => {



    return (
        <div id="chat">
            <ul class="content">
                <li className="message message-out">
                    <p>
                        <span className="text-message">Hello!</span> <br />
                        <span className="hour-message">21:43</span>
                    </p>
                </li>
                <li className="message message-in">
                    <p>
                        <span className="text-message">Hey, what's up?</span> <br />
                        <span className="hour-message">21:43</span>
                    </p>
                </li>
            </ul>
            <form id="form-message" className="end">
                <input type="text"
                    placeholder="Type a message" />
                <MdSend size={22} id="button-message-submit" />
            </form>
        </div>
    )
}

export default Chat;