import React, { useEffect, useState } from "react";
import { Render } from "@react-fullstack/render";
import { Server } from "@react-fullstack/fullstack-socket-server";
import { Views, ViewsInterface } from "@whatsapp-deluxe/shared";
import ChatList from "./components/ChatList";
import ChatView from './components/ChatView';
import dotenv from "dotenv";
import API from "./api";
import { ViewsProvider } from "@react-fullstack/fullstack";
dotenv.config();

const initializeApp = async () => {
  API.initialize(); // TO DO: Pass session

  Render(
    <Server port={5000} singleInstance views={Views}>
      {() => <App />}
    </Server>
  );
};

const App = () => {
  const [activeChat, setActiveChat] = useState('')
  const [isInitialized, setIsInitialized] = useState(API.isInitialized)
    useEffect(() => {
        API.emitter.on("initialize", (currentIsInitialized) => {
            setIsInitialized(currentIsInitialized);
        })
    }, [])
    
  return isInitialized ? <ViewsProvider<ViewsInterface>>
    {({ WhatsAppProvider }) => <WhatsAppProvider>
      <ChatList setChatId={(id) => {setActiveChat(id)}} /><ChatView chatId={activeChat} />
      </WhatsAppProvider>

    }
  </ViewsProvider> : <></>;
};

initializeApp();
