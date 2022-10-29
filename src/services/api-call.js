export const getUserList = async (page) => {
  const api = `https://reqres.in/api/users?page=${page}`;
  const response = await fetch(api);
  const rawData = await response.json();
  return rawData.data;
};

export const getUser = async (id) => {
  const api = `https://reqres.in/api/users/${id}`;
  const response = await fetch(api);
  const rawData = await response.json();
  return rawData.data;
};
