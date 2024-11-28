import React from "react";
import { Link } from "react-router-dom";
import { House, BookOpen, PencilSimple, Trash, Eye } from "phosphor-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav>
        <Link to="/" className="nav-link">
          <House size={24} weight="light" />
        </Link>
        <Link to="/add" className="nav-link">
          <BookOpen size={24} weight="light" />
        </Link>
        <Link to="/edit" className="nav-link">
          <PencilSimple size={24} weight="light" />
        </Link>
        <Link to="/delete" className="nav-link">
          <Trash size={24} weight="light" />
        </Link>
        <Link to="/view" className="nav-link">
          <Eye size={24} weight="light" />
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
