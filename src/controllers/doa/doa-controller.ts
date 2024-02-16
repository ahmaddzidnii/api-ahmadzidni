import { Request, Response } from "express";
import Fuse from "fuse.js";

import { jsonError } from "../../templates/json-error";
import { jsonSuccses } from "../../templates/json-succses";

import { getPath } from "../../utils/get-path";

import dataDoa from "../../../data/doa.json";

export const doaController = async (req: Request, res: Response) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 50;

    let query = (req.query.q as string) || undefined;

    let showAll: string | boolean = req.query.show_all as string;

    if (showAll === "true") {
      showAll = true;
    } else if (showAll === "false") {
      showAll = false;
    } else {
      showAll = false;
    }

    if (showAll) {
      limit = dataDoa.length;
      page = 1;
    }

    if (limit < 20 || limit > dataDoa.length) {
      return res.status(400).json(
        jsonError({
          code: 400,
          error: `limit must be between 20 and ${dataDoa.length}!`,
        })
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let listDoa = dataDoa.map((item) => {
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
      };
    });

    // Logika search
    if (query !== undefined && query !== "") {
      const fuse = new Fuse(listDoa, {
        keys: ["name"], // Properti mana yang ingin dicocokkan
        threshold: 0.4, // Ambang batas kesamaan
        includeScore: true, // Menghitung skor kesamaan
        ignoreLocation: false, // Memungkinkan permutasi kata
        distance: 100, // Jarak maksimum untuk kesamaan
        minMatchCharLength: 1, // Panjang minimum karakter yang cocok
      });

      const result = fuse.search(query); // Melakukan pencarian fuzzy
      const searchResults = result.map(({ item }) => item); // Mengembalikan hasil pencarian

      if (searchResults.length < 1) {
        console.log("no data in query");
        return res.status(404).json(
          jsonError({
            code: 404,
            error: "Data not found",
          })
        );
      } else {
        listDoa = searchResults;
      }
    }

    const totalPages = Math.ceil(listDoa.length / limit);
    const sliceData = listDoa.slice(startIndex, endIndex);

    if (page > totalPages) {
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
          path_url: getPath(req),
          query_params: {
            q: query!!,
            page,
            limit,
            show_all: showAll,
          },
        },
        pagination: {
          last_visible_page: totalPages,
          current_page: page,
          has_next_page: page < totalPages,
          items: {
            count: sliceData.length,
            total: listDoa.length,
            per_page: limit,
          },
        },
        data: sliceData,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(
      jsonError({
        code: 500,
        error: "Internal Server Error",
      })
    );
  }
};
