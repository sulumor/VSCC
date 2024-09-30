import { PasswordRegex } from '@/utils/regex'
import * as yup from 'yup'

export const PasswordSchema = yup
  .object({
    password: yup
      .string()
      .matches(
        PasswordRegex,
        'Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial'
      )
      .required('Le nouveau mot de passe est obligatoire')
      .label('password')
  })
  .required()
