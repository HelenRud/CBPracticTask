
let firstName = document.getElementById('firstName');
let patronymicName = document.getElementById('patronymicName');
let lastName = document.getElementById('lastName');
let birthday = document.getElementById('birthday');
let books = document.getElementById('books');
let booksField= document.getElementById('booksField');
let btnSaveModal = document.getElementById('btnSaveModal');
let btnAddAuthor = document.getElementById('addAuthor');
let firstNameModal = document.getElementById('firstNameModal');
let patronymicNameModal = document.getElementById('patronymicNameModal');
let lastNameModal = document.getElementById('lastNameModal');
let birthdayModal = document.getElementById('birthdayModal');
let booksFieldModal = document.getElementById('booksFieldModal');
let firstNamesArr = [];
let firstNameTDs;
let patrNameTDs;
let lastNameTDs;
let birthdayTDs;
let booksTDs;
let authorID;
let allDataArr = [];
let allAuthorsID = [];
let allAuthorsIDArr = [];
let booksArr = [];
let delBtnArr = [];
let authorTable=document.getElementById('authorsTable');
let e;

window.addEventListener("load", fillTable, false);

function allAuthors(){
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).charAt(0) == 'a')
            allAuthorsID[i] = localStorage.key(i);
     } 
     return allAuthorsIDArr = allAuthorsID.filter(Boolean);
   }

function fillTable(){
    allAuthors();
    for (let i=0; i< allAuthorsIDArr.length; i++){
        exDataJSON = window.localStorage.getItem(allAuthorsIDArr[i]);
        exDataObject = JSON.parse(exDataJSON);
        addRow('authorsTable', allAuthorsIDArr[i], exDataObject['firstName'], exDataObject['patronymicName'], exDataObject['lastName'], exDataObject['birthday'], exDataObject['books']);
    }
    firstNameTDs = document.querySelectorAll('td[data-col="firstName"]');
    patrNameTDs = document.querySelectorAll('td[data-col="patrName"]');
    lastNameTDs = document.querySelectorAll('td[data-col="lastName"]');
    birthdayTDs = document.querySelectorAll('td[data-col="birthday"]');
    booksTDs = document.querySelectorAll('td[data-col="books"]');
 
}

function delItem(){
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    localStorage.removeItem(this.getAttribute('data-id'));
    firstNameTDs = document.querySelectorAll('td[data-col="firstName"]');
    patrNameTDs = document.querySelectorAll('td[data-col="patrName"]');
    lastNameTDs = document.querySelectorAll('td[data-col="lastName"]');
    birthdayTDs = document.querySelectorAll('td[data-col="birthday"]');
    booksTDs = document.querySelectorAll('td[data-col="books"]');

}

function editItem(){
    btnSaveModal.setAttribute('disabled', true);
    btnSaveModal.setAttribute('data-id', this.getAttribute('data-id'))
    var editItemJSON = window.localStorage.getItem(this.getAttribute('data-id'));
    var editItemOdject = JSON.parse(editItemJSON);
    firstNameModal.value= editItemOdject['firstName'];
    patronymicNameModal.value= editItemOdject['patronymicName'];
    lastNameModal.value= editItemOdject['lastName'];
    birthdayModal.value= editItemOdject['birthday'];
    booksFieldModal.value= editItemOdject['books'];
    firstNameModal.classList.add('valid');
    if (patronymicNameModal.value=='')
        patronymicNameModal.classList.remove('valid');
    else patronymicNameModal.classList.add('valid');
    lastNameModal.classList.add('valid');
    birthdayModal.classList.add('valid');
}
btnSaveModal.addEventListener('click', saveChanches, false);

function saveChanches(){
    var editAuthor ={
        firstName: firstNameModal.value,
        patronymicName: patronymicNameModal.value,
        lastName: lastNameModal.value,
        birthday: birthdayModal.value,
        books: booksFieldModal.value
    }
    localStorage.setItem(this.getAttribute('data-id'), JSON.stringify(editAuthor));
    var editAuthorToTable = window.localStorage.getItem(this.getAttribute('data-id'));
    var editAuthorData = JSON.parse(editAuthorToTable);
    
    for (let i=0; i<firstNameTDs.length; i++){
        if (firstNameTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            firstNameTDs[i].innerHTML = editAuthorData['firstName'];
        }
    }
    for (let i=0; i<patrNameTDs.length; i++){
        if (patrNameTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            patrNameTDs[i].innerHTML = editAuthorData['patronymicName'];
        }
    }
    for (let i=0; i<lastNameTDs.length; i++){
        if (lastNameTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            lastNameTDs[i].innerHTML = editAuthorData['lastName'];
        }
    }
    for (let i=0; i<birthdayTDs.length; i++){
        if (birthdayTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            birthdayTDs[i].innerHTML = editAuthorData['birthday'];
        }
    }
    var booksTDs = document.querySelectorAll('td[data-col="books"]');
    for (let i=0; i<booksTDs.length; i++){
        if (booksTDs[i].getAttribute('data-id') == this.getAttribute('data-id')){
            booksTDs[i].removeChild(booksTDs[i].firstChild);
            var  editBooksArr=editAuthorData['books'].split(', ');
            var editUL = document.createElement('ul')
    
            for (let i=0; i<editBooksArr.length; i++){
                var li=document.createElement('li')
                li.innerHTML = editBooksArr[i];
                editUL.appendChild(li);
            }
            booksTDs[i].appendChild(editUL);
        }
    }
    firstNameTDs = document.querySelectorAll('td[data-col="firstName"]');
    patrNameTDs = document.querySelectorAll('td[data-col="patrName"]');
    lastNameTDs = document.querySelectorAll('td[data-col="lastName"]');
    birthdayTDs = document.querySelectorAll('td[data-col="birthday"]');
    booksTDs = document.querySelectorAll('td[data-col="books"]');
 
}
// Sorting by First name column
document.getElementById('thFistsName').addEventListener('click', sortByFirstName, false);
function sortByFirstName(){
    sortingByCol(firstNameTDs);

}
// Sorting by Last name column
document.getElementById('thLastName').addEventListener('click', sortByLastName, false);
function sortByLastName(){
    sortingByCol(lastNameTDs);
}
// Sorting by Patronymic name column
document.getElementById('thPatronymicName').addEventListener('click', sortByPatronymicName, false);
function sortByPatronymicName(){
    sortingByCol(patrNameTDs);
}
// Sorting by Birthday column
document.getElementById('thBirthday').addEventListener('click', sortByBirthdayName, false);
function sortByBirthdayName(){
    sortingByCol(birthdayTDs);
}

function sortingByCol(colHead){
    sortColArr = [];
    for (let i=0; i<colHead.length; i++){
        sortColArr.push(colHead[i].innerHTML);
    }
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
                sortedTableTR.firstName=currItemObject['firstName'];
                sortedTableTR.patronymicName=currItemObject['patronymicName'];
                sortedTableTR.lastName=currItemObject['lastName'];
                sortedTableTR.birthday=currItemObject['birthday'];
                sortedTableTR.books=currItemObject['books'];
            }
        }
        sortedTableArr[j]=sortedTableTR;
     }
     while (document.getElementById('authorsTable').firstChild){
        document.getElementById('authorsTable').removeChild(document.getElementById('authorsTable').firstChild);
     }
   
    for (let i=0; i<sortedTableArr.length; i++){
        addRow('authorsTable', sortedTableArr[i].id, sortedTableArr[i].firstName, sortedTableArr[i].patronymicName, sortedTableArr[i].lastName, sortedTableArr[i].birthday, sortedTableArr[i].books);
    }
    firstNameTDs = document.querySelectorAll('td[data-col="firstName"]');
    patrNameTDs = document.querySelectorAll('td[data-col="patrName"]');
    lastNameTDs = document.querySelectorAll('td[data-col="lastName"]');
    birthdayTDs = document.querySelectorAll('td[data-col="birthday"]');
    booksTDs = document.querySelectorAll('td[data-col="books"]');
}

btnAddAuthor.addEventListener('click', addAuthor, false);

function addRow(id, key, td1Text, td2Text, td3Text, td4Text, td5Text){
    booksArr=td5Text.split(', ');
    var tbody = document.getElementById(id);
    var row = document.createElement("tr")
    var  td1= document.createElement("td")
    td1.setAttribute('data-col', 'firstName');
    td1.setAttribute('data-id', key);
    td1.innerHTML = td1Text;
    var td2 = document.createElement("td");
    td2.setAttribute('data-col', 'patrName');
    td2.setAttribute('data-id', key);
    td2.innerHTML = td2Text;
    var td3 = document.createElement("td");
    td3.setAttribute('data-col', 'lastName');
    td3.setAttribute('data-id', key);
    td3.innerHTML = td3Text;
    var td4 = document.createElement("td");
    td4.setAttribute('data-col', 'birthday');
    td4.setAttribute('data-id', key);
    td4.innerHTML = td4Text;
    var td5 = document.createElement("td");
    td5.setAttribute('data-col', 'books');
    td5.setAttribute('data-id', key);
    var ul = document.createElement('ul')
    
    for (let i=0; i<booksArr.length; i++){
        var li=document.createElement('li')
        li.innerHTML = booksArr[i];
        ul.appendChild(li);
    }
    td5.appendChild(ul)
    var td6 = document.createElement("td")
    
    var delBtn=document.createElement('button');
    delBtn.addEventListener('click', delItem, false);
    delBtn.setAttribute('data-id', key);
    delBtn.classList.add('btn', 'btn-dark', 'delBtn');
    
    var delImg = document.createElement('img');
    delImg.setAttribute('src', 'img/iconfinder_trashcan-delete_60097.png')
    delBtn.appendChild(delImg);
    var td7 = document.createElement("td");
    td7.setAttribute('id', 'td7');
    
    var editBtn=document.createElement('button');
    editBtn.addEventListener('click', editItem, false);
    editBtn.setAttribute('data-id', key);
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#editModal');
    editBtn.classList.add('btn', 'btn-dark', 'editBtn');
    var editImg = document.createElement('img');
    editImg.setAttribute('src', 'img/edit3.png')
    editBtn.appendChild(editImg);
    
    td6.appendChild(delBtn);
    td7.appendChild(editBtn);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    tbody.appendChild(row);
}

function addAuthor(){
    var newAuthor ={
            firstName: firstName.value.capitalize(),
            patronymicName: patronymicName.value.capitalize(),
            lastName: lastName.value.capitalize(),
            birthday: birthday.value,
            books: booksField.value
        }
        authorID= 'a' + Math.round(0.5 + Math.random() * 1000);
        localStorage.setItem(authorID, JSON.stringify(newAuthor));    
   
    var newAuthorToTable = window.localStorage.getItem(authorID);
    var newAuthorData = JSON.parse(newAuthorToTable); 
    addRow('authorsTable', authorID, newAuthorData['firstName'], newAuthorData['patronymicName'], newAuthorData['lastName'], newAuthorData['birthday'], newAuthorData['books']);
    firstNameTDs = document.querySelectorAll('td[data-col="firstName"]');
    patrNameTDs = document.querySelectorAll('td[data-col="patrName"]');
    lastNameTDs = document.querySelectorAll('td[data-col="lastName"]');
    birthdayTDs = document.querySelectorAll('td[data-col="birthday"]');
    booksTDs = document.querySelectorAll('td[data-col="books"]');

    document.getElementById('addForm').reset();
    btnAddAuthor.setAttribute('disabled', true);
    [].forEach.call(document.querySelectorAll('.valid'), function (el) {
        el.classList.remove('valid');
    });
}

// Validation forms
lastDate = new Date(2010, 1, 1);
namePattern = /[a-z]/;
btnAddAuthor.setAttribute('disabled', true); 
btnSaveModal.setAttribute('disabled', true); 
firstName.addEventListener('change', nameCheck, false);
patronymicName.addEventListener('change', nameCheck, false);
lastName.addEventListener('change', nameCheck, false);
birthday.addEventListener('change', birthdayCheck, false);

firstNameModal.addEventListener('change', nameCheck, false);
patronymicNameModal.addEventListener('change', nameCheck, false);
lastNameModal.addEventListener('change', nameCheck, false);
birthdayModal.addEventListener('change', birthdayCheck, false);
booksFieldModal.addEventListener('change', activeBtn, false);


function nameCheck(e){
    if (!namePattern.test(this.value.toLowerCase())&&(!this.value=="")) {
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
    activeBtn(e);    
}
function birthdayCheck(e){
    let birthdayDate=new Date (this.value);
    if ((birthdayDate>lastDate)||!(birthdayDate.getMonth()+1)||!birthdayDate.getDate()||!birthdayDate.getFullYear()){
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
    else{
        this.classList.remove('noValid');
        this.classList.add('valid');
    }
    activeBtn(e);
}

function activeBtn(e){
    console.log(e.target.form);
    if (e.target.form.getAttribute('id')=='addForm')
        if ((firstName.value)&&(lastName.value)&&(birthday.value)&&(firstName.classList.contains('valid'))&&(lastName.classList.contains('valid'))&&(birthday.classList.contains('valid'))&&((patronymicName.classList.contains('valid'))|| patronymicName.value=='')){
            btnAddAuthor.removeAttribute('disabled');
        }else{
            btnAddAuthor.setAttribute('disabled', true);
        }
    if (e.target.form.getAttribute('id')=='editForm')
        if ((firstNameModal.value)&&(lastNameModal.value)&&(birthdayModal.value)&&(firstNameModal.classList.contains('valid'))&&(lastNameModal.classList.contains('valid'))&&(birthdayModal.classList.contains('valid'))&&((patronymicNameModal.classList.contains('valid'))|| patronymicNameModal.value=='')){
            btnSaveModal.removeAttribute('disabled');
        }else{
            btnSaveModal.setAttribute('disabled', true);
        }
}
