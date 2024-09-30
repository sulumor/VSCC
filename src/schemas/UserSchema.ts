import * as yup from 'yup'

export const UserSchema = yup
  .object({
    firstname: yup.string().required('Un nom est obligatoire').label('firstname'),
    password: yup.string().required('Un mot de passe est obligatoire').label('password'),
    email: yup.string().email().required('Un email est obligatoire').label('email'),
    is_admin: yup.boolean().default(false)
  })
  .required()
