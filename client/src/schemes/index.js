import * as yup from "yup";

export const nameScheme = yup
  .string()
  .min(2, "El nombre debe tener minimo 2 caracteres")
  .max(32, "El nombre debe tener maximo 32 caracteres")
  .required("Ingrese un nombre valido");

export const emailScheme = yup
  .string()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ingrese un correo valido")
  .required("Ingrese un correo valido");

export const passwordScheme = yup
  .string()
  .min(6, "La contraseña debe tener minimo 6 caracteres")
  .max(64, "La contraseña no puede tener mas de 64 caracteres")
  .required("Ingrese una contraseña valida");
