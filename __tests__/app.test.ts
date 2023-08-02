const request = require ("supertest")
const app = require ("../dist/app.mjs")

describe("GET /api/users", () => {
  test("responds with object containing all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((body) => {
        console.log(body);
        
        // expect(endpoints).toMatchObject(endpointsFile);
      });
  });
});

// test("200: responds with JSON object of all /api/ endpoints", () => {
//     return request(app)
//       .get("http://localhost:8000/api/users")
//       .expect(200)
//       .then(( body ) => {
//         console.log(body);
//       });
//   });