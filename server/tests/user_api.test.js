const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper.js")

const api = supertest(app)
const User = require("../models/user")

describe("/api/user", async () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers
      .map(user => new User(user))

    const promiseArray = userObjects
      .map(user => user.save())

    await Promise.all(promiseArray)
  })

  test("GET / returns all users as JSON", async () => {
    const results = await api
      .get("/api/user")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(results.body.length).toBe(helper.initialUsers.length) 
  })

  describe("viewing a specific user", () => {
    test("succeeds with a valid id", async () => {
      const users = await helper.usersInDb()
      const userToView = users[0]

      const results = await api
        .get(`/api/user/${userToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      expect(results.body).toEqual(userToView)
    })

    test("fails with an invalid id", async () => {
      const invalidId = "x.x.x.x"
      
      await api
        .get(`/api/user/${invalidId}`)
        .expect(404)
    })
  })
})