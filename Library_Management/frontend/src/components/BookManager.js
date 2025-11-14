import React, { useEffect, useState } from "react";
import axios from "axios";
const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "", genre: "" });
  const [editId, setEditId] = useState(null);
  const API = "http://localhost:5000/books";
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      alert("Title and Author are required");
      return;
    }
    if (editId) await axios.put(`${API}/${editId}`, form);
    else await axios.post(API, form);
    setForm({ title: "", author: "", year: "", genre: "" });
    setEditId(null);
    fetchBooks();
  };
  const handleEdit = (b) => {
    setForm(b);
    setEditId(b._id);
  };
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchBooks();
  };
  return (
    <div
      className="container mt-4"
    
    >
      <h3 className="text-center mb-4">Book Manager</h3>

      {}
      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3 flex-wrap">
        <input
          name="title"
          placeholder="Title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          className="form-control"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          className="form-control"
          value={form.year}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          className="form-control"
          value={form.genre}
          onChange={handleChange}
        />
        <button className="btn btn-primary" style={{ minWidth: "100px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {}
      <table className="table table-hover text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length ? (
            books.map((b) => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.year}</td>
                <td>{b.genre}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(b._id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookManager;
