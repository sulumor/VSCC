import * as yup from 'yup'

export const TraceSchema = yup
  .object({
    start: yup.string().required('Une ville de départ est obligatoire').label('start'),
    finish: yup.string().required("Une ville d'arrivée est obligatoire").label('finish'),
    is_a_loop: yup.boolean().default(false),
    switch: yup.string().label('switch'),
    image: yup.string().required('Une image doit illustrer la trace').label('image'),
    distance: yup.number().required('La distance de la trace est obligatoire').label('distance'),
    elevation: yup.number().required('Le dénivelé (en m) est requis').label('elevation'),
    description: yup
      .string()
      .required('Une description est pratique pour savoir où la trace passe')
      .label('description'),
    stravaEmbed: yup
      .string()
      .required("L'intégration strava est important pour avoir un visuel")
      .label('stravaEmbed')
  })
  .required()
