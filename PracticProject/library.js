let title = document.getElementById('title');
let genre = document.getElementById('genre');
let pages = document.getElementById('pagesNumber');
let titleModal = document.getElementById('titleModal');
let genreModal = document.getElementById('genreModal');
let pagesModal = document.getElementById('pagesNumberModal');
let btnAddBook = document.getElementById('addBook');
let btnSaveBookModal = document.getElementById('btnSaveBookModal');
let ownGenreBlock = document.getElementById('ownGenreBlock');
let ownGenreBlockModal = document.getElementById('ownGenreBlockModal');
let ownGenre = document.getElementById('ownGenre');
let ownGenreModal = document.getElementById('ownGenreModal');
let allBooksID = [];
let allBooksIDArr = [];
let genreArr = ['comedy', 'drama', 'fantasy'];

window.addEventListener("load", fillBookTable, false);

function allBooks(){
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).charAt(0) == 'b')
            allBooksID[i] = localStorage.key(i);
     } 
     return allBookIDArr = allBooksID.filter(Boolean);
   }

function fillBookTable(){
    allBooks();
    console.log(allBookIDArr);
    for (let i=0; i< allBookIDArr.length; i++){
        exDataJSON = window.localStorage.getItem(allBookIDArr[i]);
        exDataObject = JSON.parse(exDataJSON);
        addBookRow('booksTable', allBookIDArr[i], exDataObject['title'], exDataObject['genre'], exDataObject['pages']);
    }
    titleTDs = document.querySelectorAll('td[data-col="title"]');
    genreTDs = document.querySelectorAll('td[data-col="genre"]');
    pagesTDs = document.querySelectorAll('td[data-col="pages"]');
    ownGenreBlock.classList.add('hideBlock');
 }

function delBookItem(){
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    localStorage.removeItem(this.getAttribute('data-id'));
    titleTDs = document.querySelectorAll('td[data-col="title"]');
    genreTDs = document.querySelectorAll('td[data-col="genre"]');
    pagesTDs = document.querySelectorAll('td[data-col="pages"]');
}

function editBookItem(){
    ownGenreBlockModal.classList.add('hideBlock');    
    btnSaveBookModal.setAttribute('disabled', true);
    btnSaveBookModal.setAttribute('data-id', this.getAttribute('data-id'));
    var editItemJSON = window.localStorage.getItem(this.getAttribute('data-id'));
    var editItemOdject = JSON.parse(editItemJSON);
    if (!genreArr.includes(editItemOdject['genre'])) {
        ownGenreBlockModal.classList.remove('hideBlock');
        ownGenreModal.value= editItemOdject['genre'];
        genreModal.classList.remove('valid');
        genreModal.classList.remove('noValid');
        genreModal.value = 'ownGenre';
        ownGenreModal.classList.add('valid');
    } else{
        genreModal.value= editItemOdject['genre'];
        genreModal.classList.add('valid');
    } 
    titleModal.value= editItemOdject['title'];
    pagesModal.value= editItemOdject['pages'];
    titleModal.classList.add('valid');
    pagesModal.classList.add('valid');
}
btnSaveBookModal.addEventListener('click', saveBookChanches, false);

function saveBookChanches(){
    if (genreModal.value == 'ownGenre')
        genreBook = ownGenreModal.value;
    else genreBook = genreModal.value;
    var editBook ={
        title: titleModal.value,
        genre: genreBook,
        pages: pagesModal.value,
    }
    localStorage.setItem(this.getAttribute('data-id'), JSON.stringify(editBook));
    var editBookToTable = window.localStorage.getItem(this.getAttribute('data-id'));
    var editBookData = JSON.parse(editBookToTable);
    
    for (let i=0; i<titleTDs.length; i++){
        if (titleTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            titleTDs[i].innerHTML = editBookData['title'];
        }
    }
    for (let i=0; i<genreTDs.length; i++){
        if (genreTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            genreTDs[i].innerHTML = editBookData['genre'];
        }
    }
    for (let i=0; i<pagesTDs.length; i++){
        if (pagesTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            pagesTDs[i].innerHTML = editBookData['pages'];
        }
    }
    titleTDs = document.querySelectorAll('td[data-col="title"]');
    genreTDs = document.querySelectorAll('td[data-col="genre"]');
    pagesTDs = document.querySelectorAll('td[data-col="pages"]');
}

// Sorting by title column
document.getElementById('thTitle').addEventListener('click', sortByTitle, false);
function sortByTitle(){
    sortByColBook(titleTDs);

}
// Sorting by genre column
document.getElementById('thGenre').addEventListener('click', sortByGenre, false);
function sortByGenre(){
    sortByColBook(genreTDs);
}
// Sorting by Number of pages column
document.getElementById('thPages').addEventListener('click', sortByPages, false);
function sortByPages(){
    sortByColBook(pagesTDs);
}

function sortByColBook(colHead){
    sortColArr = [];
    for (let i=0; i<colHead.length; i++){
        sortColArr.push(colHead[i].innerHTML);
    }
    if (colHead == pagesTDs){
        sortColArr=sortColArr.sort((a,b) => a-b);
    }
    else
        sortColArr.sort();
    var sortedTableArr=[];   
    for (let j=0; j<sortColArr.length; j++){
        var sortedTableTR={};
        for (let i=0; i<colHead.length; i++){
            if (colHead[i].innerHTML==sortColArr[j]){
                var currID=colHead[i].getAttribute('data-id');
                var currItemJSON = window.localStorage.getItem(currID);
                var currItemObject = JSON.parse(currItemJSON);
                sortedTableTR.id=currID;
                sortedTableTR.title=currItemObject['title'];
                sortedTableTR.genre=currItemObject['genre'];
                sortedTableTR.pages=currItemObject['pages'];
            }
        }
        sortedTableArr[j]=sortedTableTR;
     }
     while (document.getElementById('booksTable').firstChild){
        document.getElementById('booksTable').removeChild(document.getElementById('booksTable').firstChild);
     }
   
    for (let i=0; i<sortedTableArr.length; i++){
        addBookRow('booksTable', sortedTableArr[i].id, sortedTableArr[i].title, sortedTableArr[i].genre, sortedTableArr[i].pages);
    }
    titleTDs = document.querySelectorAll('td[data-col="title"]');
    genreTDs = document.querySelectorAll('td[data-col="genre"]');
    pagesTDs = document.querySelectorAll('td[data-col="pages"]');
}


function addBookRow(id, key, td1Text, td2Text, td3Text, td4Text, td5Text){
    var tbody = document.getElementById(id);
    var row = document.createElement("tr")
    var  td1= document.createElement("td")
    td1.setAttribute('data-col', 'title');
    td1.setAttribute('data-id', key);
    td1.innerHTML = td1Text;
    var td2 = document.createElement("td");
    td2.setAttribute('data-col', 'genre');
    td2.setAttribute('data-id', key);
    td2.innerHTML = td2Text;
    var td3 = document.createElement("td");
    td3.setAttribute('data-col', 'pages');
    td3.setAttribute('data-id', key);
    td3.innerHTML = td3Text;
    var td6 = document.createElement("td")
    
    var delBtn=document.createElement('button');
    delBtn.addEventListener('click', delBookItem, false);
    delBtn.setAttribute('data-id', key);
    delBtn.classList.add('btn', 'btn-dark', 'delBtn');
    
    var delImg = document.createElement('img');
    delImg.setAttribute('src', 'img/iconfinder_trashcan-delete_60097.png')
    delBtn.appendChild(delImg);
    var td7 = document.createElement("td");
    td7.setAttribute('id', 'td7');
    
    var editBtn=document.createElement('button');
    editBtn.addEventListener('click', editBookItem, false);
    editBtn.setAttribute('data-id', key);
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#editBookModal');
    editBtn.classList.add('btn', 'btn-dark', 'editBtn');
    var editImg = document.createElement('img');
    editImg.setAttribute('src', 'img/edit3.png')
    editBtn.appendChild(editImg);
    
    td6.appendChild(delBtn);
    td7.appendChild(editBtn);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td6);
    row.appendChild(td7);
    tbody.appendChild(row);
}

btnAddBook.addEventListener('click', addBook, false);

function addBook(){
    if (genre.value == 'ownGenre')
        genreBook = ownGenre.value;
    else genreBook = genre.value;
        var newBook ={
            title: title.value,
            genre: genreBook,
            pages: pages.value,
        }
    bookID= 'b' + Math.round(0.5 + Math.random() * 1000);
    localStorage.setItem(bookID, JSON.stringify(newBook));    
    var newBookToTable = window.localStorage.getItem(bookID);
    var newBookData = JSON.parse(newBookToTable); 
    
    addBookRow('booksTable', bookID, newBookData['title'], newBookData['genre'], newBookData['pages']);
    titleTDs = document.querySelectorAll('td[data-col="title"]');
    genreTDs = document.querySelectorAll('td[data-col="genre"]');
    pagesTDs = document.querySelectorAll('td[data-col="pages"]');

    document.getElementById('addBookForm').reset();
    btnAddBook.setAttribute('disabled', true);
    ownGenreBlock.classList.add('hideBlock');
    [].forEach.call(document.querySelectorAll('.valid'), function (el) {
        el.classList.remove('valid');
    });
}

// Validation forms
textPattern = /[a-z]/;
btnAddBook.setAttribute('disabled', true); 
btnSaveBookModal.setAttribute('disabled', true); 

title.addEventListener('change', textCheck, false);
genre.addEventListener('change', textCheck, false);
genre.addEventListener('change', genreCheck, false);
ownGenre.addEventListener('change', textCheck, false);
pages.addEventListener('change', numberCheck, false);

titleModal.addEventListener('change', textCheck, false);
genreModal.addEventListener('change', textCheck, false);
pagesModal.addEventListener('change', numberCheck, false);
genreModal.addEventListener('change', genreCheck, false);
ownGenreModal.addEventListener('change', textCheck, false);
pagesModal.addEventListener('change', numberCheck, false);

function numberCheck(e){
    if ((this.value<1)&&(!this.value=="")){
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
    else if (this.value==""){
        this.classList.remove('valid');
        this.classList.remove('noValid');
    }
    else{
        this.classList.remove('noValid');
        this.classList.add('valid');
    } 
    activeBtnBook(e);    
}

function textCheck(e){
    if (!textPattern.test(this.value.toLowerCase())&&(!this.value=="")) {
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
    else if (this.value==""){
        this.classList.remove('valid');
        this.classList.remove('noValid');
    }
    else{
        this.classList.remove('noValid');
        this.classList.add('valid');
    } 
    activeBtnBook(e);    
}
function genreCheck(e){
    if (e.target.form.getAttribute('id')=='editBookForm'){
        btnSaveBookModal.setAttribute('disabled', true);
        if (this.value == 'ownGenre'){
            ownGenreBlockModal.classList.remove('hideBlock');
            ownGenreModal.value =''; 
            ownGenreModal.classList.remove('valid');
            genreModal.classList.remove('valid');
            genreModal.classList.remove('noValid');
            ownGenreModal.addEventListener('change', textCheck, false);
        }else 
            if (this.value == 'Choose genre'){
                ownGenreBlockModal.classList.add('hideBlock');
                genreModal.classList.remove('valid');
                genreModal.classList.remove('noValid');
            }
            else ownGenreBlockModal.classList.add('hideBlock');
    }
    if (e.target.form.getAttribute('id')=='addBookForm'){
        if (this.value == 'ownGenre'){
            btnAddBook.setAttribute('disabled', true);
            ownGenreBlock.classList.remove('hideBlock');
            genre.classList.remove('valid');
            genre.classList.remove('noValid');
            ownGenre.addEventListener('change', textCheck);
        }else 
            if (this.value == 'Choose genre'){
                ownGenreBlock.classList.add('hideBlock');
                genre.classList.remove('valid');
                genre.classList.remove('noValid');
            }
            else ownGenreBlock.classList.add('hideBlock');
    }
    activeBtnBook(e);
}

function activeBtnBook(e){
    if (e.target.form.getAttribute('id')=='addBookForm')
        if (title.value && pages.value && title.classList.contains('valid') && pages.classList.contains('valid')){
            if ((genre.value == 'ownGenre' && ownGenre.classList.contains('valid')) || (genre.value != 'ownGenre' && genre.value != 'Choose genre')){
                btnAddBook.removeAttribute('disabled');
            }
            else btnAddBook.setAttribute('disabled', true);
        }else 
            btnAddBook.setAttribute('disabled', true);
    if (e.target.form.getAttribute('id')=='editBookForm')
        if (titleModal.value && pagesModal.value && titleModal.classList.contains('valid') && pagesModal.classList.contains('valid')){
            if ((genreModal.value == 'ownGenre' && ownGenreModal.classList.contains('valid')) || (genreModal.value != 'ownGenre' && genreModal.value != 'Choose genre')){
                btnSaveBookModal.removeAttribute('disabled');
            }
            else btnSaveBookModal.setAttribute('disabled', true);
        }else btnSaveBookModal.setAttribute('disabled', true);
        
}