const nameInput = document.getElementById('name');
const button = document.getElementById('nameButton');

// Info entered eg. Name, grocery items
var userInfo = {
    "name" : nameInput
}

// Handlebards templates
const nameTemplate = $('#userName').html();
const listTemplate = $('#groceryList').html();

const nameTemplateScript = Handlebars.compile(nameTemplate);
// const listTemplateScript = Handlebars.compile(listTemplate);

// Adds name from nameInput value
button.addEventListener('click', () => {
    let name = nameInput.value;
    userInfo.name = name;
    let nameHTML = nameTemplateScript(userInfo);
    $(document.body).append(nameHTML);
});

function getFiles() {
    return $.ajax('/api/file')
      .then(res => {
        console.log("Results from getFiles()", res);
        return res;
      })
      .fail(err => {
        console.log("Error in getFiles()", err);
        throw err;
      });
  }

function refreshFileList() {
    const template = $('#list-template').html();
    const compiledTemplate = Handlebars.compile(template);
  
    getFiles()
      .then(files => {
        const data = {files: files};
        const html = compiledTemplate(data);
        $('#list-container').html(html);
      })
  }

window.addEventListener('load', refreshFileList);
