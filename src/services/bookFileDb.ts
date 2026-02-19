import fs from "fs";
import path from "path";
import { Book } from "../model/Book";

const dbPath = path.join(process.cwd(), "books.json");

type DbShape = { books: Book[] };

function readDb(): DbShape {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2), "utf-8");
      return { books: [] };
    }
    const filecontent = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(filecontent) as DbShape;
  } catch (error) {
    console.error("Error reading database:", error);
    return { books: [] };
  }
}

function writeDb(db: DbShape) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

export function getBooks(): Book[] {
  return readDb().books;
}

export function searchBooksByName(name: string): Book[] {
  const books = getBooks();
  return books.filter(b => b.bookName.toLowerCase().includes(name.toLowerCase()));
}

export function addBook(bookName: string): void {
  const db = readDb();
  let maxNo = 0;
  
  if (db.books.length > 0) {
    maxNo = Math.max(...db.books.map(b => b.bookNo));
  }
  
  const newBook: Book = {
    bookNo: maxNo + 1,
    bookName: bookName
  };
  
  db.books.push(newBook);
  writeDb(db);
}

export function deleteBook(bookNo: number): void {
  const db = readDb();
  db.books = db.books.filter(b => b.bookNo !== bookNo);
  writeDb(db);
}