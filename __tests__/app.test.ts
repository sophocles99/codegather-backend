import request from "supertest";
import app from "../dist/app.mjs";
import db from "../dist/db/connection.mjs";

afterAll(() => {
  return db.close();
});

describe("GET /", () => {
  test("200: returns message from server", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ text }) => {
        expect(text).toBe(
          "WELCOME TO CODEGATHER API. Start with this end point '/api'"
        );
      });
  });
});

describe("Invalid Endpoint", () => {
  test("200: responds with a list of endpoints", () => {
    return request(app)
      .get("/api/even")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          "/": "Welcome message",
          "GET /api": "responds with a list of available endpoints",
          "GET /api/users": "responds with a list of topics",
          "GET /api/users/:user_id":
            "responds with a single article by article_id",
          "GET /api/profile": "responds with a list of articles",
          "GET /api/events/:article_id/comments":
            "responds with a list of comments by article_id",
          "POST /api/events/:article_id/comments":
            "add a comment by article_id",
          "PATCH /api/events/:article_id": "updates an article by article_id",
          "DELETE /api/comments/:comment_id": "deletes a comment by comment_id",
          "GET /api/events": "responds with a list of events",
          "GET /api/events (queries)":
            "allows events to be filtered and sorted",
          "GET /api/events/:article_id (comment count)":
            "adds a comment count to the response when retrieving a single article",
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: GET all users", () => {
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
        gender: "ale",
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
  test("200: GET all events.", () => {
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
describe("GET /api/events/:event_id", () => {
  xtest("200: responds with JSON object of all events for a given event_id.", () => {
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
  test("404: responds with an error message if passed an invalid ID.", () => {
    return request(app)
      .get("/api/events/1500")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not Found");
      });
  });
});

//GET events by topics field
describe("GET /api/events?topics=html", () => {
  test("200: GET all events filtered by the given topic.", () => {
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
      .get("/api/events?topic=Innovation")
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
        });
      });
  });
});

describe("GET /api/profiles", () => {
  test("200: GET all profiles.", () => {
    return request(app)
      .get("/api/profiles/")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        const { profiles } = body;
        profiles.forEach((profile) => {
          expect(profile).toHaveProperty("_id", expect.any(String));
          expect(profile).toHaveProperty("first_name", expect.any(String));
          expect(profile).toHaveProperty("last_name", expect.any(String));
          expect(profile).toHaveProperty("username", expect.any(String));
          expect(profile).toHaveProperty("gender", expect.any(String));
          expect(profile).toHaveProperty("avatar", expect.any(String));
          expect(profile).toHaveProperty("location", expect.any(String));
          expect(profile).toHaveProperty("date_of_birth", expect.any(String));
          expect(profile).toHaveProperty("gender", expect.any(String));
          expect(profile).toHaveProperty("interests", expect.any(String));
          expect(profile).toHaveProperty("host_ratings", expect.any(Number));
        });
      });
  });
});

describe("GET /api/profiles/:id", () => {
  test("200: responds with JSON object of profile for a given profile id.", () => {
    return request(app)
      .get("/api/profiles/64cd0af663676f777f773ba0")
      .expect(200)
      .then(({ body }) => {
        const { profile } = body;
        expect(profile).toMatchObject({
          _id: "64cd0af663676f777f773ba0",
          user_id: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          username: expect.any(String),
          gender: expect.any(String),
          avatar: expect.any(String),
          location: expect.any(String),
          date_of_birth: expect.any(String),
          coding_languages: expect.any(Array),
          interests: expect.any(String),
          host_ratings: expect.any(Number),
        });
      });
  });
  test("404: responds with an error message if passed an invalid ID.", () => {
    return request(app)
      .get("/api/profiles/1500")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not Found");
      });
  });
});

describe("PATCH /api/profiles/:id", () => {
  test("200: responds with JSON object of updated profile for a given profile id", () => {
    const testProfile = {
      profilePatches: {
        first_name: "Alex",
      },
    };
    return request(app)
      .patch("/api/profiles/64cd0af663676f777f773ba0")
      .send(testProfile)
      .expect(200)
      .then(({ body }) => {
        const { profile } = body;
        expect(profile).toMatchObject({
          user_id: expect.any(String),
          first_name: "Alex",
          last_name: "Lawrenceson",
          username: "glawrenceson0",
          gender: "Male",
          avatar:
            "https://robohash.org/quisexpeditaimpedit.png?size=50x50&set=set1",
          location: "Visoko",
          date_of_birth: "2023-04-18T00:00:00.000Z",
          coding_languages: ["JavaScript"],
          interests:
            "est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu",
          host_ratings: 0,
        });
      });
  });
});
