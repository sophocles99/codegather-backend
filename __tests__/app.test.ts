import request from "supertest";
import app from "../dist/app.mjs";
import db from "../dist/db/connection.mjs";

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

describe("return 404 for invalid endpoint", () => {
  test("return 404 for invalid endpoint", () => {
    return request(app).get("/api/notanendpoint").expect(404).then(({body})=>
    expect(body.msg).toBe("Not found"));
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
  test("200: for successfully created user and profile, responds with {success: true, msg, user_id, profile_id}", () => {
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
        const { success, msg, user_id, profile_id } = body;
        expect(success).toEqual(true);
        expect(msg).toEqual("New user and profile created");
        expect(user_id).toEqual(expect.any(String));
        expect(profile_id).toEqual(expect.any(String));
      });
  });
  test("409: if email already in use, responds with {success: false, msg, user_id: null, profile_id: null}", () => {
    const testUser = {
      user: {
        email: "bdominichetti0@histats.com",
        password: "gO5(bnc\\rd",
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
      .expect(409)
      .then(({ body }) => {
        const { success, msg, user_id, profile_id } = body;
        expect(success).toEqual(false);
        expect(msg).toEqual("Email already in use");
        expect(user_id).toEqual(null);
        expect(profile_id).toEqual(null);
      });
  });
  test("409: if username already in use, responds with {success: false, msg, user_id: null, profile_id: null}", () => {
    const testUser = {
      user: {
        email: "fred@frederick.com",
        password: "gOasdf^&",
        first_name: "Fred",
        last_name: "Frederick",
        username: "glawrenceson0",
        location: "Stockport",
        date_of_birth: "1999-12-01",
        coding_languages: ["Go", "Fortran"],
      },
    };
    return request(app)
      .post("/api/users/createuser")
      .send(testUser)
      .expect(409)
      .then(({ body }) => {
        const { success, msg, user_id, profile_id } = body;
        expect(success).toEqual(false);
        expect(msg).toEqual("Username already in use");
        expect(user_id).toEqual(null);
        expect(profile_id).toEqual(null);
      });
  });
});

//Events testing...
describe("GET /api/events", () => {
  test("get all events.", () => {
    interface IEvent {
      _id: String;
      user_id?: string;
      event_title: string;
      image: string;
      location: number[];
      date_time: Date;
      attending: string[];
      topics: string[];
      description: string;
      size_limit: number;
      participation_group: string[];
    }
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        body.forEach((event: IEvent) => {
          expect(event).toHaveProperty("_id", expect.any(String));
          expect(event).toHaveProperty("user_id", expect.any(String));
          expect(event).toHaveProperty("event_title", expect.any(String));
          expect(event).toHaveProperty("image", expect.any(String));
          expect(event.location).toMatchObject({
            lat: expect.any(Number),
            long: expect.any(Number),
          });
          expect(event).toHaveProperty("date_time", expect.any(String));
          expect(event).toHaveProperty("attending", expect.any(Array));
          expect(event).toHaveProperty("topics", expect.any(Array));
          expect(event).toHaveProperty("description", expect.any(String));
          expect(event).toHaveProperty("size_limit", expect.any(Number));
          expect(body).toHaveLength(20);
        });
      });
  });
});

// To pass this test, change xdescribe to describe.only, removing seeding
// command from package.json "test" script, and paste real event_id into
// the get request in the test
xdescribe("GET /api/events/:event_id", () => {
  test("200: responds with JSON object of all events for a given event_id.", () => {
    return request(app)
      .get("/api/events/64cbb370c05f6e09e39b6363")
      .expect(200)
      .then(({ body }) => {
        const { event } = body;
        expect(event).toHaveProperty("_id", expect.any(String));
        expect(event).toHaveProperty("user_id", expect.any(String));
        expect(event).toHaveProperty("event_title", expect.any(String));
        expect(event).toHaveProperty("image", expect.any(String));
        expect(event).toHaveProperty("location", expect.any(Array));
        expect(event).toHaveProperty("date_time", expect.any(String));
        expect(event).toHaveProperty("attending", expect.any(Array));
        expect(event).toHaveProperty("topics", expect.any(Array));
        expect(event).toHaveProperty("description", expect.any(String));
        expect(event).toHaveProperty("size_limit", expect.any(Number));
        expect(event).toHaveProperty("participation_group", expect.any(Array));
      });
  });
  test("404: responds with empty JSON object.", () => {
    return request(app)
      .get("/api/events/1500")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not Found");
      });
  });
});
