import * as yup from 'yup'

export const EmailSchema = yup
  .object({
    email: yup
      .string()
      .email("Le format n'est pas valide")
      .required("L'email est obligatoire")
      .label('email')
  })
  .required()
