import request from "supertest";
import db from "../dist/db/connection.mjs";
import app from "../dist/app.mjs";

afterAll(() => {
  return db.close();
});

describe("GET /", () => {
  test("return message from server", () => {
    return request(app).get("/").expect(200);
  });
});

describe("GET /api/users", () => {
  test("gets all users", () => {
    return request(app).get("/api/users").expect(200);
  });
});

describe("POST /api/users/login", () => {
  test("200: for valid credentials, responds with {success: true, user_id: user._id}", () => {
    const testLogin = {
      email: "shosier1@liveinternet.ru",
      password: "cI6#}6hO2S.",
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("success", true);
        expect(body).toHaveProperty("user_id", expect.any(String));
      });
  });
  test("401: for invalid credentials, responds with {success: false, user_id: null}", () => {
    const testLogin = {
      email: "shosier1@liveinternet.rX",
      password: "cI6#}6hO2S.",
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(401)
      .then(({ body }) => {
        expect(body).toHaveProperty("success", false);
        expect(body).toHaveProperty("user_id", null);
      });
  });
});
