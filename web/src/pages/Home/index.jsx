import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
    const [nickName, setNickName] = useState('');
    const [room, setRoom] = useState('');

    function handleNicknameChanged(event){
        console.log(event.target.value)
        setNickName(event.target.value);
    }
    return (
        <div id="home">
            <div>
                <h1>Seja bem vindo!</h1>
                <h2></h2>
                <input type="text"
                    onChange={handleNicknameChanged}
                    placeholder="Digite um nome de usuário..." />
                <Link onClick={event => (!nickName) ? event.preventDefault() : null} to={`/chat?nickname=${nickName}`}>
                    <button type="submit" className="button">Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;