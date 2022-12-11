import jwt from "jsonwebtoken";

export const createTokens = (email) => {
  //  use unique in place of email
  const accessToken = jwt.sign({ email: email }, process.env.accessSecret, {
    expiresIn: "15s",
  }); // for testing chenge it to 15m
  const refreshToken = jwt.sign({ email: email }, process.env.refreshSecret, {
    expiresIn: "10m",
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const createAccessToken = (email) => {
  //  use unique in place of email
  const accessToken = jwt.sign({ email: email }, process.env.accessSecret, {
    expiresIn: "15s",
  });

  return {
    accessToken
  };
};

export const verifyRefresh = (refreshToken) => {
  try {
    return jwt.verify(
      refreshToken,
      process.env.refreshSecret,
      function (error, decoded) {
        if (error) throw new Error(error.message);
        console.log(decoded);
        return decoded.email;
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
