import * as yup from 'yup'

export const RegisterSchema = yup
  .object({
    firstname: yup.string().required('Un nom est obligatoire').label('firstname'),
    email: yup
      .string()
      .email("Le format n'est pas valide")
      .required('Un email est obligatoire')
      .label('email'),
    is_admin: yup.boolean().default(false)
  })
  .required()
