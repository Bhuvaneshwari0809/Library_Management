import React from "react";
import BookManager from "./components/BookManager";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book Management System</h2>
      <BookManager />
    </div>
  );
}

export default App;
