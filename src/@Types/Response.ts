import type { AxiosResponse } from 'axios'

export interface Response {
  accessToken: string
  data: AxiosResponse<any>['data']
  status?: AxiosResponse<any>['status']
}
