export const getOldJson = async () => {
  try {
    const res = await fetch("http://192.168.0.38:5000/chores/get_chores");
    const data = await res.json();
    //console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
