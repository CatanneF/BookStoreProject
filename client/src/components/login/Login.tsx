import { useState, FormEvent, useContext } from "react";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import "./login.css"


function Login() {
   
    const navigate = useNavigate();
    const { login } = useContext(AccessTokenContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const [token, setToken] = useContext(AccessTokenContext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
          const response = await axios.request({
            method: "POST",
            url: "/api/signin",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username,
              password,
            },
          });
          /**
           * If login is successful,
           * getting the JWT token and expiry time from the response
           */
          const { token } = response.data;
          console.log(token)
          if (!token) throw Error("Missing JWT token");
          login(token);
          navigate("/bookshelf", { replace: true, state: {username: username} });
        } catch (error) {
          console.error(error);
          /**
           * If the response returns an HTTP status of 401 when loggin in, this means that username or password is incorrect
           */
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            setErrorMessage("Invalid username or password");
          } else setErrorMessage("We are sorry, unexpected error occurred.");
          setIsLoading(false);
        }
      };

   

        return (
            <div className="signinContainer">
              <h1>Login to your account</h1>
              <div className="login-container">
                <form className="login-form" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                                Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}                       
                        />
                    </div>
                    <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <button type="submit" className="btn btn-login" disabled={isLoading}>
                        Login
                    </button>  
                </form>
                <p className="form-text">
                    <small>
                        The username is <em> hermione</em> and the password is <em> granger</em>
                    </small>
                </p>
                {isLoading && <p>Loading ...</p>}
                    {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
              </div>
            </div>   
        );
    
};

export default Login;







 // const signin = async () => {
    //     setErrorMessage("");
    //     setIsLoading(true);

    //     try {
    //         const data = await axios(`/api/signin`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",             
    //             },
    //             data: {
    //                 username,
    //                 password,
    //             },
    //         });
    //         if(!data.data.token) {
    //             throw new Error("Missing token from the response")
    //         }
    //         console.log(data.data.token)
    //         setToken(data.data.token); 
    //         login(token);
    //         setIsLoggedIn(true);
    //         navigate("/bookshelf");
            
    //     }catch (error) {
    //         console.error(error);
    //         if (axios.isAxiosError(error) && error.response?.status === 401) {
    //             setPassword("");
    //             setErrorMessage("Invalid username or password");
    //         } else {
    //             console.error(error);
    //             setErrorMessage("We're sorry, an unexpected error has occured");
    //             setPassword(""); 
    //         };
    //         setIsLoading(false);
            
    //     };

        
    // };
    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     signin();
    // }