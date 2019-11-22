const request = require("supertest");
const server = require("../api/server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// let token;

// beforeAll(done => {
//   request(server)
//     .post("/api/auth/login")
//     .send({ username: "pere", password: "1234" })
//     .end(function(err, res) {
//       token = res.body.token; // Or something
//       console.log(res);
//       done();
//     });
// });
describe("/api/stories", () => {
  describe("GET all stories", () => {
    it("returns status 200 OK", () => {
        let token = jwt.sign(
          {
            subject: process.env.TESTING_USERNAME_ID,
            username: process.env.TESTING_USERNAME
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
      const expectedStatusCode = 200;
      return request(server)
        .get("/api/stories/")
        .set("Authorization", token)
        .then(response => {
          expect(response.status).toBe(expectedStatusCode);
        });
    });
  });
});
