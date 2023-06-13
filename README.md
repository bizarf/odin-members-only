# odin-members-only

# The Odin Project - Project: Members Only

The goal of this project is to make an exclusive clubhouse where members can write anonymous posts. This will demonstrate an understand of the authentication skills learned in another lesson.

[View the live site here](https://odin-members-only-z4hw.onrender.com/)

#### Install:

To run this project on your local server, first install the dependencies with the command:

```
npm install
```

Next you will need to create a ".env" file at the root of the project. You will now need to create a database on MongoDB Atlas. Inside the ".env" file replace the end string with your database's connection string.

```
MONGODB_URL="AMONGODBATLASKEY"
CLUB_PASSCODE="ACODETOLETPEOPLEBECOMEMEMBERS"
ADMIN_PASSCODE="ACODETOALLOWPEOPLETOBECOMEADMIN"
```

After that is done, you can start the server with:

```
npm start
```

<hr>

##### Tools and technologies used:

-   Express Generator
-   Pug
-   Dotenv
-   Mongoose
-   BCrypt JS
-   Passport
