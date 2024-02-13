import app from "../app";
import supertest from "supertest";

describe("test route", () => {
  // test root route
  test("path /", async () => {
    const result = await supertest(app).get("/");
    expect(result.statusCode).toEqual(200);
    expect(result.body.message).toEqual("Hello World!");
    expect(result.body.NODE_ENV).toEqual(process.env.NODE_ENV);
  });

  // test wrong path
  test("path /wrong-path", async () => {
    const result = await supertest(app).get("/wrong-path");
    expect(result.statusCode).toEqual(404);
    expect(result.body.code).toEqual(404);
    expect(result.body.error).toEqual("Route not found !!!");
    expect(result.body.path).toEqual("/wrong-path");
  });
});
