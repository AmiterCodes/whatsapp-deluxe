import React, { useEffect, useState } from "react";
import { Render } from "@react-fullstack/render";
import { Server } from "@react-fullstack/fullstack-socket-server";
import { Views } from "@whatsapp-deluxe/shared";
import ChatList from "./components/ChatList";
import dotenv from "dotenv";
import API from "./api";
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
    const [isInitialized, setIsInitialized] = useState(API.isInitialized)
    useEffect(() => {
        API.emitter.on("initialize", (currentIsInitialized) => {
            setIsInitialized(currentIsInitialized);
        })
    }, [])
  return isInitialized ? <ChatList setChatId={() => {}} /> : <></>;
};

initializeApp();
