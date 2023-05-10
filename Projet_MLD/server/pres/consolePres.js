const readline = require("readline-sync"); // import readline-sync module
const fs = require("fs");
const chalk = require('chalk');
const business = require('../business/business');
const data = require('../data/dataLayer');

const usersData = fs.readFileSync( __dirname + '/' + '../data/users.json'); // import "users.json" file
const users = JSON.parse(usersData); // parse the array of objects in the "users.json" file

function displayUsersByCountry() {
  // create a map to store the countries and their counts
  const countriesMap = new Map();

  // traverse the "users" array and add the countries and increment their counts in the "countriesMap" map
  for (let i = 0; i < users.length; i++) {
    if (countriesMap.has(users[i].country)) {
      countriesMap.set(users[i].country, countriesMap.get(users[i].country) + 1);
    } else {
      countriesMap.set(users[i].country, 1);
    }
  }

  console.log(countriesMap);
}

function displayUsersByCompany() {
  // create a map to store the companies and their counts
  const companiesMap = new Map();

  // traverse the "users" array and add the companies and increment their counts in the "companiesMap" map
  for (let i = 0; i < users.length; i++) {
    if (companiesMap.has(users[i].company)) {
      companiesMap.set(users[i].company, companiesMap.get(users[i].company) + 1);
    } else {
      companiesMap.set(users[i].company, 1);
    }
  }

  console.log(companiesMap);
}

function getUserInput(action) {
  let id, email, firstName, lastName, company, createdAt, country;
  const Client = data.getAllClients();
  const numberOfClient = Client.length;

  if (action === "addUser") {
    id = numberOfClient + 1;
    
    console.log(chalk.green("What's the email?"));
    email = readline.question("");
    
    console.log(chalk.green("What's the first name?"));
    firstName = readline.question("");
    
    console.log(chalk.green("What's the last name?"));
    lastName = readline.question("");
    
    console.log(chalk.green("What's the company name?"));
    company = readline.question("");
    
    console.log(chalk.green("When was the account created?"));
    createdAt = readline.question("");
    
    console.log(chalk.green("What's the country?"));
    country = readline.question("");
  }

  if (action === "removeUser") {
    console.log(chalk.green("What's the ID of the user to remove?"));
    id = parseInt(readline.question(""));
  }

  if (action === "updateUser") {
    console.log(chalk.green("What's the ID?"));
    id = parseInt(readline.question(""));
    
    console.log(chalk.green("What's the email?"));
    email = readline.question("");
    
    console.log(chalk.green("What's the first name?"));
    firstName = readline.question("");
    
    console.log(chalk.green("What's the last name?"));
    lastName = readline.question("");
    
    console.log(chalk.green("What's the company name?"));
    company = readline.question("");
    
    console.log(chalk.green("When was the account created?"));
    createdAt = readline.question("");
    
    console.log(chalk.green("What's the country?"));
    country = readline.question("");
  }

  return { id, email, firstName, lastName, company, createdAt, country };
}


// Add a user to the list
function addUser() {
    let user = getUserInput("addUser");
    business.addUser(user);
  }
  
  // Remove a user from the list
  function removeUser() {
    let user = getUserInput("removeUser");
    business.removeUser(user.id);
  }
  
  // Update a user in the list
  function updateUser() {
    let user = getUserInput("updateUser");
    business.updateUser(user);
  }
  
  
  // Display the menu and get user input
  function displayMenu() {
    console.log(chalk.red('What would you like to do?\n\
      1: List countries\n\
      2: List companies\n\
      3: Add a user\n\
      4: Remove a user\n\
      5: Update a user\n\
      6: Quit'));
  
    const choice = readline.question('');
  
    switch (choice) {
      case '1':
        displayUsersByCountry();
        break;
      case '2':
        displayUsersByCompany();
        break;
      case '3':
        addUser();
        break;
      case '4':
        removeUser();
        break;
      case '5':
        updateUser();
        break;
      case '6':
        console.log(chalk.green('Goodbye!'));
        process.exit(0);
      default:
        console.log(chalk.red('Invalid choice!'));
        break;
    }
  
    
  }
  
  // Start the app
  displayMenu();




  


