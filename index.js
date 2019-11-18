const server = require("./api/server");

const port = process.env.PORT || 4400;

server.listen(port, () => {
  console.log(`\n*** Server listening on port ${port} ***\n`);
});
