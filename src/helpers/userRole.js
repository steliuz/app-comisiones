const roleUser = () => {
  let data = JSON.parse(localStorage.getItem("user")) || [];
  //   console.log("data: ", data);
  return data.user.role;
};

export { roleUser };
