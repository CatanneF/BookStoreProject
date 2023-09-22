import { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";
import Navbar from "../navbar/Navbar";
// import Shelf from "../bookshelf/Shelf";

export interface IBookshelf {
    id: string;
    title: string;
    authors: string;
    imageUrl: string;
    shelf: string
    [key: string]: string;
    thumbnail: string;
    imageLinks: [][] ;

}
  
export interface IBookshelfResponse {
  [shelf: string]: IBookshelf[];
  data: IBookshelf[];
  
}


function Bookshelf () {
  
  const { getToken, logout } = useContext(AccessTokenContext);
  const [wantToRead, setWantToRead] = useState<IBookshelf[]>([]);
  const [currentlyReading, setCurrentlyReading] = useState<IBookshelf[]>([]);
  const [read, setRead] = useState<IBookshelf[]>([]);
  // const [bookshelf, setBookshelf] = useState<IBookshelf[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shelfKey, setShelfKey] = useState("");
  const [bookId, setBookId] = useState("");
 
  
  
  console.log(read)
  
    
// Get bookshelves
  const fetchBookshelf = useCallback(async () => {
        try {
             const response = await axios.request<IBookshelfResponse>({
                method: "GET",
                url: "/api/bookshelf",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getToken()}`,

                },
            }); 
            setWantToRead(response.data.books.wantToRead)
            setCurrentlyReading(response.data.books.currentlyReading)
            setRead(response.data.books.read)
        
            
          } catch (error) {
            console.error(error);
            setErrorMessage("Oh no! An unexpected error occurred.");
        };
    }, [getToken]);

      useEffect(() => {
        fetchBookshelf();
      }, [fetchBookshelf]);



// Change book to another shelf
    const updateShelf = async (shelfKey: string, bookId: string) => {
        try {
        const response= await axios(`/api/bookshelf/${bookId}/${shelfKey}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,                    
                },   
            });
            console.log(response.data)
            fetchBookshelf();
        }catch (error) {
        console.error(error);
        setErrorMessage("Oh no! An unexpected error occurred.");
        };
    }
        useEffect (() => {
            updateShelf(shelfKey, bookId);
        }, []);
        
  // Delete book from shelves     

  const sayHi = (bookId: string) => {
    console.log("clicked delete")
    console.log(bookId)
  }
    const deleteBook = async (bookId: string) => {
      try {
        const response= await axios(`/api/bookshelf/${bookId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${getToken()}`,                    
              }, 
          });
          console.log(response.data)
          fetchBookshelf()
        }catch (error) {
          console.error(error);
          setErrorMessage("Oh no! An unexpected error occurred.");
        };
      };

      useEffect (() => {
        deleteBook(bookId);
    }, []);


    
    return (
      <>
      <Navbar />
        <div className="bookshelf-container">
          <h1> My Bookshelf</h1>
    {/* Want to Read Shelf */}
          <div className="shelf-container">
            <h2>Want to Read</h2>
            {wantToRead.map((book) => {
              return (  
                <div className="book-container">
                  <div className="book-img">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}} className="bookLink">
                      <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
                    </Link>
                  </div>
                  <div className="book-details">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}}  className="bookLink">
                      <h3>{book.title}</h3>
                    </Link>
                    <h4>{book.authors[0]}</h4>
                    <h5>Change Shelf:</h5>
                    <select id="dropdown" onChange={(e) => updateShelf(e.target.value, book.id)} >
                    <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="currentlyReading">Currently Reading</option>
                    </select>
                  </div>
                  <div><button onClick={() => deleteBook(book.id)}>X Delete Books</button></div>   
                </div>
              );
            })}    
          </div> 
    {/*Currently Reading Shelf */}
          <div className="shelf-container">
            <h2>Currently Reading</h2>
            {currentlyReading.map((book) => {
              return (  
                <div className="book-container">
                  <div className="book-img">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}} className="bookLink">
                      <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
                    </Link>
                  </div>
                  <div className="book-details">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}}  className="bookLink">
                      <h3>{book.title}</h3>
                    </Link>
                    <h4>{book.authors[0]}</h4>
                    <select id="dropdown" onChange={(e) => updateShelf(e.target.value, book.id)} >
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="read">Read</option>
                      <option value="wantToRead">Want to Read</option>
                      
                    </select>
                  </div>
                  <div><button onClick={() => deleteBook(book.id)}>X Delete Book</button></div>   
                </div>
              );
            })}   
          </div> 
    {/* Read Shelf */}
          <div className="shelf-container">
            <h2>Read</h2>
            {read.map((book) => {
              return (  
                <div className="book-container">
                  <div className="book-img">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}} className="bookLink">
                      <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
                    </Link>
                  </div>
                  <div className="book-details">
                    <Link to={`/book/${book.id}`} state={{bookId: book.id}}  className="bookLink">
                      <h3>{book.title}</h3>
                    </Link>
                    <h4>{book.authors[0]}</h4>
                    <select id="dropdown" onChange={(e) => updateShelf(e.target.value, book.id)} >
                      <option value="read">Read</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="currentlyReading">Currently Reading</option>
                    </select>
                  </div>
                  <div><button onClick={() => deleteBook(book.id)}>X Delete Bookk</button></div>   
                </div>
              );
            })}    
          </div> 
        </div>
            
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

};

export default Bookshelf;