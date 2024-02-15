import app from "../app";
import supertest from "supertest";

describe("test city route", () => {
  test("Correct request", async () => {
    const response = await supertest(app).get("/v1/shalat/city");
    expect(response.statusCode).toEqual(200);
  });

  test("pages more than total pages", async () => {
    const response = await supertest(app).get("/v1/shalat/city?page=100");
    expect(response.statusCode).toBe(404);
  });

  test("limit less than 20", async () => {
    const response = await supertest(app).get("/v1/shalat/city?limit=19");
    expect(response.statusCode).toBe(400);
  });

  test("limit more than 100", async () => {
    const response = await supertest(app).get("/v1/shalat/city?limit=101");
    expect(response.statusCode).toBe(400);
  });
});
