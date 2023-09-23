import "./navbar.css"
import axios from "axios";
import { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";


function Navbar() {
    const { getToken } = useContext(AccessTokenContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const getBookTitle = (book: any) => {
        console.log(book)
        const bookName = book.replace(/\s/g, '+') 
        console.log(bookName)
        fetchBookSearch(bookName)  
    };
    
    const fetchBookSearch = async (bookTitle: string) => {
        try {
        const response = await axios(`/api/book/search/${bookTitle}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`,                    
            },   
        });
            navigate("/search", {state: {bookResults: response.data.books}});    
        } catch (error) {
            console.error(error);
            setErrorMessage("Oh no! An unexpected error occurred.");
        };
    };

    return( 
        <div className="container-nav">
            <nav>
                <div className="navA">
                    <NavLink to="/bookshelf" className="bookshelfLink">My Bookshelf</NavLink>
                </div>
                <div className="navB">
                    <p className="searchText">Search: </p>
                    <input className="search" placeholder="Search for book by title" type="text" onChange={(e) => getBookTitle(e.target.value)}/>      
                </div>
            </nav>   
        </div>
    )
};

export default Navbar