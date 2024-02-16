import { Request, Response } from "express";

import dataDoa from "../../../data/doa.json";
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
export const detailDoaController = async (req: Request, res: Response) => {
  try {
    const identifier = req.params.identifier;

    const detailData = dataDoa.find((item) => {
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
    return res.status(200).json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: getPath(req),
          params: {
            identifier: identifyIdOrSlug(identifier),
          },
        },
        data: detailData,
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
