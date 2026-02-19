import { Request, Response } from "express";
import * as fileDb from "../services/bookFileDb";


export const renderHomePage = (req: Request, res: Response) => {
  res.render("index");
};

export const renderBooksList = (req: Request, res: Response) => {
  const books = fileDb.getBooks();
  res.render("books", { books: books, searchQuery: "" });
};

export const handleSearchBooks = (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (!name) {
    return res.redirect("/books");
  }
  const books = fileDb.searchBooksByName(name);
  res.render("books", { books: books, searchQuery: name });
};

export const handleAddBook = (req: Request, res: Response) => {
  const name = req.body.bookName; 
  if (name && name.trim() !== "") {
    fileDb.addBook(name.trim());
  }
  res.redirect("/books");
};


export const handleDeleteBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    fileDb.deleteBook(id);
  }
  res.redirect("/books");
};