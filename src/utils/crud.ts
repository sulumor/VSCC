import axios, { AxiosError } from 'axios'
import type { Response } from '@/@Types/Response'
import { jwtDecode } from 'jwt-decode'

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
    await this.checkToken()
    return await this.handleErrors(
      axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    )
  }

  async post(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    await this.checkToken()
    return await this.handleErrors(
      axios.post(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
    )
  }

  async update(
    path: string,
    body: { [k: string]: string | number | boolean | Date | [] | undefined | null }
  ): Promise<Response> {
    await this.checkToken()
    return await this.handleErrors(
      axios.patch(
        `${this.BASE_URL}/${path}`,
        { ...body },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
    )
  }

  async delete(path: string): Promise<Response> {
    await this.checkToken()
    return await this.handleErrors(
      axios.delete(`${this.BASE_URL}/${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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

  private async checkToken() {
    const token = localStorage.getItem('token')
    if (!token) return
    const tokenDecrypted = jwtDecode(token)
    if (tokenDecrypted.exp! < Date.now()) {
      const res = await this.get('auth/refresh_token')
      localStorage.setItem('token', res.data.accessToken)
    }
  }
}

export default new Crud('http://localhost:8080')
