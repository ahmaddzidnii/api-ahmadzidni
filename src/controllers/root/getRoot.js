/**
 * Health check endpoint
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 */
const getRoot = async (_req, res) => {
  const respone = await fetch("https://api.myquran.com/v2/sholat/kota/semua");
  const data = await respone.json();
  res.status(200).json({
    data,
  });
};

export default getRoot;
