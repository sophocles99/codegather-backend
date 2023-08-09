import request from "supertest";
import app from "../dist/app.mjs";
import db from "../dist/db/connection.mjs";
import sampleIds from "../dist/db/seed/sampleIds.js";
import endpointsDetails from "../dist/endpointsDetails.mjs";
const { sampleUserId, sampleProfileId, sampleEventId } = sampleIds;

afterAll(() => {
  return db.close();
});

describe("GET /api", () => {
  test("200: responds with a list of endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { success, msg, endpoints } = body;
        expect(success).toEqual(true);
        expect(msg).toEqual("List of endpoints");
        expect(endpoints).toEqual(endpointsDetails);
      });
  });
});

describe("POST /api/users/createuser", () => {
  test("201: for successfully created user and profile, responds with {success: true, msg, user_id, profile_id}", () => {
    const testUser = {
      user: {
        email: "danny@daniels.co.uk",
        password: "DanStar123",
        first_name: "Daniel",
        last_name: "Daniels",
        username: "whoTheDan",
        date_of_birth: "1999-12-01",
        location: "Stockport",
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
        email: "shosier1@liveinternet.ru",
        password: "cI6#}6hO2S.",
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

describe("POST /api/users/login", () => {
  test("200: for valid credentials, logs user in", () => {
    const testLogin = {
      email: "fe@test.com",
      password: "fe123456",
    };
    return request(app)
      .post("/api/users/login")
      .send(testLogin)
      .expect(200)
      .then(({ body }) => {
        const { success, msg, user_id, profile_id } = body;
        expect(success).toEqual(true);
        expect(msg).toEqual("User logged in");
        expect(user_id).toEqual(expect.any(String));
        expect(profile_id).toEqual(expect.any(String));
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

describe("GET /api/users", () => {
  test("200: GET all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(21); // 20 users created in seed, 1 more added by above createuser test
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
describe("PATCH /api/users/:id", () => {
  test("200: returns updated user", () => {
    const testPatch = {
      user: {
        email: "newEmail@test.com",
        password: "newPasswordfe123456",
      },
    };
    return request(app)
      .patch(`/api/users/${sampleUserId}`)
      .send(testPatch)
      .expect(200)
      .then(({ body }) => {
        const { success, msg, user } = body;
        expect(success).toEqual(true);
        expect(msg).toEqual("User updated");
        expect(user).toMatchObject({
          email: "newEmail@test.com",
          password: expect.any(String),
        });
      });
  });
});

describe("GET /api/events", () => {
  //Events testing...
  test("200: GET all events.", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        body.forEach((event) => {
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

// Get Event by id
describe("GET /api/events/:event_id", () => {
  test("200: responds with JSON object of the event for a given event_id.", () => {
    return request(app)
      .get(`/api/events/${sampleEventId}`)
      .expect(200)
      .then(({ body }) => {
        const { event } = body;
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
describe("GET /api/events?topic=Innovation", () => {
  test("200: GET all events filtered by the given topic.", () => {
    return request(app)
      .get("/api/events?topic=Innovation")
      .expect(200)
      .then(({ body }) => {
        body.forEach((event) => {
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
        const { profiles } = body;
        profiles.forEach((profile) => {
          expect(profile).toMatchObject({
            _id: expect.any(String),
            user_id: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String),
            username: expect.any(String),
            date_of_birth: expect.any(String),
            location: expect.any(String),
            // Not testing for optional fields
            // avatar: expect.any(String),
            // coding_languages: expect.any(Array),
            // interests: expect.any(String),
            host_rating: null,
          });
        });
      });
  });
});

describe("GET /api/profiles/:id", () => {
  test("200: responds with JSON object of profile for a given profile id.", () => {
    return request(app)
      .get(`/api/profiles/${sampleProfileId}`)
      .expect(200)
      .then(({ body }) => {
        const { profile } = body;
        expect(profile).toMatchObject({
          _id: sampleProfileId,
          user_id: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          username: expect.any(String),
          date_of_birth: expect.any(String),
          location: expect.any(String),
          avatar: expect.any(String),
          coding_languages: expect.any(Array),
          interests: expect.any(String),
          host_rating: null,
        });
      });
  });
  test("404: responds with an error message if passed an invalid id", () => {
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
      .patch(`/api/profiles/${sampleProfileId}`)
      .send(testProfile)
      .expect(200)
      .then(({ body }) => {
        const { profile } = body;
        expect(profile).toMatchObject({
          first_name: "Alex",
          last_name: "Lawrenceson",
          username: "glawrenceson0",
          date_of_birth: "1985-07-18T00:00:00.000Z",
          location: "London",
          avatar:
            "https://robohash.org/quisexpeditaimpedit.png?size=50x50&set=set1",
          bio: "Passionate JavaScript developer with a love for problem-solving. Enjoys playing guitar and hiking in spare time.",
          coding_languages: ["JavaScript"],
          interests: "Loves playing guitar, hiking, and reading sci-fi novels.",
          host_rating: null,
        });
      });
  });
});

describe("PATCH /api/:event_id", () => {
  test("200: responds with new event array with added profile id ", () => {
    const testProfile = {
      profile_id: sampleProfileId,
    };
    return request(app)
      .patch(`/api/events/${sampleEventId}`)
      .send(testProfile)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          success: true,
          msg: "Profile ID add to event Array",
          event_id: sampleEventId,
        });
      });
  });
});
