import express from "express";
import { prisma } from "../libs/prisma";
import { jsonSuccses } from "../templates/json-succses";
import { jsonError } from "../templates/json-error";

const commentRoute = express.Router();

commentRoute
  .get("/", async (req, res) => {
    try {
      let order = req.query.order as string;
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 50;

      if (limit < 20 || limit > 100) {
        return res.status(400).json(
          jsonError({
            code: 400,
            error: `limit must be between 20 and 100!`,
          })
        );
      }
      if (order === "asc") {
        order = "asc";
      } else if (order === "desc") {
        order = "desc";
      } else {
        order = "asc";
      }

      const startIndex = (page - 1) * limit;

      const totalData = await prisma.comment.count();
      const totalPages = Math.ceil(totalData / limit);

      const comments = await prisma.comment.findMany({
        orderBy: {
          time: order as "asc" | "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          time: true,
        },
        take: limit,
        skip: startIndex,
      });

      if (comments.length < 1) {
        return res.status(404).json(
          jsonError({
            code: 404,
            error: "Data not found",
          })
        );
      }

      return res.status(200).json(
        jsonSuccses({
          status_code: 200,
          metadata: {
            path_url: req.originalUrl,
            method: req.method,
            query_params: {
              order: order,
            },
          },
          pagination: {
            last_visible_page: totalPages,
            current_page: page,
            has_next_page: totalPages > page,
            items: {
              count: comments.length,
              per_page: limit,
              total: totalData,
            },
          },
          data: comments,
        })
      );
    } catch (error: any) {
      console.error(error);
      return res.status(500).json(
        jsonError({
          code: 500,
          error: "Internal server error",
        })
      );
    } finally {
      await prisma.$disconnect();
    }
  })

  .post("/", async (req, res) => {
    try {
      const {
        name,
        email,
        message,
      }: { name: string; email: string; message: string } = req.body;

      const UNIX_TIME = new Date().getTime() / 1000.0;

      await prisma.comment.create({
        data: {
          name: name,
          email: email,
          message: message,
          time: UNIX_TIME,
        },
      });

      return res.status(201).json(
        jsonSuccses({
          status_code: 201,
          metadata: {
            method: req.method,
            path_url: req.originalUrl,
          },
          message: "Success create comment",
          data: undefined,
        })
      );
    } catch (error: any) {
      console.error(error);
      return res.status(500).json(
        jsonError({
          code: 500,
          error: "Internal server error",
        })
      );
    } finally {
      await prisma.$disconnect();
    }
  });

export default commentRoute;
