import type { Traces } from './@Types/Traces'

export const fakeDatas: Traces = [
  {
    id: 1,
    stravaId: '3260656048129516876',
    stravaHash: '8.1/49.041/1.929',
    start: 'Paris',
    finish: 'Saint-Ouen-Sur-Seine',
    distance: 218,
    elevation: 2756,
    description: 'Trace CC vers Cergy modifié pour retourner à Saint Ouen sans passer par Cergy',
    created_at: new Date().toString(),
    updated_at: null
  },
  {
    id: 2,
    stravaId: '3259431264449107884',
    stravaHash: '9/49.0066/2.2637',
    start: 'Clichy',
    finish: 'Clichy',
    distance: 71,
    elevation: 702,
    description: "Boucle jusqu'à l'Isle-Adam",
    created_at: new Date().toString(),
    updated_at: null
  },
  {
    id: 3,
    stravaId: '3243851523803971040',
    stravaHash: '8.93/49.0222/2.3919',
    start: 'Clichy',
    finish: 'Clichy',
    distance: 82,
    elevation: 632,
    description: 'Boucle passant par Viarmes puis Marly-la-Ville',
    created_at: new Date().toString(),
    updated_at: null
  }
]
