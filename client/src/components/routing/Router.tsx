import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../login/Login";
import Bookshelf from "../bookshelf/Bookshelf";
import Bookdetails from "../book details/Bookdetails";
import Search from "../search/Seach";
import FileNotFound from "../FileNotFound";

function Router() {
  return (
    <Routes>
      <Route
        path="/bookshelf"
        element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/book/:bookId"
        element={
          <ProtectedRoute>
            <Bookdetails />
          </ProtectedRoute>
        }
      />
       
      <Route
        path="/search"
        element={
          <ProtectedRoute>
              <Search />
          </ProtectedRoute>
        }
      /> 

      <Route path="/" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default Router;




