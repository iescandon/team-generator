const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
let employee = {};
const employeeArray = [];

function promptUser() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your ID number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?",
            },
            {
                type: "list",
                name: "role",
                message: "What is your role?",
                choices: ["Intern", "Engineer", "Manager"],
            },
        ])
        .then(function (response) {
            employee = response;
            if (response.role === "Intern") {
                promptIntern();
            } else if (response.role === "Engineer") {
                promptEngineer();
            } else {
                promptManager();
            }
        });
}

function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What school are you currently attending?",
            },
            {
                type: "list",
                name: "continue",
                message: "Would you like to add any more members to your team?",
                choices: ["Yes", "No"],
            },
        ])
        .then(function (response) {
            employee.school = response.name;
            const intern = new Intern(
                employee.name,
                employee.id,
                employee.email,
                employee.school
            );
            employeeArray.push(intern);
            if (response.continue === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        });
}

function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your GitHub username?",
            },
            {
                type: "list",
                name: "continue",
                message: "Would you like to add any more members to your team?",
                choices: ["Yes", "No"],
            },
        ])
        .then(function (response) {
            employee.github = response.name;
            const engineer = new Engineer(
                employee.name,
                employee.id,
                employee.email,
                employee.github
            );
            employeeArray.push(engineer);
            if (response.continue === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        });
}

function promptManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your office number?",
            },
            {
                type: "list",
                name: "continue",
                message: "Would you like to add any more members to your team?",
                choices: ["Yes", "No"],
            },
        ])
        .then(function (response) {
            employee.officeNumber = response.name;
            const manager = new Manager(
                employee.name,
                employee.id,
                employee.email,
                employee.officeNumber
            );
            employeeArray.push(manager);
            if (response.continue === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        });
}

function renderHTML() {
    const returnedHTML = render(employeeArray);

    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFile(outputPath, returnedHTML, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File 'team.html' successfully written.");
        });
    } else {
        console.log("Directory 'output' not found.");
        console.log("Creating output folder directory...");
        const outputDirPath = __dirname + "/output";
        fs.mkdir(outputDirPath, { recursive: false }, (err) => {
            if (err) throw err;
        });
        renderHTML();
    }
}

promptUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
