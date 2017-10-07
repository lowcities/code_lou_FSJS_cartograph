

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
            refreshProfileDb();
            
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

function addItem(userId) {
    console.log(userId);
    const user = userId;
    const item = $('#itemName').val();
    const fileData = {
        _id: user,
        itemName: item
       };
        let method, url;
    if (fileData._id) {
        method =  'PUT';
        url = '/profile/' + fileData._id;
    } else {
        method = 'POST';
        url = '/profile';
    }

    $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(fileData),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(function(response) {
            console.log('We have posted the data');
        })
        .fail(function(error) {
            console.log('Post failed', error);
        })
        console.log("File Data", fileData);
   
}


function refreshProfileDb() {
    // const listTemplate = $('#list-template').html();
    // const compiledTemplate = Handlebars.compile(listTemplate);
  
    getProfile()
      .then(users => {
        
        window.fileList = users;
        
        const data = {users: users};
        const html = compiledTemplate(data);
        $(listContainer).append(html);
        
      });
  }

// window.addEventListener('load', refreshProfileDb);
