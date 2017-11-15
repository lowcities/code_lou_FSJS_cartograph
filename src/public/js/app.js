
const mainContent = document.getElementById('main-content');
const addNameBtn = document.getElementById('nameButton');
const welcomeMessage = document.getElementById('welcome');
const userContainer = document.getElementById('user-container');
const itemList = document.getElementById('item-list');
const editBtn = document.querySelector('.edit-btn');
const editCol = document.querySelector('.edit-column');
const profileSection = document.getElementById('profile-section');
const groceryList = document.querySelectorAll('.list-group');
const editItemValue = document.getElementsByClassName('item-name-edit');
const editItemForm = document.getElementsByClassName('item-edit-form');
const introContainer = document.getElementById('intro-container');
const groceryListItem = document.getElementsByClassName('show-edit');
const groceryItem = document.getElementsByClassName('item-name');

let isActive = false;

// loads register form to the main window
function getRegister() {
    introContainer.style.display = 'none';
    $('#main-content').load('register.html');
}

// valid email tester function
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

/*  tests password strength. password must contain at least
 1 uppercase and 1 lowercase alphabetical character. 1 numeric character and must be at least
 6 characters long */
function validPassword(password) {
    let strength = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    return strength.test(password);
}

// function that tests is input fields are incomplete
function validField(input, valid) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].value == "" && valid[i].innerHTML === "") {
            valid[i].innerHTML = `Please enter a valid ${input[i].name}`;
            valid[i].classList.add('inValid');
            input[i].classList.add('inValidBorder');
        } else {
            input[i].classList.remove('inValidBorder');
            valid[i].classList.remove('inValid');
            valid[i].innerHTML = "" ;
        }
    }
}

// toggle edit tools for each list item when edit button is clicked
function showEdit() {
    // Array of all grocery list items
    let itemArray = Array.prototype.slice.call(groceryListItem);
    // the hidden edit tool column
    let groupLi = document.getElementsByClassName('edit-column');
    for (let i = 0; i < itemArray.length; i++) {
        // add 'click' event listener to each list item
        itemArray[i].addEventListener('click', function (e) {
            // get the index value of the currently clicked item
            let currentItemIndex = itemArray.indexOf(this);
            // if the edit tools for said item are not showing
            if ( !$(groupLi[currentItemIndex]).hasClass('active') ) {
                // show edit tools
                $(groupLi[currentItemIndex]).addClass('active');
                // if screen width is less than 767px or greater than 1024px
                if (window.innerWidth < 767 || window.innerWidth >= 1024) {
                    // move list item to the left
                    $(itemArray[currentItemIndex]).addClass('active-edit');
                }
                // if the item edit form is showing
            } else if ( editItemForm[i].classList.contains('show-edit-form') ) {
                // keep the edit tools showing
                $(groupLi[currentItemIndex]).addClass('active');
            } else {
                // hide edit tools
                $(groupLi[currentItemIndex]).removeClass('active');
                // move item back to center
                $(itemArray[currentItemIndex]).removeClass('active-edit');
                // hide edit form
                editItemForm[i].classList.remove('show-edit-form');
                // display item name
                groceryItem[i].style.display = "inline-block";
            }
        });
    }
}

/*  Functions for handling HTTP requests including creating Users and adding,
 editing, and deleting items from their grocery list.
======================================================================== */

// function will create a new user profile
function addUser() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    let input = document.getElementsByTagName('input');
    let valid = document.getElementsByClassName('validText');
    const itemData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    validField(input, valid);

    if (isValidEmailAddress(email) === false) {
        valid[1].innerHTML = "Please enter valid email address";
        valid[1].classList.add('inValid');
        input[1].classList.add('inValidBorder');
    } else if (validPassword(password) === false) {
        valid[2].innerHTML = "Password must contain at least one uppercase, lowercase and numeric character and be at least 6 characters long.";
        valid[2].classList.add('inValid');
        input[2].classList.add('inValidBorder');
    } else if (confirmPassword === "" || confirmPassword !== password) {
        valid[3].innerHTML = "Please confirm password match!"
        valid[3].classList.add('inValid');
        input[3].classList.add('inValidBorder');
    } else {
        valid[3].innerHTML = "";
        valid[3].classList.remove('inValid');
        input[3].classList.add('inValidBorder');
    
        console.log(itemData);
        $.ajax({
            type: "POST",
            url: '/register',
            data: JSON.stringify(itemData),
            dataType: 'json',
            contentType: 'application/json'      
        })
            .done(function(response) {
                window.currentUser = response;
                console.log("We have created a new user");
                // navigate to profile page
                document.location.href = '/profile.html';
                
            })
            .fail(function(error) {
                console.log("It didnt post.", error);
            });
    }    
}

// function will verify user login info that has been POSTed 
function getProfile () {
    let email = $('#loginEmail').val();
    let password = $('#loginPassword').val();
    let input = document.getElementsByTagName('input');
    let valid = document.getElementsByClassName('validText');
    let userData = {
        email: email,
        password: password
    };

    validField(input, valid);

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
            // navigate to profile page
            document.location.href = '/profile.html';
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}

// function will GET user profile information
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

/* function will take user to login screen unless a current session exists,
 if a session does exist, user will be redirected to their profile */
function getLogin() {
    introContainer.style.display = 'none';
    $.ajax({
        type: "GET",
        url: '/login',
        success: function (data, textStatus, jqXHR) {
            if (typeof data.redirect == 'string') {
                window.location = '/profile.html';
            }  
        }      
      
    })
    .done(function(response) {
        $('#main-content').load('login.html');
    })
    .fail(function(error) {
    console.log("It didnt post.", error);
    });
}

// function will add(PUT) items to user's grocery list
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

// function will find item to be edited and display a form for that specific item
function editItem (id) {
    // find the item being clicked on grocery list
    const item = window.fileList.find(users => users._id === id);
    // grocery item variable to hide border
    const itemBorder = document.getElementsByClassName('groceryItem');
    // if we find an item that matches the given id
    if (item) {
        // get the index value of item in groceryList array
        let itemIndex = window.fileList.indexOf(item);
        console.log(itemIndex);
        console.log(editItemForm[itemIndex]);
        // access the appropriate edit form related to list item
        let currentForm = editItemForm[itemIndex];
        // get the name of the item to be edited
        let currentItem = groceryItem[itemIndex];
        // if the item edit form is not already showing
        if (!currentForm.classList.contains('show-edit-form')) {
            // place the current item name as a placeholder in the edit form
            $('.item-name-edit').val(item.itemName);
            // show the edit form
            currentForm.classList.add('show-edit-form');
            // hide the list item
            currentItem.style.display = 'none';
            itemBorder[itemIndex].style.borderColor = 'transparent';
        } else {
            // hide the edit form
            currentForm.classList.remove('show-edit-form');
            // show the item name
            currentItem.style.display = 'inline-block';
            itemBorder[itemIndex].style.borderColor = 'black';
        }
    }
}    
     
// function allows user to modify(PUT) items in their list
function updateItem(itemId) {
    // the item to be modified
    const item = window.fileList.find(users => users._id === itemId);
    // the index value of the item to be modified
    let itemIndex = window.fileList.indexOf(item);
    // the current user's db _id
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
            // document.location.href = '/profile.html';
        })
        .fail(function(error) {
            console.log('Post failed', error);
        })
        console.log("File Data", itemData);
}

// function will delete specific items in user's grocery list
function deleteItem(itemId) {
    const userId = window.itemList._id;
    if (confirm("Are you sure?")) {
        $.ajax({
            type: 'DELETE',
            url: `/profile/${userId}/list/${itemId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function(response) {
            console.log("Item", itemId, " is deleted!");
            renderUser();
        })
        .fail(function(error) {
            console.log("Item did not delete");
        });
    }
}

// Function will logout of users account
function getLogout(userId) {
    userId = userId;
    return $.ajax('/logout')
    .then(res => {
        console.log("User has loggd out", res);
        document.location.href = '/index.html';
    })
    .fail(err => {
        console.log('User did not logout', err);
        throw err;
    });
}


//  function will render all current user data to the webpage
function renderUser() {
    console.log('renderUser triggered');
    const source = $(profileSection).html();
    const template = Handlebars.compile(source);
    let listSection; 
    let addItemForm;
    console.log('renderUser triggered');
    getUser()
        .then(users => {

            // create an array on the window element of all grocery items for user
            window.itemList = users;
            window.fileList = users.groceryList;
            console.log(users.groceryList);
            
            // Capitalize the user's name
            let userName = users.name[0].toUpperCase() + users.name.slice(1);
            const data = {
                userId: users._id,
                name: userName,
                groceryList: users.groceryList
            };
            
            const html = template(data);
            $(userContainer).html(html);
            listSection = document.getElementById('list-section');
            addItemForm = document.getElementById('add-item-form');
            if (users.groceryList.length < 1) {
                addItemForm.classList.remove('move-form');
                listSection.classList.remove('show-list');
            } else {
                addItemForm.classList.add('move-form');
                listSection.classList.add('show-list');
            } 
            showEdit();
        });
}

// if url is profile.html, render user profile
if (top.location.pathname === '/profile.html') {
    renderUser();
    
}
