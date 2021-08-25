var todoAll = document.querySelector(".all");
var todoActive = document.querySelector(".current");
var todoCompleted = document.querySelector(".completed");
var clearCompleted = document.querySelector(".clear-completed");
var countItems = document.querySelector(".count-items");

function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");

  db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });

  text.value = "";
}

function getItems() {
  // var size = "";
  // db.collection("todo-items")
  //   .get()
  //   .then((snap) => {
  //     size = snap.size;
  //   });

  // console.log(size);

  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot);
    let items = [];

    // console.log(snapshot.size);
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    clearCompleted.addEventListener("click", () => {
      items.forEach((item) => {
        if (item.status === "completed") {
          db.collection("todo-items").doc(item.id).delete();
        }
      });
    });

    generateItems(items);
  });
}

function generateItems(items) {
  let todoStatus = "";
  let filteredItems = [];
  if (todoActive.classList.contains("active")) {
    items.forEach((item) => {
      if (item.status == "active") {
        filteredItems.push(item);
      }
    });
  } else if (todoCompleted.classList.contains("active")) {
    items.forEach((item) => {
      if (item.status == "completed") {
        filteredItems.push(item);
      }
    });
  } else {
    items.forEach((item) => {
      filteredItems.push(item);
    });
  }

  // console.log(todoStatus);
  let itemsHTML = htmlGenerator(filteredItems);

  countItems.innerHTML = filteredItems.length;
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListener();
}

function htmlGenerator(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    // console.log(item);

    itemsHTML += `
          <div class="todo-item">
            <div class="check">
              <div data-id="${item.id}" class="check-mark ${
      item.status == "completed" ? "checked" : ""
    }">
                <img src="/assets/icon-check.svg" alt="" />
              </div>
            </div>
            <div class="todo-text ${
              item.status == "completed" ? "checked" : ""
            }">
              ${item.text}
            </div>
          </div>
`;
  });

  return itemsHTML;
}

function createEventListener() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id);
    });
  });
}

function markCompleted(id) {
  // console.log(id);
  let item = db.collection("todo-items").doc(id);

  item.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed",
        });
      } else if (status == "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}

function filterEventListener() {
  todoActive.addEventListener("click", () => {
    todoActive.classList.add("active");
    todoAll.classList.remove("active");
    todoCompleted.classList.remove("active");
    getItems();
  });

  todoAll.addEventListener("click", () => {
    todoAll.classList.add("active");
    todoActive.classList.remove("active");
    todoCompleted.classList.remove("active");
    getItems();
  });

  todoCompleted.addEventListener("click", () => {
    todoCompleted.classList.add("active");
    todoAll.classList.remove("active");
    todoActive.classList.remove("active");
    getItems();
  });
}

filterEventListener();
getItems();
