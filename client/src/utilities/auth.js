const checkError = (err, navigate) => {
  const { status } = err.response;
  if (status === 401) {
    localStorage.removeItem("jwt");
    navigate("/presentation/auth/sign-in");
  }
};

export { checkError };
