import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import AddBook from "./pages/AddBook/AddBook";
import EditBook from "./pages/EditBook/EditBook";
import DeleteBook from "./pages/DeleteBook/DeleteBook";
import ViewBooks from "./pages/ViewBooks/ViewBooks";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "80px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit" element={<EditBook />} />
            <Route path="/delete" element={<DeleteBook />} />
            <Route path="/view" element={<ViewBooks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
