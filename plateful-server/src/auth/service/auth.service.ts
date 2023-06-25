import { Injectable } from '@nestjs/common';

import database from 'src/database-test';

import { AuthCredentialsDTO } from 'src/dtos/auth/auth-credentials.dto';

@Injectable()
export class AuthService {
  public async login(body: AuthCredentialsDTO): Promise<any> {
    // const database = getDatabase();
    console.log(body);
    const collections = await database.listCollections();
    console.log(collections);
  }
}
