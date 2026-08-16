export const getOldJson = async (endpoint) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
