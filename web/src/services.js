import axios from "axios";

export const getRunCodeResult = async (params) => {
  const url = "http://127.0.0.1:6543/api/code/exec";

  return await axios.post(url, params);
};

export const SaveCodeService = async (data) => {
  const url = "http://127.0.0.1:6543/api/code/save";

  return await axios.post(url, data);
};

export const GetCodeListService = async () => {
  const url = "http://127.0.0.1:6543/api/code/list";

  return await axios.get(url);
};
