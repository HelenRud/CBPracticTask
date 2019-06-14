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
    fillTable();
    fillBookTable();
    
}


