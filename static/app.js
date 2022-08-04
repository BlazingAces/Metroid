//[variables]============================================================================

const container = document.querySelector(".container");
const messageBox = document.querySelector(".messageBox");
const postBtn = document.querySelector("#postBtn");
const updgrade = document.querySelector("#upgrade");
const homeBtn = document.querySelector("#home");

// [fetch All]===========================================================================
let getAllPosts = async () => {
  const res = await fetch("/home");
  const data = await res.json();
  newForum(data);
};

getAllPosts();

//[Function to set up Forum Info]=========================================================
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


    edit.addEventListener("click", (e) => {
      const id = e.target.id;
      console.log(id);
      const access = document.querySelectorAll(".post");
      for (let i = 0; i < access.length; i++) {
        console.log(access[i]);
        if (access[i].id !== id) {
          access[i].style.display = "none";
        }
      }

      title.setAttribute("contentEditable", "true");
      body.setAttribute("contentEditable", "true");
      title.style.backgroundColor = "darkgray";
      body.style.backgroundColor = "darkgray";
      submitButton.style.display = "block";
      deleteButton.style.display = "block";
      cancelButton.style.display = "block";

//[Patch Request]===================================================================================
      let sendNewInfo = async () => {
        let editHeader = document.getElementById("title").textContent;
        let editMiddle = document.getElementById("body").textContent;
        let editsMade = document.getElementById("postEdit");
        editsMade.style.display = "block";

        const changedPost = {
          post_id: id,
          title: editHeader,
          post: editMiddle,
        };

        await fetch(`/home/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changedPost),
        });
      };

//[Delete Request]==========================================================================================
      let removePost = async () => {
        let remove = document.getElementById("approvedDelete");
        remove.style.display = "block";

        await fetch(`/home/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      };

      submitButton.addEventListener("click", sendNewInfo);
      deleteButton.addEventListener("click", removePost);
      cancelButton.addEventListener("click", () => {
        title.setAttribute("contentEditable", "false");
        body.setAttribute("contentEditable", "false");
        title.style.backgroundColor = "darkgray";
        body.style.backgroundColor = "darkgray";
        submitButton.style.display = "none";
        deleteButton.style.display = "none";
        cancelButton.style.display = "none";
        const access = document.querySelectorAll(".post");
        for (let i = 0; i < access.length; i++) {
          access[i].style.display = "block";
        }
      });
    });
  }
};

//[Patch Function]==================================================================================
let approvedEdit = () => {
  let newBox = document.createElement("div");
  newBox.setAttribute("id", "postEdit");

  let editPost = document.createElement("div");
  editPost.setAttribute("class", "Edits-Made");
  newBox.append(editPost);

  let header = document.createElement("div");
  header.textContent = "Title Changed, Please Stop Making Mistakes";
  header.setAttribute("id", "editHeader");
  editPost.append(header);

  let fixBody = document.createElement("div");
  fixBody.textContent = "Text Field Updated";
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

//[Delete Function]==================================================================================
let removeContent = () => {
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

//[New Post]=======================================================================================
const generatePost = () => {
  const newPost = document.createElement("div");
  newPost.setAttribute("id", "new-post");

  const postHeader = document.createElement("div");
  postHeader.setAttribute("id", "post-header");
  postHeader.textContent = "Generate Post";
  newPost.append(postHeader);

  const newPostBox = document.createElement("form");
  newPost.append(newPostBox);

  const newUser = document.createElement("input");
  newUser.setAttribute("id", "newUser");
  newUser.setAttribute("placeholder", "Username");
  newUser.setAttribute("required", "");
  newPostBox.append(newUser);

  const messageTitle = document.createElement("input");
  messageTitle.setAttribute("id", "messageTitle");
  messageTitle.setAttribute("placeholder", "Title");
  newPostBox.append(messageTitle);

  const textBox = document.createElement("textarea");
  textBox.setAttribute("id", "bodyText");
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
    let databasePost = async () => {
      let posterValue = document.getElementById("newUser").value;
      let titleValue = document.getElementById("messageTitle").value;
      let textValue = document.getElementById("bodyText").value;

      const newPost = {
        username: posterValue,
        title: titleValue,
        post: textValue,
      };

      await fetch("/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    };
    databasePost();
  });
};
generatePost();

//[Search Bar]========================================================================================================

//[Games]=============================================================================================================
//[Upgrades]==========================================================================================================

