export default {
  "GET /api": {
    description: "Responds with a list of available endpoints",
    request: null,
    response: {
      success: true,
      msg: "List of endpoints",
      endpoints: "This page",
    },
  },

  // "GET /api/sampleids": {
  //   description: "responds with a list of topics",
  //   request: null,
  //   response: {
  //     success: true,
  //     msg: "List of endpoints",
  //     sampleIds: {
  //       user_id: "sampleUserId",
  //       profile_id: "sampleProfileId",
  //       event_id: "sampleEventId",
  //     },
  //   },
  // },

  "POST /api/users/createuser": {
    description: "creates new user and profile documents in the database",
    request: {
      user: {
        email: "danny@daniels.co.uk",
        password: "DanStar123",
        first_name: "Daniel",
        last_name: "Daniels",
        username: "whoTheDan",
        date_of_birth: "1999-12-01",
        location: "Stockport",
        avatar: "Optional URL for avatar image",
        bio: "Optional bio string up to 255 characaters",
        coding_languages: ["Optional", "Array", "Of", "Coding", "Languages"],
        interests: "Optional interests string up to 255 characters",
      },
      response: {
        success: true,
        msg: "New user and profile created",
        user_id: "new user_id",
        profile_id: "new profile_id",
      },
    },
  },

  "POST /api/users/login": {
    description: "logs user in",
    request: {
      email: "user@login.com",
      password: "userPassword123",
    },
    response: {
      success: true,
      msg: "User logged in",
      user_id: "logged-in user_id",
      profile_id: "logged-in profile_id",
    },
  },

  "GET /api/profiles": "responds with a list of articles",

  "GET /api/events/:article_id/comments":
    "responds with a list of comments by article_id",

  "POST /api/events/:article_id/comments": "add a comment by article_id",

  "PATCH /api/events/:article_id": "updates an article by article_id",

  "DELETE /api/comments/:comment_id": "deletes a comment by comment_id",

  "GET /api/events": "responds with a list of events",

  "GET /api/events (queries)": "allows events to be filtered and sorted",

  "GET /api/events/:article_id (comment count)":
    "adds a comment count to the response when retrieving a single article",
};
