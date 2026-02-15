import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UpsertProfileDto } from './dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  upsertProfile(dto: UpsertProfileDto) {
    return this.prisma.profile.upsert({
      where: { userId: dto.userId },
      update: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        bio: dto.bio,
        city: dto.city,
        country: dto.country
      },
      create: {
        userId: dto.userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        bio: dto.bio,
        city: dto.city,
        country: dto.country
      }
    });
  }

  getByUserId(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }
}
