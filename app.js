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
let counter = 0;

function promptInit() {
    console.log("Hello! Welcome to the Team Website Generator!");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Type in the name of the manager:",
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is their email?",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is their office number?",
            },
            {
                type: "input",
                name: "counter",
                message: "How many members are on this manager's team?",
            },
        ])
        .then(function (response) {
            console.log(
                "Manager entry complete! Continue to fill out the members on the team."
            );
            employee = response;
            counter = response.counter;
            const manager = new Manager(
                employee.name,
                employee.id,
                employee.email,
                employee.officeNumber
            );
            employeeArray.push(manager);
            promptUser();
        });
}

function promptUser() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message:
                    "Type in the name of the team member you would like to enter into the generator:",
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is their email?",
            },
            {
                type: "list",
                name: "role",
                message: "What is their role?",
                choices: ["Intern", "Engineer"],
            },
        ])
        .then(function (response) {
            employee = response;
            if (response.role === "Intern") {
                promptIntern();
            } else {
                promptEngineer();
            }
        });
}

function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "school",
                message: "What school are they currently attending?",
            },
        ])
        .then(function (response) {
            employee.school = response.school;
            const intern = new Intern(
                employee.name,
                employee.id,
                employee.email,
                employee.school
            );
            employeeArray.push(intern);
            counter--;
            if (counter === 0) {
                console.log(`All entries complete!`);
                renderHTML();
            } else {
                if (counter === 1) {
                    console.log(
                        `Entry complete! ${counter} more entry left to go.`
                    );
                } else {
                    console.log(
                        `Entry complete! ${counter} more entries left to go.`
                    );
                }
                promptUser();
            }
        });
}

function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "github",
                message: "What is their GitHub username?",
            },
        ])
        .then(function (response) {
            employee.github = response.github;
            const engineer = new Engineer(
                employee.name,
                employee.id,
                employee.email,
                employee.github
            );
            employeeArray.push(engineer);
            counter--;
            if (counter === 0) {
                console.log(`All entries complete!`);
                renderHTML();
            } else {
                if (counter === 1) {
                    console.log(
                        `Entry complete! ${counter} more entry left to go.`
                    );
                } else {
                    console.log(
                        `Entry complete! ${counter} more entries left to go.`
                    );
                }
                promptUser();
            }
        });
}

// function promptManager() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "number",
//                 message: "What is their office number?",
//             },
// {
//     type: "list",
//     name: "continue",
//     message: "Would you like to add any more members to your team?",
//     choices: ["Yes", "No"],
// },
// ])
// .then(function (response) {
//     employee.officeNumber = response.number;
//     const manager = new Manager(
//         employee.name,
//         employee.id,
//         employee.email,
//         employee.officeNumber
//     );
//     employeeArray.push(manager);
//     counter--;
//     if (counter === 0) {
//         console.log(`All entries complete!`);
//         renderHTML();
//     } else {
//         if (counter === 1) {
//             console.log(
//                 `Entry complete! ${counter} more entry left to go.`
//             );
//         } else {
//             console.log(
//                 `Entry complete! ${counter} more entries left to go.`
//             );
//         }
//         promptUser();
//     }
// if (response.continue === "Yes") {
//     promptUser();
// } else {
//     renderHTML();
// }
//         });
// }

function renderHTML() {
    const returnedHTML = render(employeeArray);

    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFile(outputPath, returnedHTML, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(
                "File 'team.html' successfully written. It is located in your repository in the 'output' folder"
            );
        });
    } else {
        console.log("Folder 'output' not found.");
        console.log("Creating 'output' folder in current repository...");
        const outputDirPath = __dirname + "/output";
        fs.mkdir(outputDirPath, { recursive: false }, (err) => {
            if (err) throw err;
        });
        renderHTML();
    }
}

promptInit();
