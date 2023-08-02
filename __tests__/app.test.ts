import request from "supertest";
import db from "../dist/db/connection.mjs";
import app from "../dist/app.mjs";

afterAll(() => {
  return db.close();
});

describe("GET /", () => {
  test("return message from server", ()=> {
    return request(app)
    .get("/").expect(200)
  })
})

describe("GET /api/users", () => {
  test("gets all users", () => {
    return request(app)
    .get("/api/users").expect(200)
  })
})

describe("POST /api/users/login", () => {
  test("200: for valid credentials, responds with login object {success: true, user: user}", () => {
    const testLogin = {
      login: {
        email: "shosier1@liveinternet.ru",
        password: "cI6#}6hO2S.",
      },
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(200)
      .then(({ body }) => {
        const { login } = body;
        expect(login).toHaveProperty("success", true)
        expect(login.user).toHaveProperty("_id", expect.any(String))
        expect(login.user).toHaveProperty("email", "shosier1@liveinternet.ru")
        expect(login.user).toHaveProperty("password", "cI6#}6hO2S.")
      });
  });
  test("401: for invalid credentials, responds with login object {success: false, user: null}", () => {
    const testLogin = {
      login: {
        email: "shosier1@liveinternet.rx",
        password: "cI6#}6hO2S6.",
      },
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(401)
      .then(({ body }) => {
        const { login } = body;
        expect(login).toHaveProperty("success", false)
        expect(login).toHaveProperty("user", null);
      });
  });
});

