import axios, { AxiosError } from 'axios'
import type { Response } from '@/@Types/Response'

axios.defaults.withCredentials = true

class Crud {
  private BASE_URL: string

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL
  }

  async get(path: string): Promise<Response> {
    return await this.handleErrors(
      axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    )
  }

  async getWithToken(path: string): Promise<Response> {
    return await this.handleErrors(
      axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer token`
        }
      })
    )
  }

  async post(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    return await this.handleErrors(
      axios.post(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`
          }
        }
      )
    )
  }

  async update(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    return await this.handleErrors(
      axios.patch(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`
          }
        }
      )
    )
  }

  async delete(path: string): Promise<Response> {
    return await this.handleErrors(
      axios.delete(`${this.BASE_URL}/${path}`, {
        headers: {
          Authorization: `Bearer token`
        }
      })
    )
  }

  private async handleErrors(promise: Promise<Response>): Promise<Response> {
    try {
      const res = await promise
      return { status: res.status, data: res.data }
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        return { status: error.response.status, data: error.response.data }
      return { status: 500, data: 'Erreur interne du serveur' }
    }
  }
}

export default new Crud('http://localhost:8080')
