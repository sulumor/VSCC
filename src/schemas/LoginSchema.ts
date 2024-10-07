import * as yup from 'yup'

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Le format n'est pas valide")
      .required("L'email est obligatoire")
      .label('email'),
    password: yup.string().required('Le mot de passe est obligatoire').label('password')
  })
  .required()
