# DevTinde APIS

## authRouter
- POST/singup
- POST/login
- POST/logout

## profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password //Forgot Password API

## connectionRequestRouter
- POST /request/send/:status/:userId

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId

- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

## userRouter
- GET/user/connections
- GET/user/request/received
- GET/user/feed - Gets you the profiles of other user on plateform

Status: ignored, interested, accepeted, rejected