import { useContext, useEffect, useState, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";
// import FileNotFound from "../FileNotFound";


    interface IBook {
        id: string;
        title: string;
        author: string;
        imageUrl: string;
        shelf: string
        description: string;
        publisher: string;
        publishedDate: string;
        imageLinks: {}[];
        thumbnail: string;
        [key: string]: string;
    }

    interface IBookResponse {
        data: IBook[];
      }


function BookDetails () {

    const { getToken, logout } = useContext(AccessTokenContext);
    // const {bookId } = useParams;
    // const book = books[bookId]

    const [errorMessage, setErrorMessage] = useState("");
    const [bookDetails, setBookDetails] = useState<IBook[]>([]);

// Get book data/ details
    const getBookDetails = useCallback(async () => {
        try {
          const response = await axios.request<IBookResponse>({
            method: "GET",
            url: "/api/book/:bookId",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          const books = response.data;
          setBookDetails(books);
        } catch (error) {
          console.error(error);
          setErrorMessage("Oh no! An unexpected error occurred.");
        }
      }, [getToken]);
    
      useEffect(() => {
        getBookDetails();
      }, [getBookDetails]);

// Add book to a Shelf
    //Get book id and shelf
    const changeShelf:IBookshelfResponse (e: ChangeEvent<HTMLSelectElement>, book) => {
        console.log(e);
        console.log(book)
        setShelfKey(e);
        setBookId(book.id)
        updateShelf(shelfKey, bookId);

    }

    // Request to change shelf
    const addToShelf = async (shelfKey, bookId) => {
        try {
        const response = await axios(`api/{bookId}/{shelfKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,                    
                },
            });
            console.log(response.data)
        }catch (error) {
        console.error(error);
        setErrorMessage("Oh no! An unexpected error occurred.");
        };
    };

    

    return (
        <div className="container">
            <Navbar />
            <div className="details-container">
                {/* bookDetails.map(book) => { */}
                <div className="book-img">
                    <img src="" alt="" />
                </div>
                <div className="book-details">
                    <h2>`${book.title}`</h2>
                    <h3>`Author: ${book.authors}`</h3>
                    <p>`Description: ${bookDetails.description}`</p>
                    <p>`Publisher: ${bookDetails.publisher}`</p>
                    <p>`Published Date: ${bookDetails.publishedDate}`</p>
                </div>
                <div className="shelf-selector">
                      <select id="dropdown" type="text" value={shelf} onChange={(e) => addToShelf(e.target.value, book)} >
                        <option value="wantToRead"></option>
                        <option value="currentlyReading"></option>
                        <option value="read"></option>
                      </select>
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
        </div>
    );
}

export default BookDetails