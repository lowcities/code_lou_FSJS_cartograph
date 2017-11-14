# Cartograph

This app is a work in progress and is the final project for my Code Louisville Full Stack JS
class. Currently the app functions as a grocery list creator, with users able to create a personal
grocery list and save it. The ultimate goal of the project is to create a prototype where the
user's grocery list can be then be used to populate a map of a hypothetical grocery store and 
help the user easily find all the items on their list.

## Getting Started

Follow these instructions to get the app up and running on your local machine for development and testing.

### Prerequisites

To run on local machine the following software will need to be installed:
	```
	NPM
	Node.JS
	MongoDB
	```

#### Installing
	Once all project files and Prerequisite software has been downloaded.
	1. Open a new terminal window(MAC)
	2. Navigate to the project folder with in the terminal
	3. Install dependencies by typing: 
	```
	npm install 
	```
	4. Open a new terminal window(MAC) and navigate to the project folder
	5. To start the database, type
	```
	mongod
	```
	6. To start the server go back to the original terminal window and type 
	```
	npm start
	```

	To use app, open a new window in your web browser and navigate to LOCALHOST: 3000.
	When webpage loads, click the REGISTER button and create a new account by filling out the form.
	Once account is created, you will be taken to your profile page where you can begin adding items
	to your list. If you wish to edit or delete an item from your list, click on the item. 
	Editing tools will appear on the right; the pencil icon will allow you to edit the item, the red X
	will allow you to delete the item. Once you are done making your list, click the LOGOUT button
	at the top right of the page to end your session.

## Built with
	Handlebars.JS
	ES6 and JQuery

## Author
	David Low | www.lowcites.com | @lowcites