const request = require("supertest");
const server = require("../api/server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let token;

beforeAll(() => {
  token = jwt.sign(
    {
      subject: process.env.TESTING_USERNAME_ID,
      username: process.env.TESTING_USERNAME
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
});

describe("/api/stories", () => {
  describe("GET all stories", () => {
    it("returns status 200 OK", () => {
      const expectedStatusCode = 200;
      return request(server)
        .get("/api/stories/")
        .set("Authorization", token)
        .then(response => {
          expect(response.status).toBe(expectedStatusCode);
        });
    });
    it("should return a JSON object when returning stories", () => {
      request(server)
        .get("/api/stories/")
        .set("Authorization", token)
        .then(response => {
          expect(response.type).toEqual("application/json");
        });
    });
    it("first object in arrat returns expected title", () => {
      request(server)
        .get("/api/stories/")
        .set("Authorization", token)
        .then(response => {
          //   console.log(response.body[0]);
          expect(response.body[0]).toMatchObject({
            title: "A trip to Kiney Lake"
          });
        });
    });
    it("the objects have the expected properties", () => {
      request(server)
        .get("/api/stories/")
        .set("Authorization", token)
        .then(response => {
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0]).toHaveProperty("title");
          expect(response.body[0]).toHaveProperty("story");
          expect(response.body[0]).toHaveProperty("date_trip");
          expect(response.body[0]).toHaveProperty("city");
          expect(response.body[0]).toHaveProperty("country");
          expect(response.body[0]).toHaveProperty("url");
          expect(response.body[0]).toHaveProperty("description");
        });
    });
  });
});
