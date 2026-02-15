import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpsertProfileDto } from './dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  upsertProfile(@Body() dto: UpsertProfileDto) {
    return this.profilesService.upsertProfile(dto);
  }

  @Get(':userId')
  getProfile(@Param('userId') userId: string) {
    return this.profilesService.getByUserId(userId);
  }
}
