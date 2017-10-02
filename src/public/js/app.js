
const nameInput = document.getElementById('name');
const button = document.getElementById('nameButton');
const nameIntro = document.getElementById('nameInput');
const welcomeMessage = document.getElementById('welcome');
const listContainer = document.getElementById('list-container');
const itemList = document.getElementById('item-list');

// Info entered eg. Name, grocery items
var userInfo = {
    "name" : nameInput
}

// Handlebars templates
const nameTemplate = $('#userName').html();
const listTemplate = $('#groceryList').html();

const nameTemplateScript = Handlebars.compile(nameTemplate);
// const listTemplateScript = Handlebars.compile(listTemplate);

// Adds name from nameInput value
button.addEventListener('click', () => {
    let name = nameInput.value;
    userInfo.name = name;
    if (!name) {
        let error = `<h2>Please enter a valid name</h2>`;
        welcomeMessage.innerHTML = error;
    } else {
        let nameHTML = nameTemplateScript(userInfo);
        nameIntro.classList.add('fade');
        welcomeMessage.innerHTML = nameHTML;
    }
    welcomeMessage.classList.add('show-welcome');
    itemList.classList.add('item-list-show');
    refreshListDb();
});


function addItem() {
    const item = $('#item-name').val();
    const itemData = {
        itemName: item
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
            refreshListDb();
        })
        .fail(function(error) {
            console.log("It didnt post.", error);
        });
}
    
// Retrieve information from the database
function getLists() {
    return $.ajax('/api/list')
      .then(res => {
        console.log("Results from getLists()", res);
        return res;
      })
      .fail(err => {
        console.log("Error in getLists()", err);
        throw err;
      });
  }

function refreshListDb() {
    const listTemplate = $('#list-template').html();
    const compiledTemplate = Handlebars.compile(listTemplate);
  
    getLists()
      .then(lists => {
        const data = {lists: lists};
        const html = compiledTemplate(data);
        $(listContainer).append(html);
        
      });
  }

// window.addEventListener('load', refreshListDb);
