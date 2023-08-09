export default {
  "List of endpoints": {
    "Base URL": "https://codegather.onrender.com",
    "/api": "GET All endpoints",
    "POST a user": "/api/users/createuser",
    "POST login": "/api/users/login",
    "GET all users": "/api/users",
    "GET user by ID": "/api/users/:id",
    "PATCH user by ID": "/api/users/:id",
    "DELETE user by ID": "/api/users/:id",
    "GET all profiles": "/api/profiles",
    "GET profile by ID": "/api/profiles/",
    "PATCH profile by ID": "/api/profiles/:id",
    "GET all events": "/api/events",
    "GET event by ID": "/api/events/:id",
    "GET event by topic": "/api/events?topic=Innovation",
    "PATCH event by id": "/api/events/:event_id",
    "DELETE event by ID": "/api/events/:id",
    "POST event": "/events/",
  },
  "DETAILED INFORMATION:": "",

  "POST /api/users/createuser": {
    baseUrl_example: "http://localhost:8000",
    description: "Creates a new user.",
    queries: [],
    exampleRequest: {
      post: "{{baseUrl}}/api/users/createuser",
      ContentType: "application/json",
      body: {
        user: {
          email: "danny27@daniels.com",
          password: "t00nie22",
          first_name: "Tony",
          last_name: "Daniels",
          username: "tdog25",
          date_of_birth: "1999-12-31",
          location: "London",
          coding_languages: ["JavaScript", "TypeScript"],
          interests: "Kung-Fu Panda",
          host_ratings: 0,
        },
      },
    },
    exampleResponse: {
      success: true,
      msg: "New user and profile created",
      user_id: "64d1dc638918b130ae651066",
      profile_id: "64d1dc638918b130ae651068",
    },
  },

  "POST /api/users/login": {
    baseUrl_example: "http://localhost:8000",
    description: "Logs user in.",
    queries: [],
    exampleRequest: {
      email: "existing@email.com",
      password: "correctpassword",
    },
    exampleResponse: {
      success: true,
      msg: "User logged in",
      user_id: "user_id of logged in user",
      profile_id: "profile_id of logged in user",
    },
  },

  "GET /api/users": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves a list of all users.",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/users",
    exampleResponse: {
      users: [
        {
          _id: "64d193c00f06b557f95793d1",
          email: "fe@test.com",
          password: "fe123456",
          __v: 0,
        },
        {
          _id: "64d193c00f06b557f95793d2",
          email: "shosier1@liveinternet.ru",
          password: "cI6#}6hO2S.",
          __v: 0,
        },
      ],
    },
  },

  "GET /api/users/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves a user record matching the given ID.",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/users/64d193c00f06b557f95793d1",
    exampleResponse: {
      _id: "64d193c00f06b557f95793d1",
      email: "fe@test.com",
      password: "fe123456",
      __v: 0,
    },
  },

  "PATCH /api/users/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Returns a success message with the updated user.",
    queries: [],
    exampleRequest: "PATCH {{baseUrl}}/api/users/:id",
    ContentType: "application/json",
    body: {
      user: {
        email: "newEmail@test.com",
        password: "newPasswordfe123456",
      },
    },
    exampleResponse: {
      success: true,
      msg: "User updated",
      user: {
        _id: "64d262691c251983c64800d2",
        email: "newEmail@test.com",
        password: "newPasswordfe123456",
        __v: 0,
      },
    },
  },

  "DELETE /api/users/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Deletes a user record matching the given ID",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/users/64d193c00f06b557f95793d1",
    exampleResponse: {
      _id: "64d193c00f06b557f95793d1",
      email: "fe@test.com",
      password: "fe123456",
      __v: 0,
    },
  },

  "GET /api/profiles": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves a list of all profiles.",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/profiles",
    exampleResponse: {
      profiles: [
        {
          _id: "64d193c00f06b557f95793e6",
          user_id: "64d193c00f06b557f95793d1",
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
          __v: 0,
        },
        {
          _id: "64d193c00f06b557f95793e7",
          user_id: "64d193c00f06b557f95793d2",
          first_name: "Nomi",
          last_name: "Romaine",
          username: "nromaine1",
          date_of_birth: "1990-03-12T00:00:00.000Z",
          location: "Manchester",
          avatar:
            "https://robohash.org/nonprovidentquia.png?size=50x50&set=set1",
          bio: "Coder with a passion for Python and Java. Enjoys painting and exploring new cuisines.",
          coding_languages: ["Python", "Java"],
          interests: "Enjoys painting, cooking, and trying out new cuisines.",
          host_rating: null,
          __v: 0,
        },
      ],
    },
  },

  "GET /api/profiles/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves a user profile record matching the given ID.",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/profiles/64d193c00f06b557f95793e6",
    exampleResponse: {
      profile: {
        _id: "64d193c00f06b557f95793e6",
        user_id: "64d193c00f06b557f95793d1",
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
        __v: 0,
      },
    },
  },

  "PATCH /api/profiles/:id": {
    baseUrl_example: "http://localhost:8000",
    description:
      "Updates profile record matching the given ID using the given fields.",
    queries: [],
    exampleRequest: {
      patch: "patch {{baseUrl}}/api/profiles/64d193c00f06b557f95793e6",
      ContentType: "application/json",
      body: {
        profilePatches: {
          _id: "64d193c00f06b557f95793e6",
          user_id: "64d193c00f06b557f95793d1",
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
          __v: 0,
        },
      },
    },
    exampleResponse: {
      profile: {
        _id: "64d193c00f06b557f95793e6",
        user_id: "64d193c00f06b557f95793d1",
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
        __v: 0,
      },
    },
  },

  "GET /api/events": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves a list of all events.",
    queries: ["topic=Innovation"],
    exampleRequest: "get {{baseUrl}}/api/events",
    exampleResponse: {
      events: [
        {
          _id: "64d193c00f06b557f95793fa",
          profile: { profileObject: "a complete profile object" },
          event_title: "TechXpo London",
          date_time: "2023-09-27T18:30:00.000Z",
          location: {
            lat: 51.5074,
            long: -0.1278,
            _id: "64d193c00f06b557f95793fb",
          },
          size_limit: 85,
          attending: [],
          image:
            "https://solguruz.com/wp-content/uploads/2022/09/ReactJS-Framework-Benefits.png",
          topics: ["Web Development", "Artificial Intelligence"],
          description:
            "TechXpo London is a premier tech event showcasing the latest trends in web development and artificial intelligence. Join us for an exciting evening of insightful talks and networking opportunities.",
          __v: 0,
        },
        {
          _id: "64d193c00f06b557f95793fc",
          profile: { profileObject: "a complete profile object" },
          event_title: "CodeFest Manchester",
          date_time: "2023-06-09T19:00:00.000Z",
          location: {
            lat: 53.483959,
            long: -2.244644,
            _id: "64d193c00f06b557f95793fd",
          },
          size_limit: 75,
          attending: [],
          image:
            "https://i.natgeofe.com/n/7fef9761-077c-45d0-9cca-78a984b9d614/burmese-python_thumb_4x3.jpg",
          topics: ["Mobile App Development", "Data Science"],
          description:
            "CodeFest Manchester is a must-attend event for mobile app developers and data science enthusiasts. Join us for an evening packed with hands-on workshops and engaging talks.",
          __v: 0,
        },
      ],
    },
  },

  "GET /api/events/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Serves an event record matching the given ID.",
    queries: [],
    exampleRequest: "get {{baseUrl}}/api/events/64d193c00f06b557f95793fe",
    exampleResponse: {
      event: {
        _id: "64d193c00f06b557f95793fe",
        profile: { profileObject: "a complete profile object" },
        event_title: "AI Summit Edinburgh",
        date_time: "2023-03-04T18:00:00.000Z",
        location: {
          lat: 55.9533,
          long: -3.1883,
          _id: "64d193c00f06b557f95793ff",
        },
        size_limit: 70,
        attending: [],
        image:
          "https://miro.medium.com/v2/resize:fit:1200/1*BPSx-c--z6r7tY29L19ukQ.png",
        topics: ["Artificial Intelligence", "Machine Learning"],
        description:
          "AI Summit Edinburgh brings together experts in artificial intelligence and machine learning. Don't miss this evening event featuring cutting-edge research and industry insights.",
        __v: 0,
      },
    },
  },

  "PATCH /api/events/:event_id": {
    baseUrl_example: "http://localhost:8000",
    description:
      "Adds a profile_id to an array of attendees ('attending' field).",
    queries: [],
    exampleRequest: {
      patch: "patch {{baseUrl}}/api/events/64d193c00f06b557f95793fe",
      ContentType: "application/json",
      body: {
        profile_id: "profile_id of a new attendee",
      },
    },
    exampleResponse: {
      event: {
        _id: "64d193c00f06b557f95793fe",
        user_id: "64d193c00f06b557f95793d8",
        event_title: "AI Summit Edinburgh",
        date_time: "2023-03-04T18:00:00.000Z",
        location: {
          lat: 55.9533,
          long: -3.1883,
          _id: "64d193c00f06b557f95793ff",
        },
        size_limit: 70,
        attending: [],
        image:
          "https://miro.medium.com/v2/resize:fit:1200/1*BPSx-c--z6r7tY29L19ukQ.png",
        topics: ["Artificial Intelligence", "Machine Learning"],
        description:
          "AI Summit Edinburgh brings together experts in artificial intelligence and machine learning. Don't miss this evening event featuring cutting-edge research and industry insights.",
        __v: 0,
      },
    },
  },

  "DELETE /api/events/:id": {
    baseUrl_example: "http://localhost:8000",
    description: "Deletes an event matching the given Event ID.",
    queries: [],
    exampleRequest: "delete {{baseUrl}}/api/events/64d193c00f06b557f95793fe",
    exampleResponse: {
      _id: "64d193c00f06b557f95793fe",
      profile: "64d193c00f06b557f95793d8",
      event_title: "AI Summit Edinburgh",
      date_time: "2023-03-04T18:00:00.000Z",
      location: {
        lat: 55.9533,
        long: -3.1883,
        _id: "64d193c00f06b557f95793ff",
      },
      size_limit: 70,
      attending: [],
      image:
        "https://miro.medium.com/v2/resize:fit:1200/1*BPSx-c--z6r7tY29L19ukQ.png",
      topics: ["Artificial Intelligence", "Machine Learning"],
      description:
        "AI Summit Edinburgh brings together experts in artificial intelligence and machine learning. Don't miss this evening event featuring cutting-edge research and industry insights.",
      __v: 0,
    },
  },

  "POST /api/events/": {
    baseUrl_example: "http://localhost:8000",
    description: "Creates a new event.",
    queries: [],
    exampleRequest: {
      post: "{{baseUrl}}/api/events/",
      ContentType: "application/json",
      body: {
        event: {
          profile: "64d0fc30eb8b082626699253",
          event_title: "CodeNinjas Manchester",
          date_time: "2023-07-09T19:00:00.000Z",
          location: {
            lat: 54.483959,
            long: -2.244644,
            _id: "64d0fc31eb8b08262669987d",
          },
          size_limit: 60,
          attending: [],
          image:
            "https://i.natgeofe.com/n/7fef9761-077c-45d0-9cca-78a984b9d614/burmese-python_thumb_4x3.jpg",
          topics: ["App Development", "Data Structure"],
          description:
            "CodeNinjas Manchester is a must-attend event for app developers and data structuring enthusiasts. Join us for an evening packed with hands-on workshops and engaging talks.",
          __v: 4,
        },
      },
    },
    exampleResponse: {
      success: true,
      msg: "New event is created",
      event_id: "64d1dc638918b130ae651066",
    },
  },
};
