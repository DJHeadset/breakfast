export const getOldJson = async (endpoint) => {
  try {
    const res = await fetch(`http://192.168.0.38:5000${endpoint}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
