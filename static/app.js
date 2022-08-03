const container = document.querySelector(".container");
const messageBox = document.querySelector(".messageBox");
const postBtn = document.querySelector("#postBtn");
const updgrade = document.querySelector("#upgrade");
const homeBtn = document.querySelector("#home");

let localURL = "http://localhost:8000";
let deployedURL = "https://obscure-coast-37313.herokuapp.com/";

// fetch all
let getAllPosts = async () => {
   const res = await fetch(`${deployedURL}/home`);
   const data = await res.json();
   newForum(data);
}

getAllPosts();

// randomPostBtn.addEventListener("click", () => {
//    const access = document.querySelectorAll(".post");
//    const postCountArr = [];
//    for (let i = 0; i < access.length; i++) {
//       const idNum = access[i].id;
//       access[i].style.display = "none";
//       postCountArr.push(idNum);
//    }
//    const randomNum = Math.floor(Math.random() * postCountArr.length);
//    const randomID = postCountArr[randomNum];
//    const showPost = access[randomNum];
//    showPost.style.display = "block";

//    async function getSinglePost() {
//       const res = await fetch(`${deployedURL}/home/${randomID}`);

//       const postData = await res.json();
//       newForum(postData);
//    }
//    getSinglePost();
// });

homeBtn.addEventListener("click", () => {
   const access = document.querySelectorAll(".post");
   for (let i = 0; i < access.length; i++) {
        access[i].style.display = "block";
   }
});

//------------- DOM Manipulation Functions -------------------//
const newForum = (data) => {
   for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "post");
      div.setAttribute("id", `${data[i]["post_id"]}`);
      messageBox.append(div);

      let user = data[i].username;
      let time = data[i].time;
      time = `${time.slice(0, 10)}  ${time.slice(11, 19)}`;
      const postedTime = document.createElement("div");
      postedTime.textContent = `@${user}  ${time}`;
      postedTime.setAttribute("id", "postInfo");
      div.append(postedTime);

      const title = document.createElement("h4");
      title.setAttribute("id", "title");
      title.setAttribute("contentEditable", "false");
      title.textContent = data[i].title;
      div.append(title);

      const body = document.createElement("p");
      body.setAttribute("id", "body");
      body.setAttribute("contentEditable", "false");
      body.textContent = `${data[i].post}`;
      div.append(body);

      const edit = document.createElement("button");
     edit.setAttribute("class", "edit");
     edit.setAttribute("id", `${data[i]["post_id"]}`);
     edit.textContent = "-";
      postedTime.append(edit);

      const editButton = document.createElement("div");
      editButton.setAttribute("class", "changeBtn");
      div.append(editButton);

      const submitButton = document.createElement("button");
      submitButton.setAttribute("id", "submit");
      submitButton.textContent = "Submit";
      editButton.append(submitButton);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("id", "delete");
      deleteButton.textContent = "Delete";
      editButton.append(deleteButton);

      const cancelButton = document.createElement("button");
      cancelButton.setAttribute("id", "cancel");
      cancelButton.textContent = "Cancel";
      editButton.append(cancelButton);

      // Event Listener to Edit and Submit Changes
     edit.addEventListener("click", (e) => {
         const id = e.target.id;

         const access = document.querySelectorAll(".post");
         for (let i = 0; i < access.length; i++) {
            if (access[i].id !== id) {
                access[i].style.display = "none";
            }
         }

         title.setAttribute("contentEditable", "true");
          body.setAttribute("contentEditable", "true");
         title.style.backgroundColor = "darkgray";
          body.style.backgroundColor = "gray";
         submitButton.style.display = "block";
         deleteButton.style.display = "block";
         cancelButton.style.display = "block";

         // Patch post
         let editPost = async () => {
            let editHeader = document.getElementById("title").textContent;
            let editMiddle = document.getElementById("body").textContent;
            let changesMade = document.getElementById("approvedEdit");
            changesMade.style.display = "block";

            const changedPost = {
               post_id: id,
               title: editHeader,
               post: editMiddle,
            };

            await fetch(`${deployedURL}/home/${id}`, {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(changedPost),
            });
         }

         // DELETE POST
         let removePost = async () => {
            let remove = document.getElementById("delete-confirmation");
            remove.style.display = "block";

            await fetch(`${deployedURL}/home/${id}`, {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
            });
         }

         submitButton.addEventListener("click", editPost);
         deleteButton.addEventListener("click", removePost);
         cancelButton.addEventListener("click", () => {
            title.setAttribute("contentEditable", "false");
          body.setAttribute("contentEditable", "false");
            title.style.backgroundColor = "transparent";
          body.style.backgroundColor = "transparent";
            submitButton.style.display = "none";
            deleteButton.style.display = "none";
            cancelButton.style.display = "none";
            const access= document.querySelectorAll(".post");
            for (let i = 0; i < access.length; i++) {
                access[i].style.display = "block";
            }
         });
      });
   }
};

function approvedEdit() {
   let newBox = document.createElement("div");
   newBox.setAttribute("id", "approvedEdit");

   let editPost = document.createElement("div");
   editPost.setAttribute("class", "changesMade");
   newBox.append(editPost);

   let header = document.createElement("div");
   header.textContent = "I approve of your changes";
   header.setAttribute("id", "editHeader");
   editPost.append(header);

   let fixBody = document.createElement("div");
   fixBody.textContent = "Very Well, I have submitted your changes";
   fixBody.setAttribute("id", "fixBody");
   editPost.append(fixBody);

   let fixItBtn = document.createElement("button");
   fixItBtn.textContent = "Aprroved";
   editPost.append(fixItBtn);

   newBox.append(editPost);

   fixItBtn.addEventListener("click", () => {
      window.location.reload();
   });
   messageBox.prepend(newBox);
}
approvedEdit();

function removeContent() {
   let deleteBox = document.createElement("div");
   deleteBox.setAttribute("id", "approvedDelete");

   let deleteContent = document.createElement("div");
   deleteContent.setAttribute("class", "deleteContent");
   deleteBox.append(deleteContent);

   let deleteHeader = document.createElement("div");
   deleteHeader.textContent = "Delete Confirmation";
   deleteHeader.setAttribute("id", "deleteHeader");
   deleteContent.append(deleteHeader);

   let deleteBody = document.createElement("div");
   deleteBody.textContent = "Your post has been successfully deleted!";
   deleteBody.setAttribute("id", "deleteBody");
   deleteContent.append(deleteBody);

   let removeButton = document.createElement("button");
   removeButton.textContent = "Approved";
   deleteContent.append(removeButton);

   removeButton.addEventListener("click", () => {
      window.location.reload();
   });
   messageBox.prepend(deleteBox);
}

removeContent();

const generatePost = () => {
   const newPost = document.createElement("div");
   newPost.setAttribute("id", "new-post");

   const postHeader = document.createElement("div");
   postHeader.setAttribute("id", "post-header");
   postHeader.textContent = "Generate Post";
   newPost.append(postHeader);

   const newPostBox = document.createElement("form");
   newPost.append(newPostBox);

   const messageTitle = document.createElement("input");
   messageTitle.setAttribute("id", "messageTitle");
   messageTitle.setAttribute("placeholder", "Title");
   newPostBox.append(messageTitle);

   const newUser = document.createElement("input");
   newUser.setAttribute("id", "new-user");
   newUser.setAttribute("placeholder", "Username");
   newUser.setAttribute("required", "");
   newPostBox.append(newUser);

   const textBox = document.createElement("textarea");
   textBox.setAttribute("class", "post-middle");
   textBox.setAttribute("placeholder", "Type Here");
   textBox.setAttribute("required", "");
   newPostBox.append(textBox);

   const newPostButton = document.createElement("input");
   newPostButton.setAttribute("type", "submit");
   newPostBox.append(newPostButton);

   const undoButton = document.createElement("button");
   undoButton.setAttribute("id", "cancel-button");
   undoButton.textContent = "Cancel";
   newPostBox.append(undoButton);

   messageBox.prepend(newPost);

   postBtn.addEventListener("click", () => {
      newPost.style.display = "block";
   });

   undoButton.addEventListener("click", () => {
      newPost.style.display = "none";
      newPostBox.reset();
   });

   newPostButton.addEventListener("click", () => {
      async function sendPostToDB() {
         let posterValue = document.getElementById("postUsername").value;
         let titleValue = document.getElementById("title").value;
         let textValue = document.getElementById("body").value;

         const newPost = {
            username: posterValue,
            title: titleValue,
            post: bodyValue,
         };

         await fetch(`${deployedURL}/home`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
         });
      }
      sendPostToDB();
   });
};
generatePost();