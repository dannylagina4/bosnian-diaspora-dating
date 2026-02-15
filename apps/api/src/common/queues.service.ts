import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from './redis.service';

@Injectable()
export class QueuesService {
  readonly emailQueue: Queue;

  constructor(private readonly redisService: RedisService) {
    this.emailQueue = new Queue('emailQueue', {
      connection: this.redisService.client
    });
  }
}
