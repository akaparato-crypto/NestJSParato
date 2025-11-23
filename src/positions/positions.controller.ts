import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Req 
} from '@nestjs/common';
import { Request } from 'express';
import { PositionsService } from './positions.service';

// ideally, move these to a separate .dto.ts file, but they work here for now
export interface CreatePositionDto {
  position_code: string;
  position_name: string;
}

export interface UpdatePositionDto {
  position_code?: string;
  position_name?: string;
}

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Post()
  create(
    @Req() req: Request, 
    @Body() body: CreatePositionDto
  ) {
    return this.positionsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() data: UpdatePositionDto
  ) {
    // Note: +id converts string to number. Remove '+' if using UUIDs.
    return this.positionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}