# Getting Started

This is an email api fully built with `TypeScript` and `Node`, it keeps track of imaginary inboxes and the emails that get sent between them.

To install and run locally, clone the repo then:

    $ npm run dev


### Authentication

All routes in under this api require full authentication, before making any
request ensure that you create an account then sign in

* http://localhost:5000/signin or
* https://prj-email-api.herokuapp.com/signin

## ENDPOINTS

Base url `http://localhost:5000/` or `https://prj-email-api.herokuapp.com/` 
<br>

The mail routes are designed as presented

|ROUTE|METHOD|
| --- | --- | 
| /signup| POST | 
| /signin| POST | 
| /signout | POST | 


<br>

The mail routes are designed as presented

|ROUTE|METHOD|FUNCTION|
| --- | --- | --- |
| /mail/send | POST | Sends email |
| /mail/get | GET | Gets user emails |
| /mail/delete/:id | DELETE | Deletes email `WHERE id == req.params.id` |
| /mail/trash | GET | Gets user deleted emails |
| /mail/trash/recover/:id | PUT | Recovers email from trash `WHERE id == req.params.id` |

<br>

The labels routes are designed as presented

|ROUTE|METHOD|FUNCTION|
| --- | --- | --- |
| /labels/create | POST | Creates a label |
| /labels/delete/:name | DELETE | Deletes a label `WHERE name == req.params.name` && `user.id == req.user.id` |
| /labels/:name/attach/:EId | PUT | Finds email `WHERE email.id == req.params.EId` and attaches label `req.params.name` to it |
| /labels/:name/remove/:EId | DELETE | Removes `req.params.name` label `WHERE email.id == req.params.EId` |
| /labels/:name | GET | Returns all emails under the `req.params.name` label |

<br>

## REQUEST DATA, BODY AND PARAMS

To create and provide the most reliable data, the api depends on `Passport JS` and `Bcrypt`.
Each authenticated request provides information about the user and this is made possible through the Passport middleware.
<br>

To ensure the authenticity of each request, the api depends on the result of `req.isAuthenticated()`. 
If the result confirms that request is authenticated, the identity of the user requesting such data is 
then pulled from the session data through `req.user`. 
This allows us to trust and therefore procees and send through protected data to the authorised user.

<br>

# API REFERENCE

## REQUEST
Create an account
<br>

POST `/signup` <br>
HTTP/1.1 <br>
Content-Type: application/json


```js
{
    name: "william"
    email: "william@gmail.com",
    password: "123"
}
```

<br>

## REQUEST
Log into your account
<br>

POST `/signin` <br>
HTTP/1.1 <br>
Content-Type: application/json


```js
{
    email: "william@gmail.com",
    password: 123
}
```

<br>

## REQUEST
Log out of your account
<br>

POST `/signout` <br>
HTTP/1.1 <br>
Content-Type: application/json

<br>

## REQUEST 
Get all emails in your inbox

<br>

GET `/mail/get` <br>
HTTP/1.1 <br>
Content-Type: application/json

<br>


## REQUEST
Send an email
<br>

POST `/mail/send` <br>
HTTP/1.1 <br>
Content-Type: application/json


```js
{
    subject: "Reminder"
    message: "You're doing great!",
    recipients: ["self@gmail.com", "you@gmail.com"]
}
```

<br>

## REQUEST
Delete an email
<br>


DELETE `/mail/delete/{id}` <br>
HTTP/1.1 <br>
Content-Type: application/json

<br>

## REQUEST
Get all deleted emails
<br>


GET `/mail/trash` <br>
HTTP/1.1 <br>
Content-Type: application/json

<br>


## REQUEST
Recover an email
<br>


PUT `/mail/trash/recover/{id}` <br>
HTTP/1.1 <br>
Content-Type: application/json

<br>

## REQUEST
Create a label
<br>


POST `/labels/create` <br>
HTTP/1.1 <br>
Content-Type: application/json

```js
{
    name: "important"
}
```
<br>

## REQUEST
Delete a label
<br>


DELETE `/labels/delete/{name}` <br>
HTTP/1.1 <br>
Content-Type: application/json


<br>

## REQUEST
Attach a label to email
<br>


PUT `/labels/{name}/attach/{EId}` <br>
HTTP/1.1 <br>
Content-Type: application/json


<br>

## REQUEST
Remove label from email
<br>


DELETE `/labels/{name}/remove/{EId}` <br>
HTTP/1.1 <br>
Content-Type: application/json


<br>

## REQUEST
Get all emails with label
<br>


GET `/labels/{name}` <br>
HTTP/1.1 <br>
Content-Type: application/json


<br>


