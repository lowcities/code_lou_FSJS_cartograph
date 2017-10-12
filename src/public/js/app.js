
const mainContent = document.getElementById('main-content');
const addNameBtn = document.getElementById('nameButton');
const nameIntro = document.getElementById('nameInput');
const welcomeMessage = document.getElementById('welcome');
const userContainer = document.getElementById('user-container');
const itemList = document.getElementById('item-list');
const editBtn = document.querySelector('.edit-btn');
const editCol = document.querySelector('.edit-column');


$(document).ready(function() {
    $('#main-content').load('home.html');
});

function getRegister() {
    $('#main-content').load('register.html');
}

function getLogin() {
    $('#main-content').load('login.html');
}

function showEdit() {
    editCol.forEach(item => {
        item.classList.add('edit-column-show');
    
    
});
}


function getProfile(){
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
            console.log("We have verified the user");
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
            renderUser();
            console.log('We have posted the data');
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
    const source = $('#profile-section').html();
    const template = Handlebars.compile(source);

    getUser()
        .then(users => {
            const data = {
                userId: users._id,
                name: users.name,
                groceryList: users.groceryList
            };
            const html = template(data);
            $(userContainer).append(html);
        });
}

