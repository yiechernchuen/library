let myLibrary = [];

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = Number(year);
    this.pages = Number(pages);
    if (read) {
        this.read = 'Read';
    } else {
        this.read = 'Have not read';
    }
}

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let year = document.querySelector('#year');
let pages = document.querySelector('#pages');
let read = document.querySelector('#read');

const container = document.querySelector('div.container');
const popUpForm = document.querySelector('.popUpForm');
const form = document.querySelector('.form');
const closePopUp = document.querySelector('.close');

Book.prototype.createDiv = function () {
    const div = document.createElement('div');
    div.classList.add(`book${myLibrary.indexOf(this)}`);
    let i = 0;
    let objectValues = Object.values(this);
    ['title', 'author', 'year', 'pages'].forEach((item) => {
        const paragraph = document.createElement('p');
        paragraph.classList.add(item);
        if (item === 'pages') {
            paragraph.textContent = objectValues[i] + ' pages';
        } else {
            paragraph.textContent = objectValues[i];
        }
        div.appendChild(paragraph);
        i++;
    });
    return div;
};

Book.prototype.readBtn = function () {
    const readButton = document.createElement('button');
    readButton.classList.add('read');
    readButton.textContent = this.read;
    if (this.read === 'Read') {
        readButton.style.backgroundColor = '#2ecc71';
        readButton.style.color = 'white';
    } else {
        readButton.style.backgroundColor = '#f1c40f';
        readButton.style.color = '#2c3e50';
    }
    readButton.addEventListener('click', () => {
        if (this.read === 'Read') {
            this.read = 'Have not read';
            readButton.style.backgroundColor = '#f1c40f';
            readButton.style.color = '#2c3e50';
        } else {
            this.read = 'Read';
            readButton.style.backgroundColor = '#2ecc71';
            readButton.style.color = 'white';
        }
        readButton.textContent = this.read;
    });
    return readButton;
};

Book.prototype.delete = function () {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
        myLibrary.splice(myLibrary.indexOf(this), 1);
        e.target.parentElement.remove();
        let inputDiv = document.querySelectorAll('.container div');
        let i = 0;
        inputDiv.forEach((div) => {
            div.className = `book${i}`;
            i++;
        });
    });
    return deleteButton;
};

function displayBook() {
    const newBook = new Book(title.value, author.value, year.value, pages.value, read.checked);
    myLibrary.push(newBook);
    const containerDiv = newBook.createDiv();
    containerDiv.appendChild(newBook.readBtn());
    containerDiv.appendChild(newBook.delete());
    container.appendChild(containerDiv);

    popUpForm.style.display = 'none';
}

form.addEventListener('submit', (e) => {
    displayBook();
    e.preventDefault();
    form.reset();
});

closePopUp.addEventListener('click', () => {
    popUpForm.style.display = 'none';
});

function addBookPopUp() {
    popUpForm.style.display = 'block';
}
