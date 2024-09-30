import * as yup from 'yup'

export const EmailSchema = yup
  .object({
    email: yup.string().email().required("L'email est obligatoire").label('email')
  })
  .required()
