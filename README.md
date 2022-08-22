# Meetup App for Survivors of Sexual Abuse


## Description 
This app focus of inclusion of survivors of sexual abuse suffering from PTSD symptoms and therefore struggling to be socially active and participate in social events. 
**Why do we need such an app?***
Empirical studies have shown that almost 50% percent of people experienced sexual abuse and violence commit suicide with a abuse prevalence rate for about 10.7% to 17.4% for children. This is a silent pandemic and the key for spreading is isolation. This app gives survivors the opportunity to meet people with similar experience in order to create a more save community.  This app should be accompanied by social workers who also can create events. Participants have also the opportunity to create their own events which are open for others. 

## User Stories
 **Signup**: can sign into the platform after admin's approval. 
- **Login**: can login but also log out at the exit point
- **Logout** can log out
- **Create event** as an user I can add events to the event's list
- **Edit event** as an user I can edit the events
- **Delete event** as an user I can delete my own created event
- **View Events** as an user I can see the events as a list showing the events ascending date order
- **Filter event** as a user I can filter the events according to the day or district and chose the location
- **Edit User** as an user I can edit my profile
- **Delete User** as an user I can also delete my profile
- **Nav bar with help function** as an user I get further contact details and help links in case of mental support

### nice to have
- chat for messaging 
- user role can change
- events to which a user is going
- detailed sorting mechanism
- user can upload picture profile
- user can directly contact certain people, for example admins and social workers and case of emergency.

# Backend
### user profile:
- see my profile
- see an exit point
- user can be removed by admin
### events
- user can create events which are saved in the database and can be seen by others.
- event are filtered and sorted by date and district
- events can be created, deleted and updated by the user
## Frontend


### React Router Routes
bla table

---
## Backend 
### user router

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {name, email, password}                                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |
---


### event Router
| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/home/`     |                                                              | 200            | 404          | Welcome page with Nav bar          |
| GET        | `/home/events` | {date,time, venueName, address{street,number,district}, eventName,description,image}                              | 202            | 404          | Fetch data events and sorts is according to date|
| GET        | `/home/events/:district` |    req.params.district                                     | 200            | 404          | shows events according to district if not send 404 |
|   GET      | `/home/events/:id`  |  req.params.id     |   202        |    404      |   shows one specific event the user is interested in   

