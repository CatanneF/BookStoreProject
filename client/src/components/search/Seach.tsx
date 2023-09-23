import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import Navbar from "../navbar/Navbar"
import { AccessTokenContext } from "../../contexts/AccessTokenContext"
import "../search/search.css"


export interface ISearch{
  id: string;
  title: string;
  authors: string;
  imageLinks: {
    thumbnail?: string
  };
  [key: string]: any
}

function Search () {

    const { logout } = useContext(AccessTokenContext);

    const location = useLocation();
    const bookResults = location.state?.bookResults 

    return (
        <>
          <Navbar />
          <h1>Search Results:</h1>
          {bookResults && bookResults.map((book: ISearch) => {
            return (
              <div className="search-container">
                <div className="bookImg">
                  <Link to={`/book/${book.id}`} state={{bookId: book.id}} className="bookLink">
                    <img src={book.imageLinks?.thumbnail} alt="thumbnail of book cover"/>
                  </Link>
                </div>
                <div className="bookTitle">
                <Link to={`/book/${book.id}`} state={{bookId: book.id}} className="bookLink">
                    <h2>{book.title}</h2>
                  </Link>
                  <h3>{book.authors}</h3>
                </div>
              </div>
            )
          })}
         
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

export default Search;