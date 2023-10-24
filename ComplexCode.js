/*
FILENAME: ComplexCode.js

DESCRIPTION: This code demonstrates a complex application that simulates a virtual library management system. It includes multiple classes and functionalities such as adding books, searching, borrowing and returning books, managing user accounts, and generating library reports.

AUTHOR: John Doe

DATE: August 1, 2022

*/

class Book {
    constructor(title, author, genre, year, quantity) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.year = year;
        this.quantity = quantity;
    }

    getInfo() {
        return `Title: ${this.title}\nAuthor: ${this.author}\nGenre: ${this.genre}\nYear: ${this.year}\nQuantity: ${this.quantity}`;
    }

    decreaseQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    increaseQuantity() {
        this.quantity++;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    searchBooksByTitle(title) {
        let matchedBooks = [];
        for (let book of this.books) {
            if (book.title.toLowerCase().includes(title.toLowerCase())) {
                matchedBooks.push(book);
            }
        }
        return matchedBooks;
    }

    borrowBook(book, user) {
        if (book.quantity > 0 && !user.hasBorrowedBook(book)) {
            book.decreaseQuantity();
            user.addBorrowedBook(book);
            console.log(`Book "${book.title}" borrowed successfully by ${user.name}.`);
        } else {
            console.log(`Unable to borrow book "${book.title}".`);
        }
    }

    returnBook(book, user) {
        if (user.hasBorrowedBook(book)) {
            book.increaseQuantity();
            user.removeBorrowedBook(book);
            console.log(`Book "${book.title}" returned successfully by ${user.name}.`);
        } else {
            console.log(`Unable to return book "${book.title}".`);
        }
    }

    generateReport() {
        let report = "---LIBRARY REPORT---\n";

        // Total books in the library
        report += `Total Books: ${this.books.length}\n`;

        // Books per genre
        let genreCount = {};
        for (let book of this.books) {
            if (genreCount[book.genre]) {
                genreCount[book.genre]++;
            } else {
                genreCount[book.genre] = 1;
            }
        }
        report += "---Books Per Genre---\n";
        for (let genre in genreCount) {
            report += `${genre}: ${genreCount[genre]}\n`;
        }

        // Books borrowed by users
        report += "---Books Borrowed by Users---\n";
        for (let user of this.users) {
            let borrowedBooks = user.borrowedBooks.length;
            report += `${user.name}: ${borrowedBooks}\n`;
        }

        return report;
    }
}

class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.borrowedBooks = [];
    }

    addBorrowedBook(book) {
        this.borrowedBooks.push(book);
    }

    removeBorrowedBook(book) {
        this.borrowedBooks.splice(this.borrowedBooks.indexOf(book), 1);
    }

    hasBorrowedBook(book) {
        return this.borrowedBooks.includes(book);
    }
}

// Create a library instance
const library = new Library();

// Create some books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Classics", 1925, 3);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "Fiction", 1960, 5);
const book3 = new Book("1984", "George Orwell", "Science Fiction", 1949, 2);

// Add books to the library
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Create some users
const user1 = new User("Alice", 25, "alice@example.com");
const user2 = new User("Bob", 30, "bob@example.com");

// Add users to the library
library.addUser(user1);
library.addUser(user2);

// Search for books by title
const matchedBooks = library.searchBooksByTitle("kill");

console.log("---Matched Books---");
for (let book of matchedBooks) {
    console.log(book.getInfo());
}

// User borrows a book
library.borrowBook(matchedBooks[0], user1);

// Generate library report
const report = library.generateReport();
console.log(report);

// User returns a book
library.returnBook(matchedBooks[0], user1);
