# ToDo (base)
------
- [] user input field for shelf items on user.html
- [] append items to dom so both users and non users and view
- [] create post route for appending shelf items
- [] create controller for index view that will carry over to user.html view
- [] create second schema with description, user and image url
- []

# Hard Mode
-----------
- [] styling
- [] only logged in users can remove objects from the shelf

# Pro Mode
----------
- [] logged in users can only remove their objects from the shelf
- [] show list of users only to logged in users

# Super Mode
------------
- [] filter output by user (click on a user to only show items by that user)
- [] users can re-order shelf



# Express/Passport Lecture Starting File
Download and run 'npm install' before the lecture as prep. In this lecture, we will build out a user registration page and allow our users to log into our application. Once they are logged in, we will see information returned to us, specific to the user.

## Branches
* `master`: Built using client-side routing with ngRoute instead of full HTML pages. Uses MongoDB.
* `sql_strategy`: Replaces master branch MongoDB with PostGRES for storage of user data. Maintains bcrypt functionality.


## OLD Branches

Historical record keeping, do not use these branches

* **DEPRECATED** `angular-complete`: Angular and MongoDB version as shown to Iota cohort.
* **DEPRECATED** `angular-controlled-login-intro`: Introduces Angular as the login handler. All server communication is handled in an Angular Controller and updates the route/page based on success or failure. Intended for an alternate intro lecture to Passport (as seen in angular-complete and sql_strategy). Uses MongoDB.
* **DEPRECATED** `angular-ctrl-with-routes`: Like `angular-controlled-login-intro` but is built using client-side routing with ngRoute instead of full HTML pages. Uses MongoDB.
