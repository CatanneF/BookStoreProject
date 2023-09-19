import { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";
import Navbar from "../navbar/Navbar";
// import Shelf from "../bookshelf/Shelf";

export interface IBookshelf {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    shelf: string
    [key: string]: string;
}
  
export interface IBookshelfResponse {
  [shelf: string]: IBookshelf[];
  data: IBookshelf[];
}


function Bookshelf () {
  
  const { getToken, logout } = useContext(AccessTokenContext);
  const [bookshelf, setBookshelf] = useState<IBookshelf[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shelfKey, setShelfKey] = useState("");
  const [bookId, setBookId] = useState("");
  const location = useLocation();
  const username = location.username;
    
  
    
// Get bookshelves
  const fetchBookshelf = useCallback(async () => {
        try {
            const response = await axios.request<IBookshelfResponse>({
                method: "GET",
                url: "/api/bookshelf",
                headers: {
                  Authorization: `Bearer ${getToken()}`,
                },
            }); 
            const getbookshelf = response.data.data;
            setBookshelf(getbookshelf)
            console.log(bookshelf);
          } catch (error) {
            console.error(error);
            setErrorMessage("Oh no! An unexpected error occurred.");
        };
    }, [getToken]);

      useEffect(() => {
        fetchBookshelf();
      }, [fetchBookshelf]);


// Change book to another shelf
    //Get book id and shelf
    const changeShelf:IBookshelfResponse (e: ChangeEvent<HTMLSelectElement>, book) => {
      console.log(e);
      console.log(book)
      setShelfKey(e);
      setBookId(book.id)
      updateShelf(shelfKey, bookId);

    }
    // Request to change shelf
    const updateShelf = async (shelfKey, bookId) => {
        try {
        const resposne= await axios(`/api/book/${bookId}/${shelfKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,                    
                },
                
            });
        }catch (error) {
        console.error(error);
        setErrorMessage("Oh no! An unexpected error occurred.");
        };
    };

        useEffect (() => {
            updateShelf(shelfKey, bookId);
        }, []);
        
   // Delete book from shelves     
    const deleteBook = async (bookId) => {
      try {
        const resposne= await axios(`/api/book/${bookId}`, {
              method: "DELETE",
              headers: {
                  Authorization: `Bearer ${getToken()}`,                    
              },
              
          });
        }catch (error) {
          console.error(error);
          setErrorMessage("Oh no! An unexpected error occurred.");
        };
      };


    
    return (
      <>
      <Navbar />
        <div className="bookshelf-container">
          <h1>`${username}'s Bookshelf`</h1>
            {/* bookshelf.map((books)) => { */}  
              
              <div className="shelf-container">
                <h2>Shelf name</h2>
                {/* books.map(book) => { } */}
                <div className="book-container">
                  <div className="book-img">
                    <NavLink to={`/book/${book.id}`} className="bookLink">
                      <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
                    </NavLink>
                  </div>
                    
                  <div className="book-details">
                    <NavLink to={`/book/${book.id}`} className="bookLink">
                      <h3>`${book.title}`</h3>
                    </NavLink>
                    <p>`${book.author}`</p>
                    <div className="shelf-selector">
                    <select id="dropdown" type="text" onChange={(e) => changeShelf(e.target.value, book)} >
                      <option value="wantToRead"></option>
                      <option value="currentlyReading"></option>
                      <option value="read"></option>
                    </select>
                    </div>
                    <button onClick={deleteBook(book.Id)}>X Delete Book</button>   
                  </div>
                </div>
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

        {/* <Shelf
            bookshelf = {bookshelf}
            setBookshelf = {setBookshelf}
            shelfName = "wantToRead"
            title = "Want to Read"
            />
          <Shelf
            bookshelf = {bookshelf}
            setBookshelf = {setBookshelf}
            shelfName = "currentlyReading"
            title = "Currently Reading"
          />
          <Shelf
            bookshelf = {bookshelf}
            setBookshelf = {setBookshelf}
            shelfName = "read"
            title = "Read"
          /> */}

      );

};

export default Bookshelf;