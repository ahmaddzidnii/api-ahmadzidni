import { Request, Response } from "express";
import { AxiosApiMyQuran } from "../libs/axios";
import { jsonError } from "../templates/json-error";
import { jsonSuccses } from "../templates/json-succses";

import { ResponseLokasi } from "../../types/jadwal";

export const jadwalController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  if (limit < 20 || limit > 100) {
    return res.status(400).json(
      jsonError({
        code: 400,
        error: "limit must be between 20 and 100!",
      })
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const { data } = await AxiosApiMyQuran.get<ResponseLokasi>(
      "sholat/kota/semua"
    );

    const totalPages = Math.ceil(data.data.length / limit);
    const sliceData = data.data.slice(startIndex, endIndex);
    const finalData = sliceData.map((item) => {
      return {
        id: Number(item.id),
        lokasi: item.lokasi,
      };
    });

    if (page > totalPages) {
      return res
        .status(404)
        .json(jsonError({ code: 404, error: "Page not found!" }));
    }

    return res.status(200).json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: req.originalUrl,
        },
        pagination: {
          last_visible_page: totalPages,
          has_next_page: page < totalPages,
          current_page: page,
          items: {
            count: finalData.length,
            total: data.data.length,
            per_page: limit,
          },
        },
        data: finalData,
      })
    );
  } catch (error: any) {
    console.error(error.status);
    return res.status(500).json({
      code: 500,
      error: error.message,
    });
  }
};
