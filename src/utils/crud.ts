import axios, { AxiosError, type AxiosResponse } from 'axios'

interface Response {
  data: AxiosResponse<any>['data']
  status?: AxiosResponse<any>['status']
}

axios.defaults.withCredentials = true

class Crud {
  private BASE_URL: string

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL
  }

  async get(path: string): Promise<Response> {
    try {
      const res = await axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }

  async getWithToken(path: string): Promise<Response> {
    try {
      const res = await axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer token`
        }
      })
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }

  async post(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    try {
      const res = await axios.post(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`
          }
        }
      )
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }

  async update(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    try {
      const res = await axios.patch(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`
          }
        }
      )
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }

  async delete(path: string): Promise<Response> {
    try {
      const res = await axios.delete(`${this.BASE_URL}/${path}`, {
        headers: {
          Authorization: `Bearer token`
        }
      })
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }
}

export default new Crud('http://localhost:8080')
