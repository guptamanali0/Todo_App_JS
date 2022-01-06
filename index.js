
const allCardHolder = [];   // Globally Declared Array For Creating Cards On click Of Plus Button
let selectedIndividualCard;   // help To put object inside particular array element of allCardHolder Array


// Function that check is Array Empty or Not if empty "Then No Items in Todo List Will Render"
function checkEmptyList() {
  if (allCardHolder.length > 0) {
    document.getElementById("noTodo").style.display = "none";
  } else {
    document.getElementById("noTodo").style.display = "block";
  }
}


//Template for showing pop-up to add Item and on click of plus button , and blur the background
function handleAddCloseToggle(id) {
  document.getElementById('blur').classList.toggle('active')
  var popup = document.getElementById(id);
  popup.classList.toggle("active");
}


//Function to Remove element of Array (DELETE ICON CODE)
function removeToDo(item) {
  let handleRemoveKey = item.parentNode.parentNode;
  const cardToRemoveKey = handleRemoveKey.getAttribute("data-key");
  // allCardHolder.splice()
  for (let data = 0; data < allCardHolder.length; data++) {
    if (allCardHolder[data].id == cardToRemoveKey) {
      allCardHolder.splice(data, 1);
    }
    // remove child from node as well ;
    handleRemoveKey.parentNode.removeChild(handleRemoveKey);
    checkEmptyList();
  }
}


// Function For marking Mark completed , basically it will match array of object subcardHolder and inside that match ID and Mark that as completed  and marked complete to 
function handleMarkCompleted(markElement) {
  markElement.parentNode.setAttribute("class", "card-item card-item-checked");
  let grandParentId =
    markElement.parentNode.parentNode.parentNode.getAttribute("data-key");
  let parentId = markElement.parentNode.getAttribute("data-key");

  for (let item = 0; item < allCardHolder.length; item++) {
    if (allCardHolder[item].id == grandParentId) {
      for (
        let data = 0;
        data < allCardHolder[item].subCardHolder.length;
        data++
      ) {
        if (allCardHolder[item].subCardHolder[data].id == parentId) {
          allCardHolder[item].subCardHolder[data].marked = true;
        }
      }
    }
  }
}


// Function to Add  List Items to individual cards
// 1.on the basis of globally (selectedIndividual Card) we will push object ({name,id,marked}) in subCardHolder  and append that to list
// 2.we will call handleAddCloseToggle Function (just beacuse pop-up is rendering , and we want to close that)
function addListItemToIndividualCard() {
  let subListHeading = document.getElementById("subListHeading").value;
  let list = selectedIndividualCard.parentNode.parentNode.childNodes[2];
  let selectedIndividualCardParentKey =
    selectedIndividualCard.parentNode.parentNode.getAttribute("data-key");
  let node = document.createElement("li");
  node.setAttribute("class", "card-item");
  node.setAttribute("data-key", Date.now());
  node.innerHTML = ` ${subListHeading}<button class = 'markDone' onclick="handleMarkCompleted(this)">Mark Done</button>`;

  for (let item in allCardHolder) {
    let match = allCardHolder[item].id;

    if (match == selectedIndividualCardParentKey) {
      allCardHolder[item].subCardHolder.push({
        name: subListHeading,
        id: node.getAttribute("data-key"),
        marked: false,
      });
    }
  }
  handleAddCloseToggle("popAddItem");
  list.append(node);
}



//1. Since we are using list.append , so for creating every time new array elements we have to remove previous list items from list
//2.we will have to make list items that is card every time from 0 to length to cardHolder Array
//3. since we are making cards every time(from 0 to cardHolder array length) on addition of new card , we have to  render list-items with markdown  button code again

function addItemInIndividualCard(item) {
  handleAddCloseToggle("popAddItem");
  selectedIndividualCard = item;
}

function renderAllCardHolder() {
  const list = document.querySelector(".flex-row-list");
  let child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let item = 0; item < allCardHolder.length; item++) {
    let individualCard = document.createElement("div");

    individualCard.setAttribute("class", "card");
    individualCard.setAttribute("data-key", allCardHolder[item].id);
    individualCard.innerHTML = `<p class="card-heading" onclick="redirect(this)">${allCardHolder[item].cardInputText}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'btn-add' onclick="addItemInIndividualCard(this)"><i class="fa fa-plus-circle"></i></p>
      </div>`;
    list.append(individualCard);

    let currentSubCard = allCardHolder[item];
    for (let data = 0; data < currentSubCard.subCardHolder.length; data++) {
      const holdText = currentSubCard.subCardHolder[data];
      let classToPut = holdText.marked
        ? "card-item card-item-checked"
        : "card-item";
      let renderClass = holdText.marked
        ? ""
        : '<button class = "markDone" onclick="handleMarkCompleted(this)">Mark Done</button>';
      const listNode = document.createElement("li");
      listNode.setAttribute("class", classToPut);
      listNode.innerHTML = `${holdText.name} ${renderClass}`;
      individualCard.childNodes[2].append(listNode);
    }
  }
}

// This Function basically add elements to the array that is add card to array
// or create format ([{cardInputText,subCardHolder,id},{cardInputText,subCardHolder,id},{cardInputText,subCardHolder,id}])
function addTodo() {
  handleAddCloseToggle("pop");
  const cardInputText = document.getElementById("listHeading").value;
  allCardHolder.push({
    cardInputText,
    subCardHolder: [],
    id: Date.now(),
  });
  checkEmptyList();
  renderAllCardHolder();
}
