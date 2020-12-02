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


// Event Listeners for adding a book 

document.getElementById('book-form').addEventListener('submit',
    function (e) {
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

            // show success
            ui.showAlert('Book Added!', 'success');

            // clear filed
            ui.clearFileds();
        }



        e.preventDefault();
    });


// Event listenr for remove a book 
document.getElementById('book-list').addEventListener('click',
    function (e) {

        // Instatiate UI
        const ui = new UI();
        //Delete book
        ui.deleteBook(e.target);

        // show message 
        ui.showAlert('Book Removed', 'success');


        e.preventDefault();

    })