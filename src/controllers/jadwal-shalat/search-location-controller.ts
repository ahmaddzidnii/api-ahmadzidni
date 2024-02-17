import { Request, Response } from "express";
import { jsonError } from "../../templates/json-error";
import { jsonSuccses } from "../../templates/json-succses";
import { AxiosApiMyQuran } from "../../libs/axios";
import { ResponseLokasi } from "../../../types/jadwal";

import Fuse from "fuse.js";
import { getPath } from "../../utils/get-path";

export const searchLocationController = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  if (page < 1) {
    page = 1;
  }

  const PATH = getPath(req);

  if (!query) {
    return res.status(400).json(
      jsonError({
        code: 400,
        error: "query is required!",
      })
    );
  }

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

    const fuse = new Fuse(data.data, {
      keys: ["lokasi"], // Properti mana yang ingin dicocokkan
      threshold: 0.4, // Ambang batas kesamaan
      includeScore: true, // Menghitung skor kesamaan
      ignoreLocation: true, // Memungkinkan permutasi kata
      distance: 100, // Jarak maksimum untuk kesamaan
      minMatchCharLength: 1, // Panjang minimum karakter yang cocok
    });

    const result = fuse.search(query); // Melakukan pencarian fuzzy
    const searchResults = result.map(({ item }) => item); // Mengembalikan hasil pencarian

    const totalPages = Math.ceil(searchResults.length / limit);
    const sliceData = searchResults.slice(startIndex, endIndex);
    const finalData = sliceData.map((item) => {
      return {
        id: Number(item.id),
        lokasi: item.lokasi,
      };
    });

    if (page > totalPages && totalPages > 0) {
      return res
        .status(404)
        .json(jsonError({ code: 404, error: "Page not found!" }));
    }

    return res.status(200).json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: PATH,
          query_params: {
            q: query,
            page: page,
            limit: limit,
          },
        },
        pagination: {
          last_visible_page: totalPages,
          has_next_page: page < totalPages,
          current_page: page,
          items: {
            count: finalData.length,
            total: searchResults.length,
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
