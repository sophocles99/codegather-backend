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
  test("responds with object specifying whether user is logged in, and if so returns user object", () => {
    const testLogin = {
      login: {
        email: "shosier1@liveinternet.ru",
        password: "cI6#}6hO2S.",
      },
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(201)
      .then(({ body }) => {
        const { login } = body;
        expect(login).toHaveProperty("success", true)
        expect(login.user).toHaveProperty("_id")
        expect(login.user).toHaveProperty("email", "shosier1@liveinternet.ru")
        expect(login.user).toHaveProperty("password", "cI6#}6hO2S.")
      });
  });

  test("responds with 400 and login Success:false.", () => {
    const testLogin = {
      login: {
        email: "shosier1@liveinternet.rx",
        password: "cI6#}6hO2S6.",
      },
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(400)
      .then(({ body }) => {
        const { login } = body;
        expect(login).toHaveProperty("success", false)
        expect(login).toHaveProperty("user", undefined);
      });
  });
});


// Body:

// { email:…, password }

// Return value:

// { login: {
//   success: true,
//   user: {
//     _id: asdfasdfasdf,
//     email: "shosier1@liveinternet.ru",
//     password: "cI6#}6hO2S."
//   }
// }}

// status code 201, {login: {success: true, msg: “..”, user}}

// or

// status code 400, {success: false, msg: “..”, undefined}
