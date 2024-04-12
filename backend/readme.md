## packages used

1. `mongoose` : to work with the database, creating models.
2. `connect-mongo` : to store sessions in our database, so when the server session in ended, we don't get locked out.
3. `express-session`: for session and cookies.

### Feature implementation

1. Save users login details into db. ✅
2. compare user login details and authenticate properly. might need to use JWT and session to create a valid session for user.
