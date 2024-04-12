# Tools will be using

1. Choosing Redux over Context api

   - more scalable
   - similarity: both can be used to pass on data through out the app
   - context api tends to re-render the whole context even when its not needed, this is where a state management library like redux is useful.

2. Using reduxThunk to send users registration details into backend and nodeJS will handle the upload to MongoDB

Feature implementation to do:
`frontend`

- form data is successfully being sent into backend ✅
- redux toolkit implementation ✅
- aysnc Thunk implementation for sending data into backend ✅
- form validation - will be using formik and yup packages for validation. will use formik form. ✅
- sign in with google
- protected routes for /chat , /profile ✅
- use formik in login page too
- send data into redux from login page
