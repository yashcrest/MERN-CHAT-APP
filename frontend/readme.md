# Tools will be using

`redux`

### To do (Features implementation tracker)

- form data is successfully being sent into backend ✅
- redux toolkit implementation ✅
- aysnc Thunk implementation for sending data into backend ✅
- form validation - will be using formik and yup packages for validation. will use formik form. ✅
- sign in with google
- protected routes for /chat , /profile ✅
- use formik in login page too ✅
- send data from login page into redux store ✅
- **login logic** failing as its not handling the state succesfully to send the data of pending, successful or failed properly. need to handle to state properly to change the state of "isUseLoggedIn" properly.
- refactor protected routes and pass on a props of `requireAuth` to distinguish between public and private routes

### Notes

- move browserRouter , routes logic into main.jsx to for better control over protected and public routes. ✅
- {fetchBaseQuery} is from `@reduxjs/toolkit/query/react` and works the same was axios does. need to use this to for calling backend instead of asynCreateThunk
