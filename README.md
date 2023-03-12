# Massive Rocket CSV Import

This project demonstrates a CSV data import to MongoDB having bulk data.

## Available Scripts

In the project directory, you can run:

### `npm run client`

To run the react frontend application locally.

### `npm run server`

To run the Node backend application locally.

### `npm run dev`

To run both server and client applications concurrently

### `Git Repo for reference`

**https://github.com/kunalbajaj11/massive-rocket-csv-import.git**


## Concepts Utilised

#### ReactJS : Created functional components and have implemented below hooks:
1. useState
2. useEffect
3. useContext
4. useRef
5. useFetch (custom hook)
6. useMemo

#### Things kept in consideration:
1. Implemented CSS-in-JS (styled components)
2. Also used module css approach (used in wide spread projects)
3. Folder structure to support the apt flow of the application
4. Instead of introducing Redux for state management, implemented context approach
5. Not dirty check and reloads of application (prevented by using memoized values)
6. Instead of blocking user while writing data, instead implemented an update system which will display stats on completion

### NodeJS : Best Practices:
1. Followed MVC design pattern
2. Modules per route created for better code structuring and scalablity (Express Router)
3. Created authorisation middleware for protected routes
4. Implemented JWT authorisation for Login Registeration
5. Created env file as per coding standards to read environment specific variables
6. To support large data files, used streams to work asyncronously (not blocking other flows)

### ExpressJS : Things kept in consideration:
1. Created Models & Schemas following specific types
2. Creating indexes as per requirement (not to insert duplicate records)
3. Used Atlas instead of local instance


## Improvements could have made

Though there is always a room for improvement, listed below are few things which could have been achieved:

1. Route navigation could have been improved
2. Instead of creating own logic for registeration and sessions, could have implemented Auth0
3. Could have implemented mailing service which would fire an email to user updating the completion / failure of upload
4. In React application, lazy loading of coponents could have implemented
5. Could have shown success messages or pushed tooltip messages showing events of upload
6. Validations should have been implemented at both frontend and backend
7. Unit test cases could have been added
8. Proper documentation should be done (using Swagger)


## Snippets for reference explaining the flow of application:

1. Registeration form

2. After successful resiteration, user automaticallly logged in

3. If user sign outs, session invalidated and routed to login page

4. After successful login, routed to home page. It displays a grid having details of previous uploads by all users

5. If a user uploads a file, it adds a record to the grid with status pending (GIF loader image)

6. Behind the scenes, records inserted in Mongo DB and status updated at both backend and frontend

7. Seperate uploads page to display only grid of uploads
