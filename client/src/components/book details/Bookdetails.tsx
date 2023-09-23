import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";
import "../book details/bookdetails.css"

    interface IBook {
      title: string;
        id: string;
        authors: string;
        imageLinks: {
          thumbnail: string
        };
        description: string;
        publisher: string;
        publishedDate: string;
    }

    interface IBookResponse {
        data: IBook[];
        book: any
    }

function BookDetails () {

    const { getToken, logout } = useContext(AccessTokenContext);
    const location = useLocation();
    const bookId: string = location.state?.bookId;

    const [errorMessage, setErrorMessage] = useState("");
    const [displaySuccess, setDisplaySuccess] = useState(false); 
    const [bookDetails, setBookDetails] = useState<IBook[]>([]);
    const [shelfKey, setShelfKey] = useState("");
   

// Get book data/ details
    const getBookDetails = useCallback(async (bookId: string) => {
        try {
          const response = await axios.request<IBookResponse>({
            method: "GET",
            url: `/api/book/${bookId}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          });
          setBookDetails([response.data.book])
        } catch (error) {
          console.error(error);
          setErrorMessage("Oh no! An unexpected error occurred.");
        }
      }, [getToken]);
    
      useEffect(() => {
        getBookDetails(bookId);
      }, [getBookDetails]);

   

// Add book to a Shelf
    const addToShelf = async (shelfKey: string, bookId: string) => {
      try {
        const response= await axios(`/api/bookshelf/${bookId}/${shelfKey}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,                    
          },   
        });
          displaySuccessMssg();
      } catch (error) {
          console.error(error);
          setErrorMessage("Oh no! An unexpected error occurred.");
      };
    }
      useEffect (() => {
          addToShelf(shelfKey, bookId);
      }, []);

      const displaySuccessMssg = () => {
        setDisplaySuccess(true)
      }
   

    return (
      <>
      <Navbar />
      {/* Book Info */}
        <div className="container">    
            <div className="bookdetails-container">
                {bookDetails && bookDetails.map((book: IBook) => {
                  return (
                    <div className="book-container">
                      <div className="details-container">
                        <div className="details-left">
                            <div className="img-container">
                              <img className="details-img" src={book.imageLinks.thumbnail} alt="thumbnail image of book covers" />
                              <div className="shelf-selector">
                                <h4>Add to Shelf:</h4>
                                <select id="dropdown" onChange={(e) => addToShelf(e.target.value, book.id)} >
                                  <option value="">Add to Shelf</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="read">Read</option>
                                </select>
                                {displaySuccess ? <p>✓ Added to shelf</p> : null}
                              </div>
                            </div>
                        </div>
                        <div className="details-right">
                        <h1>{book.title}</h1>
                          <h3>Author: {book.authors[0]}</h3>
                          <p>Description: {book.description}</p>
                          <p>Publisher: {book.publisher}</p>
                          <p>Published Date: {book.publishedDate}</p>
                        </div> 
                      </div>   
                    </div>
                  )
                })}              
            </div>      
        </div>
      {/* Footer */}
        <div className="footer">
          <button
            type="button"
            className="logout-btn"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </>
    );
}

export default BookDetails