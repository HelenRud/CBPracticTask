
let firstName = document.getElementById('firstName');
let patronymicName = document.getElementById('patronymicName');
let lastName = document.getElementById('lastName');
let birthday = document.getElementById('birthday');
let books = document.getElementById('books');
let booksField= document.getElementById('booksField');
let authorID;
let allDataArr = [];
let allAuthorsID = [];
let booksArr = [];
let delBtnArr = [];
let authorTable=document.getElementById('authorsTable');
let e;

window.addEventListener("load", fillTable, false);

function allAuthors(){
    for (var i = 0; i < localStorage.length; i++) {
        allAuthorsID[i] = localStorage.key(i);
     } 
     return allAuthorsID;
   }

function fillTable(){
    allAuthors();

    for (let i=0; i< allAuthorsID.length; i++){
        exDataJSON = window.localStorage.getItem(allAuthorsID[i]);
        exDataObject = JSON.parse(exDataJSON);
        addRow('authorsTable', allAuthorsID[i], exDataObject['firstName'], exDataObject['patronymicName'], exDataObject['lastName'], exDataObject['birthday'], exDataObject['books']);
    }
    delBtnArr = document.querySelectorAll('.delBtn');
 
    for (let i=0; i<delBtnArr.length; i++){
    delBtnArr[i].addEventListener('click', delItem, false);
    }
}

function delItem(){
    console.log(this.getAttribute('id'));
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    localStorage.removeItem(this.getAttribute('id'));
}

document.getElementById('addAuthor').addEventListener('click', addAuthor, false);

function addRow(id, key, td1Text, td2Text, td3Text, td4Text, td5Text){
    booksArr=td5Text.split(', ');
    console.log(typeof(key));
    var tbody = document.getElementById(id);
    var row = document.createElement("tr")
    var  td1= document.createElement("td")
    td1.appendChild(document.createTextNode(td1Text))
    var td2 = document.createElement("td")
    td2.appendChild (document.createTextNode(td2Text))
    var td3 = document.createElement("td")
    td3.appendChild (document.createTextNode(td3Text))
    var td4 = document.createElement("td")
    td4.appendChild (document.createTextNode(td4Text))
    var td5 = document.createElement("td")
    var ul = document.createElement('ul')
    
    for (let i=0; i<booksArr.length; i++){
        var li=document.createElement('li')
        li.appendChild (document.createTextNode(booksArr[i]))
        ul.appendChild(li);
    }
    td5.appendChild(ul)
    var td6 = document.createElement("td")
    var delBtn=document.createElement('button');
    delBtn.addEventListener('click', delItem, false);
    delBtn.setAttribute('id', key);
    delBtn.classList.add('btn', 'btn-dark', 'delBtn');
    var delImg = document.createElement('img');
    delImg.setAttribute('src', 'img/iconfinder_trashcan-delete_60097.png')
    delBtn.appendChild(delImg);
    td6.appendChild (delBtn);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    tbody.appendChild(row);
}

function addAuthor(){
    var newAuthor ={
            firstName: firstName.value,
            patronymicName: patronymicName.value,
            lastName: lastName.value,
            birthday: birthday.value,
            books: booksField.value
        }
        authorID=Math.round(0.5 + Math.random() * 1000);
        localStorage.setItem(authorID, JSON.stringify(newAuthor));    
   
    var newAuthorToTable = window.localStorage.getItem(authorID);
    var newAuthorData = JSON.parse(newAuthorToTable); 
    addRow('authorsTable', authorID, newAuthorData['firstName'], newAuthorData['patronymicName'], newAuthorData['lastName'], newAuthorData['birthday'], newAuthorData['books']);
}



(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();