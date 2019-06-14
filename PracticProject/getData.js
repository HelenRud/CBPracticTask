let booksTable = document.getElementById('booksTable');
let authorsTable = document.getElementById('authorsTable');

let loadBtn = document.getElementById('loadBtn');
loadBtn.addEventListener('click', loadBaseData, false);
function loadBaseData(){
    localStorage.clear();
    let xhr = new XMLHttpRequest();
    let dataArrJSON;
    xhr.open("GET", "getData.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if (xhr.status == 200 || xhr.status == 0){
                let data = xhr.responseText;
                dataArrJSON = data.split('\n');
                console.log(dataArrJSON);
            }
        }
    }
    xhr.send();
    for (let i=0; i<dataArrJSON.length; i++){
        let dataObject =  JSON.parse(dataArrJSON[i]);
        localStorage.setItem(dataObject['key'], JSON.stringify(dataObject));
        console.log(dataObject['key']);
    }
    dellAllrows(authorsTable);
    dellAllrows(booksTable);
    fillTable();
    fillBookTable();
    alert('Original data was successfully loaded. Please prosead to the "Library" or "Authors" menu tab to view result.')
}

function dellAllrows(table){
    while (table.firstChild){
       table.removeChild(table.firstChild);
}
}

