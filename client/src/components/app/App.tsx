import { AccessTokenProvider } from "../../contexts/AccessTokenContext";
import Router from "../routing/Router";
import './App.css';

function App() {
 
  return (
    <AccessTokenProvider>
      <Router />
    </AccessTokenProvider>   
  );
};

export default App;
