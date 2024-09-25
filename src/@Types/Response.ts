import type { AxiosResponse } from 'axios'

export interface Response {
  data: AxiosResponse<any>['data']
  status?: AxiosResponse<any>['status']
}
