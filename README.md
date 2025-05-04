# Application parking auto
## Technologies and additional libraries used:
Backend: NestJS, Typescript, passport-jwt, dotenv, class-validator, typeORM and others
Frontend: React, TypeScript, Material UI, dayjs, js-cookie, React Router, Vite and others

## Description
The application involves user registration and authorization, the ability to book parking slots, cancel a reservation, view available slots for booking. To start working with the application, you need to add the necessary environment variables .env according to the sample file .env.example. When you first launch the backend, several test slots will be generated, with which you can interact. To launch and work with the application on each side, use the scripts from the corresponding package.json files.

## Implemented functionality:
+ Registration and authorization (validation of two fields is performed using useState, email is validated using a regular expression, the password must be more than 6 characters).
+ Parking selection. You can select one of the available parking lots with redirection to the booking page.
+ Booking date selection. Designed as a datepicker. However, it is impossible to go to previous months and past days of the current month are not available for selection. Depending on the number of slots booked during the day, the background of the month date is highlighted in one of three colors. Clicking on the date takes you to the slot selection page.
+ Booking time selection. Designed as table elements. However, previously booked slots are not available for interaction. The same applies to the time that has passed since the beginning of the day, provided that the current day is selected. You can select several slots at the same time and then book them all at once after clicking the button.
+ Cancellation of booking. On the page with the datepicker, you can go to a page that shows a list of slots reserved by the user in the previously selected parking lot with the option to.
+ 404 page implemented

## Other features:
+ The layout of the layouts was done using Material UI and subsequent styling of reusable components
+ During authorization and registration, a cookie with a user token is saved, which is applied to requests
+ The parking and user IDs are stored in localStorage (there was no prohibition on this in the technical specifications)
+ There are no unit tests (there was no requirement to write them)

## Screenshots
### Datapicker
![image](https://github.com/user-attachments/assets/f1dd7f1e-5e55-402e-b4bd-03dcb4de3d0e)

### Book slots page
![image](https://github.com/user-attachments/assets/91f7f26c-59ba-468e-842a-7a906e01bc6e)

### My reservations
![image](https://github.com/user-attachments/assets/57805921-d3e0-40b2-98e1-a6eab4992ac6)









