import { Request, Response } from "express";

import dataAsmaulHusna from "../../../data/asmaul-husna.json";

import { jsonError } from "../../templates/json-error";
import { jsonSuccses } from "../../templates/json-succses";
import { getPath } from "../../utils/get-path";

const identifyIdOrSlug = (identifier: string) => {
  if (isNaN(Number(identifier))) {
    return {
      slug: identifier,
      type: "slug",
    };
  } else {
    return {
      id: Number(identifier),
      type: "id",
    };
  }
};
export const detailAsmaulHusnaController = async (
  req: Request,
  res: Response
) => {
  try {
    const identifier = req.params.identifier;

    const detailData = dataAsmaulHusna.find((item) => {
      return String(item.id) === identifier || item.slug === identifier;
    });

    if (!detailData) {
      return res.status(404).json(
        jsonError({
          code: 404,
          error: "Data not found",
        })
      );
    }

    const getNextAndPrevAsmaulHusna = (identifier: number) => {
      const nextAsmaulHusna = dataAsmaulHusna.find((item) => {
        return item.id === identifier + 1;
      });
      const prevAsmaulHusna = dataAsmaulHusna.find((item) => {
        return item.id === identifier - 1;
      });

      return {
        prev: prevAsmaulHusna
          ? {
              id: prevAsmaulHusna?.id,
              text_latin: prevAsmaulHusna?.text_latin,
              text_ar: prevAsmaulHusna.text_ar,
              slug: prevAsmaulHusna.slug,
            }
          : false,
        next: nextAsmaulHusna
          ? {
              id: nextAsmaulHusna?.id,
              text_latin: nextAsmaulHusna?.text_latin,
              text_ar: nextAsmaulHusna.text_ar,
              slug: nextAsmaulHusna.slug,
            }
          : false,
      };
    };

    const finalData = {
      ...detailData,
      info: getNextAndPrevAsmaulHusna(detailData.id),
    };

    return res.status(200).json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: getPath(req),
          params: {
            identifier: identifyIdOrSlug(identifier),
          },
        },
        data: finalData,
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
  }
};
