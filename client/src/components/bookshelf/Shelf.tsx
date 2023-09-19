import { useEffect, useContext, ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { AccessTokenContext } from "../../contexts/AccessTokenContext";
import axios from "axios";
import { IBookshelf } from "./Bookshelf";
import { IBookshelfResponse } from "./Bookshelf";

// type ShelfProps = {
//     bookshelf: {}[];
//     setBookshelf: {}[];
//     shelfName: string;
//     title: string;

// }

// function Shelf ({shelfName, bookshelf, setBookshelf, title}: ShelfProps) {

//     const { getToken } = useContext(AccessTokenContext);

//     const books: IBookshelfResponse = bookshelf.shelfName;

//     const [errorMessage, setErrorMessage] = useState("");

//     const changeShelf = async (e: ChangeEvent<HTMLSelectElement>) => {
//         try {
//         const data = await axios(`http://localhost:3001/api/{bookId}/{shelfKey}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,                    
//                 },
//                 data: {
//                 }
//             });
//         }catch (error) {
//         console.error(error);
//         setErrorMessage("Oh no! An unexpected error occurred.");
//         };
//     };


//     const deleteBook = async () => {
//         try {
//         const data = await axios(`http://localhost:3001/api/{bookId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,               
//                 },
//                 data: {
                    
//                 },
//             });
//         }catch (error) {
//         console.error(error);
//         setErrorMessage("Oh no! An unexpected error occurred.");
//         };
//     };

//     const getBookDetails = async () => {
//         const data = await axios(`http://localhost:3001/api/book/{bookId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,               
//             },
//         })
//     }


//     return (
//         <div className="shelf-container">
//             <h2>{title}</h2>
//             {/* books.map((book, idx) => { */}
//                 {/* return ( */}
//                     <div className="book-container">
//                         <div className="book-img">
//                             <NavLink to=`/book/${book.id} className="bookLink">
//                                 <img src={book.imageLinks.thumbnail} alt="thumbnail of book cover"/>
//                         </div>
                        
//                         <div className="book-details">
//                             <NavLink to=`/book/${book.id} className="bookLink">
//                                 <h3>`${book.title}`</h3>
//                             </NavLink>
//                             <p>`${book.author}`</p>
//                             <select id="dropdown" type="text" onChange={(e) => changeShelf(e.target.value)} >
//                                 <option value="wantToRead">Want to Read</option>
//                                 <option value="currentlyReading">Currently Reading</option>
//                                 <option value="read">Read</option>
//                             </select>  
//                             <button onClick={deleteBook}>X Delete Book</button> 
//                         </div>
//                     </div> 
//         </div>
            

            
            
//     )
// }

// export default Shelf