import axios from "axios";

export const getRunCodeResult = async (params) => {
  const url = "http://127.0.0.1:6543/api/code/exec ";

  return await axios.post(url, params);
};
