# MBTI Perspective Test

This is a small web application written in ES6 with Node.js and React, serving a simplified
version of a [Myers-Briggs Type Indicator](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator) (MBTI) personality test. 

The landing page displays a list of statements, each of which can be ranked 
on a scale from 1 to 7 by selecting the corresponding radio button, from left to right, respectively. 
A selection of 1 means that the person disagrees strongly with that statement.
If the person ranks a 7, that means they agree strongly with that statement.
A value of 4 means their answer is neutral.

Once the user ranks all presented statements and provides a valid email address, 
their answers are sent to the backend and the user is directed to their results page.
The results page shows the user's Myers-Briggs type together with a simple chart indicating
where they lean on each of the 4 [MBTI dimensions](https://en.wikibooks.org/wiki/Myers-Briggs_Type_Indicator/Dimensions).


The backend API accepts a POST request with the user's answers and their email address and persists this data to a MySQL database. 
The database stores all test questions (i.e. statements) and their association with the MBTI dimensions. This information is
used to compute the test scores and infer the user's MBTI, which are subsequently passed on to the client.  

Backend endpoints:

    GET   /                           - Lists all available endpoints
    GET   /questions                  – Lists all test questions (statements) and keys for their interpretation
    GET   /users                      – Lists all users, their MBTI and individual answers
    GET   /users/findOne?[id, email]  – Finds a user by their id or email
    POST  /users                      – Creates a new user with the email and answers provided in the request body


#### Frameworks and libraries

- Express
- Sequelize
- React
- Bootstrap
- Recharts


## Setting up and running the application locally

1. Make sure you have **Node.js** v10.0+ and **NPM** v6.0+ installed in your development environment.
2. Make sure you have **MySQL Server** v5.7+ installed and running.
3. Open the `mbti-backend` and `mbti-frontend` projects in your IDE and run `npm install` on both.
4. Open `mbti-backend/config.json` and adjust your MySQL connection settings as necessary.
5. Start the backend server by running `npm start` in the backend project directory.
6. Launch the client application by running  `npm start` in the frontend project directory.


### Notes

* The backend creates the database automatically at first run, so no DDL needs to be executed manually.
* To ensure data integrity, the test questions are not defined on the client side but fetched from the backend. 