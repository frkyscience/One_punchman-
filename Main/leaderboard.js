function search() {
var text =  Document.getElementbyid('search').value;
const tr = Document.GetElementsByTagName(`tr`)
for (let i =1;i<tr.lenght;i++) {
    if(!tr[i].childeren[1].childeren[1].innerHTML.toLowerCase().includes(text.toLowerCase
    )) {
        tr[i].style.display = `none`;
    } else {
        tr[i].style.display = ``;
    }
}
}