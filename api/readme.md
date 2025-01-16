## packages used

1. `mongoose` : to work with the database, creating models.
2. `connect-mongo` : to store sessions in our database, so when the server session in ended, we don't get locked out.
3. `express-session`: for session and cookies.

### Feature implementation

1. Save users login details into db. ✅
2. compare user login details and authenticate properly. might need to use JWT and session to create a valid session for user. ✅
3. create messageModel and messageController to handle how the data is saved in DB and how it is flowed into frontend.

## Folders and their meaning

- every route logic will be in Controllers folder (i.e. functions and all)
- In user routes we want to just map the logic from the controller file.

### To do:

- need to change strict: true, when the app is pushed to production in generateToken.js
