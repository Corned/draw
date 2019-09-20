const supertest = require("supertest")
const app = require("./app")

const api = supertest(app)


test("/ serves the React app", async () => {
  await api
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=UTF-8")
})

describe("/api/room", () => {
  beforeEach(() => {
    // Create rooms in the database
    // databases and room model not yet implemented
  })

  test("GET / returns all rooms as JSON", async () => {
    const results = await api
      .get("/api/room")
      .expect(200)
      .expect("Content-Type", /application\/json/)

  // testhelper.rooms.length perhaps
    expect(results.length).toBe(5) 
  })

  describe("viewing a specific room", () => {
    test("succeeds with a valid id", () => {
      
    })
  })
})