import { Request, Response } from "express";
import { AxiosApiMyQuran } from "../../libs/axios";
import {
  ResponseScheduleDayProps,
  ResponseScheduleMonthProps,
} from "../../../types/jadwal";
import { jsonError } from "../../templates/json-error";
import { jsonSuccses } from "../../templates/json-succses";

function formatDate(dateString: string) {
  const [day, month, year] = dateString.split("-").map(Number);
  return `${year}-${month}-${day}`;
}

const scheduleDayController = async (req: Request, res: Response) => {
  const { date, id_kota } = req.params;
  try {
    const { data } = await AxiosApiMyQuran.get<ResponseScheduleDayProps>(
      `sholat/jadwal/${id_kota}/${formatDate(date)}`
    );

    const scheduleData = {
      ...data.data.jadwal,
    };

    const finalData = {
      id_kota: Number(data.data.id),
      city: data.data.lokasi,
      province: data.data.daerah,
      schedule: {
        date: {
          dddd_DD_MM_YYYY: scheduleData.tanggal,
          ISO_8601: scheduleData.date,
        },
        imsak: scheduleData.imsak,
        subuh: scheduleData.subuh,
        terbit: scheduleData.terbit,
        dhuha: scheduleData.dhuha,
        dzuhur: scheduleData.dzuhur,
        ashar: scheduleData.ashar,
        maghrib: scheduleData.maghrib,
        isya: scheduleData.isya,
      },
    };

    return res.json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: req.originalUrl,
          params: {
            id_kota: id_kota,
            date: date,
          },
        },
        data: finalData,
      })
    );
  } catch (error: any) {
    console.error(error);
    if (error.response.status == 404) {
      return res
        .status(404)
        .json(jsonError({ code: 404, error: "Data not found" }));
    }
  }
};

const scheduleMonthController = async (req: Request, res: Response) => {
  const { id_kota, month, year } = req.params;
  try {
    const { data } = await AxiosApiMyQuran.get<ResponseScheduleMonthProps>(
      `sholat/jadwal/${id_kota}/${year}/${month}`
    );

    const formatedData = {
      ...data.data,
    };

    const finalData = {
      id_kota: formatedData.id,
      city: formatedData.lokasi,
      province: formatedData.daerah,
      schedules: formatedData.jadwal.map((item) => {
        return {
          date: {
            dddd_DD_MM_YYYY: item.tanggal,
            ISO_8601: item.date,
          },
          imsak: item.imsak,
          subuh: item.subuh,
          terbit: item.terbit,
          dhuha: item.dhuha,
          dzuhur: item.dzuhur,
          ashar: item.ashar,
          maghrib: item.maghrib,
          isya: item.isya,
        };
      }),
    };

    return res.status(200).json(
      jsonSuccses({
        status_code: 200,
        metadata: {
          path_url: req.originalUrl,
          params: {
            id_kota: id_kota,
            month: month,
            year: year,
          },
        },
        data: finalData,
      })
    );
  } catch (error: any) {
    console.error(error);
    if (error.response.status == 400) {
      return res
        .status(404)
        .json(jsonError({ code: 404, error: "Data not found" }));
    }
  }
};

export default {
  scheduleDayController,
  scheduleMonthController,
};
