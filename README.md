# Meetup App for Survivors of Sexual Abuse


## Description 
This app focus of inclusion of survivors of sexual abuse suffering from PTSD symptoms and therefore struggling to be socially active and participate in social events. 
**Why do we need such an app?***
Empirical studies have shown that almost 50% percent of people experienced sexual abuse and violence commit suicide with a abuse prevalence rate for about 10.7% to 17.4% for children. This is a silent pandemic and the key for spreading is isolation. This app gives survivors the opportunity to meet people with similar experience in order to create a more save meeting space.  This app should be accompanied by social workers who also can create events. Participants have also the opportunity to create their own events which are open for others. 

## User Stories

- **Signup**: as an user I can sign into the platform after admin's approval. 
- **Login**: as an user I can login
- **Logout** as an user I can log out
- **Create event** as an user I can create an event
- **Edit event** as an user I can edit an event
- **Delete event** as an user I can delete my own created event
- **View Events** as an user I can see the events as a list showing the events in ascending date order
- **Filter event** as a user I can filter the events according (to the day)  district I chose
- **Edit User** as an user I can edit my profile
- **Delete User** as an user I can also delete my profile
- **Nav bar with help function** as an user I get further contact details and help links in case of mental supportc

### Backlog
- Chat for messaging (Socket.io)
- User role can change
- Events to which a user is going
- Detailed sorting mechanism
- User can upload picture profile (cloudinary)
- User can directly contact certain people, for example admins and social workers in case of emergency.
- SOS button linked to emergency number on the mobile device.

# Client / Frontend

## React Router Routes (React App)

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | Home           | public `<Route>`           | Home page                                                    |
| `/signup`        | Signup           | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`         | Login            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login |
| `/events`     | Events  | anon only `<AnonRoute>`| Shows all events in a list                              |
| `/events/:id` | OneEvent |anon only `<AnonRoute>`| Shows one singular event   
| `/profile/:id/add` | AddEvent   | user only `<PrivateRoute>` | Add,delete update events by user   
| `/about` | About   | public `<PublicRoute>` | information about app                                      | 
 | `/user/:id/logout`         | Logout            | user only `<AnonRoute>`    | Logout form with redirection to home page.

## Components

- Home
- Signup
- Login
- Events
- AddEvent
- Event
- Profile
- About
- OneEvent
- Logout
- Navbar
# Server / Backend

## Models

User model

```
{
	name: { type: String, required: true },
	surname: { type: String },
	date: { type: Date },
	email: {
		type: String,
		required: [true, "Please enter a valid email address"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please provide valid email"],
},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minum password length is 6 characters"],
},
	image: Buffer,
}
```

Event model
```
{
	date: { type: Date, required: true },
	time: { type: String, required: true },
	venueName: {
		type: String,
		trim: true,
		required: true,
	},
	address: {
		street: { type: String, trim: true },
		number: { type: Number },
		district: { type: String, trim: true },
	},
	eventName: {
		type: String,
		trim: true,
	},
	description: { type: String, trim: true },
	image: String,
}
```

# Server/Backend

### user router

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {name, email, password}                                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| DELETE        | `/auth/login/:id`  | {username, password}                                         | 200            | 403          | Delete one specific user by password and username and returns 403 for unauthorised delete request.
| GET        | `/events` | (empty)                                                      | 204            | 404          | Return all events                                           |
| GET        | `/events/:id` | (empty)                                                          | 204            | 404          | Return one event   | POST        |   (empty)  
| POST       | `/events/:id` | (empty)                                                      | 201            | 401          | Checks if fields not empty (422), if event exists (404), and if stores event data in database     | POST        |  (empty)  
| PUT       | `/events/:id` | (empty)                                                      | 200            | 401          | Update one event by user     | POST        |  (empty)  
| DELETE        | `/events/:id` | (empty)                                                      | 202            | 401          | Delete specific event by user     | POST        | (empty)                                                      
---
## Links
### Trello
[Link to  trello board](https://trello.com/b/zBK6jzgH/final-project) or picture of your physical board
### Git
[Server repository Link](https://github.com/vanessasti/soab-app.git)
[Client repository Link](https://github.com/vanessasti/caya-client.git)
### Wire Frame
[Link](https://www.figma.com/file/XHwUNc3VVrCEH1yRpVN0Sj/Figma-Wireframe-mobile?node-id=0%3A1)










