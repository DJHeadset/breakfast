export const getOldJson = async (filename) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const res = await fetch(`${API_URL}/chores/get_chores${filename}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
