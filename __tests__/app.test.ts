import request from "supertest";
import db from "../dist/db/connection.mjs";
import app from "../dist/app.mjs";

afterAll(() => {
  return db.close();
});

describe("GET /", () => {
  test("return message from server", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ text }) => {
        expect(text).toBe("Hello from the CodeGather server");
      });
  });
});

describe("GET /api/users", () => {
  test("gets all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(20);
        users.forEach((user) => {
          expect(user).toMatchObject({
            _id: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            __v: expect.any(Number),
          });
        });
      });
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
  test("401: for invalid email, responds with {success: false, user_id: null}", () => {
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
  test("401: for valid email but invalid password, responds with {success: false, user_id: null}", () => {
    const testLogin = {
      email: "shosier1@liveinternet.ru",
      password: "cI6#}6hOOOOOOO",
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

describe("POST /api/users/createuser", () => {
  test("200: for successfully created user and profile, responds with {success: true, user, profile}", () => {
    const testUser = {
      user: {
        email: "danny@daniels.co.uk",
        password: "DanStar123",
        first_name: "Daniel",
        last_name: "Daniels",
        username: "whoTheDan",
        location: "Stockport",
        date_of_birth: "1999-12-01",
        coding_languages: ["Go", "Fortran"],
      },
    };
    return request(app)
      .post("/api/users/createuser")
      .send(testUser)
      .expect(201)
      .then(({ body }) => {
        const { success, user, profile } = body;
        expect(success).toBe(true),
          expect(user).toMatchObject({
            _id: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            __v: expect.any(Number),
          });
      });
  });
});
