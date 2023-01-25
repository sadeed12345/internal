# m2c-biomechanics-backend
 
---

## Login 

### /user/login

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:6091/user/login
Description: Here user will provide valid email address and password to login
```

**_Body:_**

```js
{
"email":"a.nazir@gmail.com",
"password":"abcd"
}

**_Sample Response:_**

```js
{
    "userId": 4,
    "email": "a.nazir@gmail.com",
    "status": true,
    "createdDate": "2022-08-12T08:24:30.672Z"
}
```

**_Status Code:_** 200

<br>

### /user/register

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:6091/user/register
Description: Here user will provide valid email address and password with AtLeast 6 characters in length contain at least 1 small case, 1 Upper case and at least 1 number or special character
```

**_Body:_**

```js
{
"email":"a.nazirr@gmail.com",
"password":"aaaaaA1"
}

**_Sample Response:_**

```js
{
    "userId": 4,
    "email": "a.nazir@gmail.com",
    "message": "Success"
}
```

**_Status Code:_** 200

<br>

## User

### /user/logout

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:6091/user/logout
Description: Client session will expire when this api call and user logout from system
```

**_Body:_**

```js
{
	"loggedUserId":4
}

**_Sample Response:_**

```js
{
    "message": "Success"
}
```

**_Status Code:_** 200

<br>

[Back to top](#m2c-biomechanics-backend)

> Made with &#9829;
> 