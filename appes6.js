class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // create tr element

        const row = document.createElement('tr');

        // inster cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href= '#' class='delete' >x</a> </td>`
            ;

        list.appendChild(row);

    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert 
        container.insertBefore(div, form);

        //Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();

        }, 3000);

    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFileds() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class

class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static displayBook() {
        const books = store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // add book to UI
            ui.addBookToList(book);
        });

    }

    static removeBook(isbn) {
        const books = store.getBooks();

        books.forEach(function (book, index) {
            const ui = new UI;
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }

        });
        //alert('Are you sure you want to delet it')


        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM load Event

document.addEventListener('DOMContentLoaded',
    store.displayBook);


// Event Listeners for adding a book 

document.getElementById('book-form').addEventListener('submit',
    function (e) {

        e.preventDefault();

        // Get from  values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

        // Instantiate book
        const book = new Book(title, author, isbn);

        // Instatiate UI
        const ui = new UI();

        //validate
        if (title === '' || author === '' || isbn === '') {
            // Error alert
            ui.showAlert('Please fill in all filelds', 'error');
        } else {
            // Add Book to list
            ui.addBookToList(book);

            // Add Book to local stor 
            store.addBook(book);

            // show success
            ui.showAlert('Book Added!', 'success');

            // clear filed
            ui.clearFileds();
        }
        // Duplicated ISBN
        const isDuplicateISBN = store.getBooks().some(function (bookInStorage) {
            return bookInStorage.isbn === book.isbn
        })

        if (isDuplicateISBN) {
            return ui.showAlert('Check ISBN, duplicate book ', 'error')
        }


        // e.preventDefault();
    });


// Event listenr for remove a book 
document.getElementById('book-list').addEventListener('click',
    function (e) {

        // Instatiate UI
        const ui = new UI();
        //Delete book
        ui.deleteBook(e.target);

        // Remove from LocalStorge
        store.removeBook(e.target.parentElement.previousElementSibling.textContent);


        // show message 
        ui.showAlert('Book Removed', 'success');


        e.preventDefault();

    })

// Textl color for dark body color
const hh = document.getElementsByTagName('h1')
hh[0].style.color = "#fff";

const lab = document.getElementsByTagName('label')
for (var i = 0; i < lab.length; i++) {
    lab[i].style.color = '#f4f4f4';
}

var submit = document.querySelector('input[type="submit"]');
submit.style.color = "#fff"

const th = document.getElementsByTagName('th');
for (var i = 0; i < th.length; i++) {
    th[i].style.color = '#f4f4f4';
}

const newbook = document.getElementById("book-list");
newbook.style.color = '#fff'