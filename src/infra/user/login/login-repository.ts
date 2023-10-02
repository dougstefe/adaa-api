import { User } from '@domain/user/login/models/user'
import { GetUserByEmailRepository } from './interfaces/get-user-repository'
import { injectable } from 'tsyringe'

@injectable()
export class LoginRepository implements GetUserByEmailRepository {
  users: User[] = [
    {
      email: 'prillybsb@gmail.com',
      name: 'Priscila Lessa',
      birthdate: new Date(1986, 7, 14),
      password: '$2b$08$VzGFZhJYkaC99Y7Wq9/D5OI6P3L4YKut1tybMa4jd1D5vlYUQ8uRq' //isabella
    }
  ]
  getUserByEmail(email: string) {
    return this.users.find(x => x.email == email)
  }

}