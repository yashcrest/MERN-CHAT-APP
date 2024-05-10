# Tools will be using

`redux`
`tailwind`
`typeScript` - need to be implemented

### To do (Features implementation tracker)

- form data is successfully being sent into backend ✅
- redux toolkit implementation ✅
- aysnc Thunk implementation for sending data into backend ✅
- form validation - will be using formik and yup packages for validation. will use formik form. ✅
- protected routes for /chat , /profile ✅
- use formik in login page too ✅
- send data from login page into redux store ✅
- clear user login form if invalid username and password has been entered. ✅
- after logged in do not route to login page when clicked on "chat app" on navbar.
- built logout logic.
- built profile and logout route.

### Notes

- move browserRouter , routes logic into main.jsx to for better control over protected and public routes. ✅
- {fetchBaseQuery} is from `@reduxjs/toolkit/query/react` and works the same was axios does. need to use this to for calling backend instead of asynCreateThunk
