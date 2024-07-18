import { Divider } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import home from "./pages/homepage";
import chat from "./pages/chatpage";

function App() {
  return (
   <div>
    <Routes>
    <Route path="/" Component={home} />
    <Route path="/chats" Component={chat}/>
    </Routes>
   </div>
  );
}

export default App;
