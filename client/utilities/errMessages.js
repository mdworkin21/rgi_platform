export const errMessages = {
  newUser: {
    401: "Incorrect signup code",
    404: "Email not found",
    409: "Email and/or username already registered",
  },
  login: {
    401: "Wrong username and/or password"
  },
  updateProfile: {
    match: "Retyped password does not match password",
    length: "Password must be at least 8 characters long"
  }
}