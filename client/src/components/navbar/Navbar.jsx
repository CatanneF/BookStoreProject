// import Search from "../search/Seach";
import "./navbar.css"
import axios from "axios";
import { useState, useContext, useEffect, FormEvent } from "react"
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
// import { IBookshelf, IBookshelfResponse } from "../bookshelf/Bookshelf";


function Navbar() {
    const { getToken } = useContext(AccessTokenContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams({ book: "" })
    const bookTitle = searchParams.get("bookTitle");
    const bbookTitle = searchParams.get("bookTitle");
    const [bookDetails, setBookDetails] = useState([]);
    console.log(bookDetails)
    // const [bookDetails, setBookDetails] = useState<IBookshelf[]>([]);
    const navigate = useNavigate();

    // const whitespaceRemoved = str.replace(/\s/g, '+');
    const getBookTitle = (book) => {
        console.log(book)
        const bookName = book.replace(/\s/g, '+') 
        console.log(bookName)
        fetchBookSearch(bookName)  
    };
    
    const fetchBookSearch = async (bookTitle) => {
        try {
        const response = await axios(`/api/book/search/${bookTitle}`, {
            // const response = await axios<IBookshelfResponse>(`/api/search/${bookTitle}`, {
                method: "GET",
                headers: {
                
                    Authorization: `Bearer ${getToken()}`,                    
                },
               
            });
            
            navigate("/search", {state: {bookResults: response.data.books}});
            
        }catch (error) {
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
                    <input className="search" laceholder="Search for book by title" type="text" onChange={(e) => getBookTitle(e.target.value)}/>
                  
            </div>
        </nav>
            
        </div>

    )
};

export default Navbar