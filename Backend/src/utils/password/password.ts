import bcrypt from "bcrypt";

export class Password {
  static toHash(password: string) {
    const buffer = bcrypt.hashSync(password, 10);

    return `${buffer}`;
  }

  static compare(storedPassword: string, suppliedPassword: string) {
    const buffer = bcrypt.compareSync(suppliedPassword, storedPassword);

    return buffer;
  }
}
