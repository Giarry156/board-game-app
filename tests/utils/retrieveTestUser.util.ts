import UserRepository from "../../src/repositories/user.repository";
import UserService from "../../src/services/user.service";

export default async function retrieveTestUser(email: string = "test@test.it") {
  const userRepository = new UserRepository();
  const userService = new UserService();

  const registerData = {
    email: email,
    name: "John Doe",
    password: "password",
  };

  // Register user if not exists.
  if (!(await userRepository.findUserByEmail(email))) {
    await userService.registerUser(registerData);
  }

  return registerData;
}
