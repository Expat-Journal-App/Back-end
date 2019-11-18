# Back-end

run `npm i` > install dependencies
run `npm run migrate` > creates the table and columns
run `npm run seed` > adds data to teh table so you can play with
run `npm start` > starts the server so it can listen to front end requests with Axios.

You should then have a story to play with when calling the GET `http://localhost:4400/api/stories` endpoint. Returns an array of objects (for now only 1..)
