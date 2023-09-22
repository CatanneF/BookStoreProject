// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../routing/ProtectedRoute";
import { AccessTokenProvider } from "../../contexts/AccessTokenContext";
import Router from "../routing/Router";
// import { BrowserRouter } from "react-router-dom";

// import Login from "../login/Login";
// import Bookshelf from "../bookshelf/Bookshelf";
// import Bookdetails from "../book details/Bookdetails";
// import Search from "../search/Seach";
// import FileNotFound from "../FileNotFound";

import './App.css';


function App() {

  
  return (
    
      <AccessTokenProvider>
        <Router />
      </AccessTokenProvider>
    
  );
}

export default App;
