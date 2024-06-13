import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async resetProblemsFlag(): Promise<number> {
    try {
      const res = await this.databaseService.user.updateMany({
        where: { trouble: true },
        data: { trouble: false },
      });
      return res.count;
    } catch (error) {
      throw new InternalServerErrorException('Error resetting troubles flag');
    }
  }
}
