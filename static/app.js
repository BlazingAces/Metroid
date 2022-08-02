//[Variables]==========================================================
const container = document.querySelector(".container");
const messageBox = document.querySelector(".messageBox");
const postBtn = document.querySelector("#postBtn");
const upgrades = document.querySelector("#upgrades");
// let URL = "https://obscure-coast-37313.herokuapp.com/";

//[Fetch for forum]====================================================

let posts = async () => {
    const res = await fetch("https://obscure-coast-37313.herokuapp.com/home");
    const data = await res.json();

}

let forum = (data) => {
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "post")
        div.setAttribute("id", `${data[i]["post_id"]}`);
        messageBox.appened(div);

        let user = data[i].username;
        let time = data[i].time;
        const postTime = document.createElement("div");
        postTime.textContent =`${user} ${time}`;
        postTime.setAttribute("class", "postInfo");
        div.append(postTime);

        const title = document.createElement('h4');
        title.setAttribute("class", "postTitle");
        title.setAttribute("contentEditable", "false");
        title.textContent = data[i].title;
        div.append(title);

        const body = document.createElement('p');
        body.setAttribute("class", "editMe");
        body.setAttribute("contentEditable", "false");
        body.textcontent = `${data[i].post}`;
        div.append(body);

        const edit = document.createElement('button');
        edit.setAttribute("id", `${data[i]['post_id']}`);
        edit.textContent = "-";
        postTime.append(edit);

        const neededBtn = document.createElement("div");
        neededBtn.setAttribute("id", "neededBtn");

        const submit = document.createElement('button');
        submit.setAttribute("id", "submit");
        submit.textContent = "Submit";
        neededBtn.append(submit);

        const deleteInfo = document.createElement('button');
        deleteInfo.setAttribute("id", "delete");
        deleteInfo.textContent = "Delete";
        neededBtn.append(deleteInfo);

        const cancel = document.createElement('button');
        cancel.setAttribute("id", "cancel")
        cancel.textContent = "Cancel"
        neededBtn.append(cancel)



    }
} 