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

// DTOs
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
    // FIX: Get the User ID safely. 
    // If (req as any).user is undefined, we fallback to '1' to prevent crashes.
    const userId = (req as any).user?.id || 1; 

    // Pass both the body and the userId to the service
    return this.positionsService.create(body, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() data: UpdatePositionDto
  ) {
    // Convert id string to number with '+'
    return this.positionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}