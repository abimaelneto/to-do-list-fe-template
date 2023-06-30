export const emailRegex = /.+@.+\..+/;

export const isValidEmail = (email) =>
  /.+@.+\..+/.test(email) || "E-mail inválido";
