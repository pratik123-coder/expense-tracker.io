import { Hono } from "hono";

export const testRoute = new Hono()
    .get("/test", (c) => {
        const test = process.env.TEST;
        return c.json({ test });
    });