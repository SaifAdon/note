const createbtn = document.querySelector("#createbtn");
const updatebtn = document.querySelector("#updatebtn");
const closebtn = document.querySelector("#closebtn");
const deletebtn = document.querySelector("#deletebtn");
const popupcontent = document.querySelector(".popupcontent");
const popup = document.querySelector(".popup");
const notescontent = document.querySelector(".notes");
const srcimg = document.querySelector(".thumbnail");
const title = document.querySelector(".title");
const dummytext = document.querySelector(".dummycontent");
let selectcardid = null;

createbtn.addEventListener("click", function () {
    selectcardid = null;
    srcimg.value = "";
    title.value = "";
    dummytext.value = "";
    popup.style.display = "flex"
});
closebtn.addEventListener("click", function () { popup.style.display = "none" });
const addnote = (event) => {
    event.preventDefault();
    const notethumbnail = srcimg.value;
    const notetitle = title.value;
    const notecontent = dummytext.value;

    const mycards = getcard();
    if (selectcardid != null) {
        const index = mycards.findIndex((card) => card.id === selectcardid);
        mycards[index].thumbnail = notethumbnail;
        mycards[index].title = notetitle;
        mycards[index].content = notecontent;
        const card = document.getElementById(selectcardid);
        card.querySelector("img").src = notethumbnail;
        card.querySelector("p").innerHTML = notetitle;
    }
    else {
        let cardid = Date.now().toString();
        createcard(notethumbnail, cardid, notetitle)
        mycards.push({
        id: cardid,
        thumbnail: notethumbnail,
        title: notetitle,
        content: notecontent
    });
    }
    localStorage.setItem("mycards", JSON.stringify(mycards));
    popup.style.display = "none";
}
updatebtn.addEventListener("click", addnote);

const createcard = (notethumbnail, cardid, notetitle) => {
    const contentcard = document.createElement("div");
    const thumbnail = document.createElement("img");
    const title = document.createElement("p");
    contentcard.id = cardid;
    contentcard.classList.add("notescontent");
    thumbnail.src = notethumbnail;
    title.innerHTML = notetitle;
    contentcard.appendChild(thumbnail);
    contentcard.appendChild(title);
    notescontent.appendChild(contentcard);

}

notescontent.addEventListener("click", (event) => {
    const targetelement = event.target.closest(".notescontent");
    selectcardid = targetelement.id;
    const cards = getcard();
    const clickedCard = cards.find((card) => card.id === selectcardid);
    srcimg.value = clickedCard.thumbnail;
    title.value = clickedCard.title;
    dummytext.value = clickedCard.content;
    popup.style.display = "flex";
})
deletebtn.addEventListener("click", () => {
    const deletecard = document.getElementById(selectcardid);
    deletecard.remove();
    let cardstodeletefromlocal = getcard();
    cardstodeletefromlocal = cardstodeletefromlocal.filter((card) => card.id !== selectcardid);
    localStorage.setItem("mycards", JSON.stringify(cardstodeletefromlocal));
    popup.style.display = "none";
    selectcardid = null;
})
const getcard = () => {
    return localStorage.getItem("mycards") ? JSON.parse(localStorage.getItem("mycards")) : [];
}
const loadcards = () => {
    const cards = getcard();
    cards.forEach((cards) => createcard(cards.thumbnail, cards.id, cards.title));
}
window.addEventListener("DOMContentLoaded", loadcards);