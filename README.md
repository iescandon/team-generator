# Team Generator ![GitHub license](https://img.shields.io/badge/license-MIT%20License-blue.svg)

# Live Site

https://iescandon.github.io/team-generator/

## Description

This application is designed to function as a team generator. The user utilizes a CLI to create a webpage comprising of the team roster which includes relevant information for each team member. The user is initially prompted to enter information about the team manager including the number of members on that manager's team. Depending on the number given, the user will then be prompted to enter the information for each team member. When the user has completed building the team, the appliation will create an html file with all of the team information provided.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [Credits](#credits)
-   [Tests](#tests)
-   [Questions](#questions)

## Installation

In order to install this project, you must login to GitHub and go to github.com/iescandon/team-generator. Once there you will click on the green button that says clone or download. You will be given choices on how to download: using the ssh/html key or downloading the zip file.

Using SSH/HTML Key: You will copy the link shown and open up either terminal (mac: pre-installed) or gitbash (pc: must be installed). Once the application is open, you will type git clone paste url here. Once you have cloned the git team-generator repo, cd into the repo and type "open ." to open the folder which contains all files used for the website.

Using Download ZIP: Click on Download Zip. Locate the file and double click it to unzip the file. Locate the unzipped folder and and open it. All the files for the website will be within this folder. Click on index.html to open the website in the browser.

## Usage

In order to use this application. You must cd into the team-generator respository via your CLI. Once there, you will need to type in 'npm install' in order to install inquirer and jest. If 'npm install' did not properly download, type in 'npm install inquirer' to try and download it. If inquirer does not get installed, the prompts will not work. After that is installed, you type in 'node app' to initialize the questions. Answer the following prompts and the 'team.html' file should be created in the 'output' folder team-generator repository.

## License

Copyright (c) [2020][inezescandon]
The license is MIT License.
Read more about it at https://opensource.org/licenses/MIT.

## Credits

Used classroom activities for code inspiration. Worked along with Marc Arguijo towards the end of the the homework.

## Tests

In order to test the code, you must make sure you have installed jest. If you typed in 'npm install' above, it should have downloaded both inquirer (for the prompts) and jest (for tests). You must cd into the team-generator repository via your CLI. Once there you will type in 'npm test'. The tests will initialize and will tell you if the tests have passed or failed. If jest did not get installed properly type in 'npm install jest' to try and download it.

## Questions

If you have any additional questions please contact me at iescan4@gmail.com.
GitHub: https://github.com/iescandon
