import request from "supertest";
import app from "../src";
describe("test authentication", () => {
  it("register route", () => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("responds with json", function (done) {
    request(app)
      .post("/api/auth/register")
      .send({
        username: "john",
        email: "john@gmail.com",
        password: "ade123",
        confirmPassword: "ade123",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        return done();
      });
  });
});
