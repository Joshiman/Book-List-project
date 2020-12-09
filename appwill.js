const title = document.getElementById('title')
const author = document.getElementById('author')
const isbn = document.getElementById('isbn')
const inputFields = [title, author, isbn]
const list = document.getElementById('book-list')
const container = document.querySelector('.container')
const form = document.querySelector('#book-form')

function showBookInList(book) {
    // Create tr element
    const row = document.createElement('tr')
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `

    list.appendChild(row)
}

function showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    container.insertBefore(div, form)

    // Timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 3000)
}

function getBooksFromStorage() {
    let books = []
    if (localStorage.books) books = JSON.parse(localStorage.getItem('books'))

    return books
}

function displayBooks() {
    getBooksFromStorage().forEach(showBookInList)
}

function storeBook(book) {
    localStorage.setItem(
        'books',
        JSON.stringify([...getBooksFromStorage(), book])
    )
}

function removeBookFromStorage(isbn) {
    localStorage.setItem(
        'books',
        JSON.stringify(getBooksFromStorage().filter((book) => book.isbn !== isbn))
    )
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', displayBooks)

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const isNotValid = inputFields.some((field) => field.value === '')

    // Validate
    if (isNotValid) {
        // Error alert
        return showAlert('Please fill in all fields', 'error')
    }
    const book = {
        title: title.value,
        author: author.value,
        isbn: isbn.value,
    }
    // check for duplicate isbn
    const isDuplicateISBN = getBooksFromStorage().some(
        (bk) => bk.isbn === book.isbn
    )
    if (isDuplicateISBN) {
        return showAlert('Check ISBN, duplicate book', 'error')
    }

    showBookInList(book)

    // Add to LS
    storeBook(book)

    // Show success
    showAlert('Book Added!', 'success')

    // Clear fields
    inputFields.forEach((field) => (field.value = ''))
})

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
        e.target.parentElement.parentElement.remove()
        removeBookFromStorage(
            e.target.parentElement.previousElementSibling.textContent
        )
        showAlert('Book Removed!', 'success')
    }

    e.preventDefault()
})