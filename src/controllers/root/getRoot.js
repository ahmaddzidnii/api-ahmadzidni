/**
 * Health check endpoint
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
const getRoot = async (_req, res, next) => {
  try {
    const respone = await fetch("https://api.myquran.com/v2/sholat/kota/semua");
    const data = await respone.json();
    throw new Error("test error");
    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
export default getRoot;
