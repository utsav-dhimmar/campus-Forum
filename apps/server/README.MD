## Environment Variable

1. PORT
2. MONGODB_URI
3. REFRESH_TOKEN
4. ACCESS_TOKEN


## Routes

> **NOTE** base url `locahost:8000`

### users

| route                          | method | description                   | require values                                           | Note |
| ------------------------------ | ------ | ----------------------------- | -------------------------------------------------------- | ---- |
| `/api/users/signup`            | `POST` | Signup the user               | `username`, `email`, `password`, `department` (optional) | -    |
| `/api/users/login`             | `POST` | Sign in the user              | `email`, `password`                                      | -    |
| `/api/users/logout`            | `POST` | logout the user               |                                                          | -    |
| `/api/users/me`                | `GET`  | Get the info of the user      |                                                          | -    |
| `/api/users/new-refresh-token` | `GET`  | Generates a new refresh token |                                                          | -    |



### posts

| route                       | method   | description             | require values     | Note                          |
| --------------------------- | -------- | ----------------------- | ------------------ | ----------------------------- |
| `/api/posts`                | `POST`   | Create a new post       | `body` post body   | only logged in users          |
| `/api/posts/`               | `GET`    | Get all posts           | -                  | only logged in users          |
| `/api/posts/:postId`        | `GET`    | Get the Post by Post Id | post               | only logged in users          |
| `/api/posts/:postId`        | `DELETE` | Delete post by id       |                    | post must belongs to the user |
| `/api/posts/answer/:postId` | `POST`   | Answer the question     | `body` answer body | post a answer                 |

### answer

| route                 | method   | description       | require values | Note                 |
| --------------------- | -------- | ----------------- | -------------- | -------------------- |
| `/api/answer/:postId` | `GET`    | Get the answer    | -              | only logged in users |
| `/api/answer/:postId` | `DELETE` | Delete the answer | -              | only logged in users |