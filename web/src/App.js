import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './pages/Chat'
import Home from './pages/Home'

const App = () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
    </Router>
)

export default App;
