import React from 'react';
import { ViewsProvider } from '@react-fullstack/fullstack'
import { Render } from '@react-fullstack/render'
import { Server } from '@react-fullstack/fullstack-socket-server'
import { ViewsInterface, Views } from '@whatsapp-deluxe/shared';
import ChatList from './components/ChatList'
import dotenv from 'dotenv'
import API from './api'
dotenv.config()


const intilizedApp = async () => {
    API.intialize() // TO DO: Pass session
    
    Render(<Server port={9494} singleInstance views={Views}>
        {() => <App />}
    </Server>)
}


class App extends React.Component {
    render() {
    return <ChatList setChatId={() => {}} />
    }
}

intilizedApp();