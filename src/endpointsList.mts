export default {
  "/": 
  "Welcome message",

  "GET /api":
  "responds with a list of available endpoints",

  "GET /api/users":
  "responds with a list of topics",

  "GET /api/users/:user_id":
  "responds with a single article by article_id",

  "GET /api/profile":
  "responds with a list of articles",

  "GET /api/events/:article_id/comments":
  "responds with a list of comments by article_id",

  "POST /api/events/:article_id/comments":
  "add a comment by article_id",

  "PATCH /api/events/:article_id":
  "updates an article by article_id",

  "DELETE /api/comments/:comment_id":
  "deletes a comment by comment_id",

  "GET /api/events":
  "responds with a list of events",

  "GET /api/events (queries)":
  "allows events to be filtered and sorted",

  "GET /api/events/:article_id (comment count)":
  "adds a comment count to the response when retrieving a single article"
}