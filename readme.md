# project

- [project](#project)
  - [description](#description)
  - [Pages](#pages)
  - [backend routes](#backend-routes)
  - [possible DB Schema](#possible-db-schema)
  - [future enhancement](#future-enhancement)

Campus Forum / College Forum

## description

<!--test pass Abc@123456-->

- As it name suggest "Forum" but for the College , users ( students ) ask question to the all other students / faculty members that is related to the college , academic , activity in college or solve doubts from other students or faculty members and other student can answer those question.

## Pages

1. registration
2. login
3. me -> users info and their questions
4. ask -> user can ask the question
5. ask/questionId -> show question info and their answers

## backend routes

- possible backend routes

1. `/singup` (POST) - sign up in forum (create an account)
2. `/login` (POST) - login the user
3. `/logout` (POST) - logout the user
4. `/me` (GET) - get info of the user
5. `/new-refresh-token` - (GET) - generates a new refresh token
6. `/post` (POST) - ask the question
7. `/post` (GET) - get all the question
8. `/post/:postId` - (POST/GET) - get the question and post a new answer

## possible DB Schema

1. user
   1. \_id
   2. username
   3. email
   4. password
   5. department
   6. refreshToken
2. question / post
   1. \_id
   2. question
   3. author / user
3. Replies
   1. \_id
   2. author
   3. post \_id

## future enhancement

1. More features like
   1. question upvoting
   2. Mark as complete
   3. Auto close discussion after some time
2. Moderation in forum
