[x] fix issue where when i click logout it doesn't delete user object in localstorage
[x] sometimes when i click login it doesnt refresh the page to go to homepage
[x] create a sign up page
[] when the user signs up check if there is another user with the same email in db
[] having sign up fetch at http://localhost:3000/users will make a new user in the db
  - when creating the backend api change the endpoint in UserService.js
[x] find out how to display the user's email on the homepage
[x] when logging out remove token from localstorage
[] do something with redux store items still being there after logout
[] store hashed password in db
[] have alerts that notify the user if the email is already taken or the password correct, etc

- Steps sign up a new user
  1. user input username and password and password confirmation. As they are submitting, since there is a controlled form we have all the inputs stored in the state
  2. They press signup (Submitting). We dispatch an action that will send the state info to the backend. The backend will tell us if we have a user w/ that username and password.
     1. The backend will confirm or deny the user attempting to signup.
     2. If SUCCESS: generate a jwt token and store it in the users local storage, store the users info in local storage, and dispatch a action to reducer and change inital state w/ new user obj
     3. If FAIL (There already a user signed up with that username or no inputted username / password / password confirmation): Give user an error alert and send them back to signup page
  3. If the user signs up correctly send them to homepage