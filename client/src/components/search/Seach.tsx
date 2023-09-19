import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import Navbar from "../navbar/Navbar"
import axios from "axios"
import { AccessTokenContext } from "../../contexts/AccessTokenContext"
import { IBookshelf, IBookshelfResponse } from "../bookshelf/Bookshelf"

function Search () {

    const { logout } = useContext(AccessTokenContext);

    // const location = useLocation();
    // const bookResults = location.bookResults 
    return (
        <>
            <Navbar />
            <div className="book-container">
                    <div className="book-img">
                      <Link to={`/book/${book.id}`} className="bookLink">
                        <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
                      </Link>
                    </div>
                      
                    <div className="book-details">
                      <Link to={`/book/${book.id}`} className="bookLink">
                        <h3>`${book.title}`</h3>
                      </Link>
                      <p>`${book.author}`</p>
                    </div>
            </div>
            <div className="footer">
                <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>
        </>
    );
};

export default Search;