import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

axios.defaults.withCredentials = true

class Crud {
  private BASE_URL: string

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL
  }

  async get(path: string): Promise<any> {
    return await this.handleErrors(
      axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    )
  }

  async getWithToken(path: string): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
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

  async delete(path: string): Promise<any> {
    await this.checkToken()
    return await this.handleErrors(
      axios.delete(`${this.BASE_URL}/${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    )
  }

  async uploadToCloudinary(file: any) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET)

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      })
      const data = await res.json()
      return { data }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        throw new Error(error.message)
      }
    }
  }

  private async handleErrors(promise: Promise<any>) {
    try {
      const res = await promise
      return res.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) throw new Error(error.response.data.error)
      throw new Error('Erreur interne du serveur')
    }
  }

  private async checkToken() {
    const token = localStorage.getItem('token')
    if (!token) return
    const tokenDecrypted = jwtDecode(token)
    if (tokenDecrypted.exp! < Math.floor(Date.now() / 1000)) {
      try {
        const res = await this.get('auth/refresh_token')
        localStorage.setItem('token', res.accessToken)
      } catch (error) {
        localStorage.clear()
      }
    }
  }
}

export default new Crud(import.meta.env.VITE_BACKEND_URL)
