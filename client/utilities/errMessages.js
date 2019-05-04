export const errMessages = {
  newUser: {
    404: "Email not found",
    409: "Email already registered",
  },
  login: {
    401: "Wrong email and/or password"
  },
  updateProfile: {
    match: "Retyped password does not match password",
    length: "Password must be at least 8 characters long"
  }
}