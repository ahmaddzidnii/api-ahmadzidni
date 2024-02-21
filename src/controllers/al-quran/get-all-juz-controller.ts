import { Request, Response } from "express";
import { jsonError } from "../../templates/json-error";
import { jsonSuccses } from "../../templates/json-succses";

import { chaptersData, juzsData } from "../../../data/alquran";
import { getPath } from "../../utils/get-path";

import {
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} from "../../../constant/limit-default";

const getChapter = (obj: { [key: string]: any }) => {
  const chapters = [];

  const x = Object.keys(obj);
  for (const i of x) {
    const chapter = chaptersData.find((item) => item.id === Number(i));
    const formatedChapter = {
      chapter_id: chapter?.id,
      revelation_place: chapter?.revelation_place,
      name_simple: chapter?.name_simple,
      name_complex: chapter?.name_complex,
      name_arabic: chapter?.name_arabic,
      verses_count: chapter?.verses_count,
      translated_name: chapter?.translated_name,
    };
    chapters.push(formatedChapter);
  }

  return chapters;
};

// const getRangeVerse = (obj: { [key: string]: any }) => {
//   const x = Object.entries(obj);
//   console.log(x);
// };

// getRangeVerse({ "1": "1-2", "2": "3-4" });

export const getAllJuzController = async (req: Request, res: Response) => {
  try {
    let { short }: { short?: "asc" | "desc" } = req.query;
    let limit = Number(req.query.limit) || DEFAULT_LIMIT_PER_PAGE;
    let page = Number(req.query.page) || DEFAULT_PAGE;

    const TOTAL_PAGE = Math.ceil(juzsData.length / limit);

    const START_INDEX = (page - 1) * limit;
    const END_INDEX = page * limit;
    const dataJuzs = juzsData.slice(START_INDEX, END_INDEX);
    let formatedData = dataJuzs.map((item) => {
      return {
        id: item.id,
        juz_number: item.juz_number,
        first_verse_id: item.first_verse_id,
        last_verse_id: item.last_verse_id,
        verses_count: item.verses_count,
        verse_mapping: item.verse_mapping,
        chapters: getChapter(item.verse_mapping),
      };
    });

    if (short === "asc" || short === "desc") {
      const shortData = formatedData.sort((a, b) => {
        if (short === "asc") {
          return a.id - b.id;
        }
        return b.id - a.id;
      });

      formatedData = shortData;
    } else {
      short = "asc";
    }
    return res.json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: getPath(req),
          query_params: {
            short,
            limit,
            page,
          },
        },
        pagination: {
          last_visible_page: TOTAL_PAGE,
          has_next_page: page < TOTAL_PAGE,
          current_page: page,
          items: {
            count: formatedData.length,
            per_page: limit,
            total: juzsData.length,
          },
        },
        data: formatedData,
      })
    );
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json(jsonError({ code: 500, error: "Internal server error" }));
  }
};
