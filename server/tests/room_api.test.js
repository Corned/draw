const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Room = require("../models/room")

describe("/api/room", () => {
  beforeEach(() => {
    // Create rooms in the database
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

    test("fails with an invalid id", () => {
      
    })
  })
})