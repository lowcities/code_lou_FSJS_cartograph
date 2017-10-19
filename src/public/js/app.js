
const mainContent = document.getElementById('main-content');
const addNameBtn = document.getElementById('nameButton');
const nameIntro = document.getElementById('nameInput');
const welcomeMessage = document.getElementById('welcome');
const userContainer = document.getElementById('user-container');
const itemList = document.getElementById('item-list');
const editBtn = document.querySelector('.edit-btn');
const editCol = document.querySelector('.edit-column');
const profileSection = document.getElementById('profile-section');
const groceryList = document.querySelectorAll('.list-group');
const editItemValue = document.getElementsByClassName('item-name-edit');
const editItemForm = document.getElementsByClassName('item-edit-form');



$(document).ready(function() {
    $('#main-content').load('home.html');
});

function getRegister() {
    $('#main-content').load('register.html');
}

function getLogin() {
    $('#main-content').load('login.html');
}

// toggle edit tools for each list item when edit button is clicked
function showEdit() {
    let groupLi = document.getElementsByClassName('edit-column');
    let itemArray = Array.prototype.slice.call(groupLi);
    for (let i = 0; i < itemArray.length; i ++) {
        $(itemArray[i]).toggleClass('active');
        
    }
}

// edit item on groceryList. Function takes item id as a parameter
function editItem (id) {
    // find the item being clicked on grocery list
    const item = window.fileList.find(users => users._id === id);
    // collect all item names
    const groceryItem = document.getElementsByClassName('item-name');
    // if we find an item that matches the given id
    if (item) {
        // get the index value of item in groceryList array
        let itemIndex = window.fileList.indexOf(item);
        console.log(itemIndex);
        console.log(editArray[itemIndex]);
        // access the appropriate edit form related to list item
        let currentForm = editArray[itemIndex];
        // get the name of the item to be edited
        let currentItem = groceryItem[itemIndex];
        // loop through all the edit forms
        for (let i = 0; i < editItemForm.length; i++) {
            // when we land on the item to be edited
            if( i === itemIndex) {
                // give the empty input field of the edit form the value of item before it's edited
                $('.item-name-edit').val(item.itemName);
                // show the edit form
                currentForm.classList.add('show-edit-form');
                // hide the list item, allowing the edit form to sit in it's place
                currentItem.style.display = 'none';
            } else {
                // hide all other edit forms
                editArray[i].classList.remove('show-edit-form');
                // show all other list items
                groceryItem[i].style.display = "inline-block";
            }
        }
     }
}

function updateItem(itemId) {
    const item = window.fileList.find(users => users._id === itemId);
    let itemIndex = window.fileList.indexOf(item);
    const userId = window.itemList._id;
    let itemName = "";
    // loop through all of the edit form input fields
    for (let i = 0; i < editItemValue.length; i++) {
        // if we reach the index value of the item to be edited
        if ( i === itemIndex ) {
            // itemName is now the changed input value
            itemName = editItemValue[i].value;
        }
    }
    const itemData = {
        userId: userId,
        itemId: itemId,
        itemName: itemName,
    };
    
    $.ajax({
        type: "PUT",
        url: `/profile/${userId}/list/${itemId}`,
        data: JSON.stringify(itemData),
        dataType: 'json',
        contentType: 'application/json'                 
    })
        .done(function(response) {
            console.log('We have posted the data');
            renderUser();
        })
        .fail(function(error) {
            console.log('Post failed', error);
        })
        console.log("File Data", itemData);
}

function getProfile () {
    let email = $('#loginEmail').val();
    let password = $('#loginPassword').val();
    let userData = {
        email: email,
        password: password
    };

    $.ajax({
        type: "POST",
        url: '/login',
        data: JSON.stringify(userData),
        dataType: 'json',
        contentType: 'application/json',    
    })
        .done(function(response) {
            console.log("We have verified the user:", response);
            window.currentUser = response;
            $('#main-content').addClass('hide-content');
            renderUser();
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}

function addUser() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    const itemData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword

    };
    console.log(itemData);
    // const nameTemplate = $('#userName').html();
    // const nameTemplateScript = Handlebars.compile(nameTemplate);

    $.ajax({
        type: "POST",
        url: '/register',
        data: JSON.stringify(itemData),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            if (typeof data.redirect == 'string') {
                window.location = data.redirect;

            }  
        }      
    })
        .done(function(response) {
            console.log("We have posted a new user");
            refreshProfileDb();
            
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}

function addItem(userId) {
    console.log(userId);
    const user = userId;
    const item = $('#itemName').val();
    const fileData = {
        _id: user,
        itemName: item
       };

    $.ajax({
        type: "PUT",
        url: `/profile/${userId}`,
        data: JSON.stringify(fileData),
        dataType: 'json',
        contentType: 'application/json'                 
    })
        .done(function(response) {
            console.log('We have posted the data');
            renderUser();
        })
        .fail(function(error) {
            console.log('Post failed', error);
        })
        console.log("File Data", fileData);
   
}

function getUser() {
    return $.ajax('/profile')
        .then(res => {
            console.log("Results from getUser()", res);
            return res;
        })
        .fail(err => {
            console.log('Error in getUser()', err);
            throw err;
        });
}

function renderUser() {
    const source = $(profileSection).html();
    const template = Handlebars.compile(source);

    getUser()
        .then(users => {

            // create an array on the window element of all grocery items for user
            window.itemList = users;
            window.fileList = users.groceryList;
            console.log(users.groceryList);

            const data = {
                userId: users._id,
                name: users.name,
                groceryList: users.groceryList
            };
            const html = template(data);
            $(userContainer).html(html);
            
        });
}

