const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it("Calls the GET endpoint for celestial bodies and the response is correct", async done => {
  const response = await request.get("/api/bodies")

  expect(response.status).toBe(200);
  expect(response).toHaveProperty("body");
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        Name: expect.any(String),
        ImgUrl: expect.stringContaining(".jpg"),
        Age: expect.stringContaining("billion years"),
        SolarMass: expect.any(String)
      })
    ])
  )
  done()
})
