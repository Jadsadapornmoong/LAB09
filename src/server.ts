import express from "express";
import path from "path";
import * as bookController from "./controllers/bookController";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", bookController.renderHomePage);
app.get("/books", bookController.renderBooksList);
app.get("/books/search", bookController.handleSearchBooks);
app.post("/books", bookController.handleAddBook);
app.post("/books/delete/:id", bookController.handleDeleteBook);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});