// import Search from "../search/Seach";
import "./navbar.css"
import axios from "axios";
import { useState, useContext, useEffect, FormEvent } from "react"
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import { IBookshelf, IBookshelfResponse } from "../bookshelf/Bookshelf";


function Navbar() {
    const { getToken, logout } = useContext(AccessTokenContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams({ book: "" })
    const bookTitle: string | null = searchParams.get("bookTitle");
    const [bookDetails, setBookDetails] = useState([{}]);
    const navigate = useNavigate;

    // const whitespaceRemoved = str.replace(/\s/g, '+');
    const getBookTitle = (book: string) => {
        book = book.replace(/\s/g, '+')   
    };
    
    const fetchBookSearch = async (bookTitle: string) => {
        try {
        const response = await axios<IBookshelfResponse>(`/api/search/${bookTitle}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,                    
                },
               
            });
            console.log(response.data)
            // navigate("/search", {state: {bookResults: bookDetails}});
        }catch (error) {
        console.error(error);
        setErrorMessage("Oh no! An unexpected error occurred.");
        };
    };

const handleBookSearch = (e: FormEvent) => {
    e.preventDefault()
    // fetchBookSearch();
}  
        
        
    

    return( 
        <div className="container-nav">
        <nav>
            <div className="link-nav">
                <NavLink to="/bookshelf">My Bookshelf</NavLink>
            </div>
            <div className="link-nav">
                 <form className="nav-searchbar" method="" onSubmit={handleBookSearch}> 
                    <input placeholder="Search for book by title" type="text" value={} onChange={(e) => getBookTitle({book: e.target.value})}/>
                    <button type="submit" className="nav-btn">Search</button>   
                </form>   
            </div>
        </nav>
            
        </div>

    )
};

export default Navbar