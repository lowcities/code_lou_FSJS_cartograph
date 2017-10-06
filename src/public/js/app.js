

const addNameBtn = document.getElementById('nameButton');
const nameIntro = document.getElementById('nameInput');
const welcomeMessage = document.getElementById('welcome');
const listContainer = document.getElementById('list-container');
const itemList = document.getElementById('item-list');

// const listTemplateScript = Handlebars.compile(listTemplate);


// Adds name from nameInput value
// addNameBtn.addEventListener('click', () => {
//     let userName = nameInput.value;
//     userInfo.name = userName;
//     let nameHTML = nameTemplateScript(userInfo);
//     nameIntro.classList.add('fade');
//     welcomeMessage.innerHTML = nameHTML;
//     welcomeMessage.classList.add('show-welcome');
//     itemList.classList.add('item-list-show');
//     addList(userName);
//     refreshListDb();
// });

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
            // refreshListDb();
            
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}

// When user inputs their name it creates a new list
function addList(userName) {
    const itemData = {
        name: userName
    };
console.log(itemData);

    $.ajax({
        type: "POST",
        url: '/api/list',
        data: JSON.stringify(itemData),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(function(response) {
            console.log("We have posted the data");
            // refreshListDb();
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}

function addItem(id) {
    console.log("Edit test", id);
    // let item = $('#item-name').val();
    // const itemData = {
    //     item: item
    // };
    // console.log(itemData);
    // $.ajax({
    //     type: "POST",
    //     url: '/profile',
    //     data: JSON.stringify(itemData),
    //     dataType: 'json',
    //     contentType: 'application/json',
    // })
    //     .done(function(response) {
    //         console.log("We have posted a new item");
    //         // refreshListDb();
            
    //     })
    //     .fail(function(error) {
    //         console.log("Item didnt post.", error);
    //     });
}

// Retrieve information from the database
function getProfile() {
    let email = $('#loginEmail').val();
    let password = $('#loginPassword').val();
    const userData = {
        email: email,
        password: password
       };

       console.log(userData);

       $.ajax({
        type: "POST",
        url: '/login',
        data: JSON.stringify(userData),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(function(response) {
            console.log("We have posted the data");
            // refreshListDb();
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
    
  }

function refreshProfileDb() {
    const listTemplate = $('#list-template').html();
    const compiledTemplate = Handlebars.compile(listTemplate);
  
    getProfile()
      .then(user => {
        
        window.itemList = user;
        
        const data = {user: user};
        const html = compiledTemplate(data);
        $(listContainer).append(html);
        
      });
  }

// window.addEventListener('load', refreshListDb);
