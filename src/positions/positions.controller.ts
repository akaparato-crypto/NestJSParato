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

// Interface based on your error log's body requirements
interface CreatePositionDto {
  position_code: string;
  position_name: string;
}

interface UpdatePositionDto {
  position_code?: string;
  position_name?: string;
}

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  // ERROR FIX: Removed semicolon after @Delete
  // ERROR FIX: Added parentheses to @Param()
  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }

  // ERROR FIX: Removed semicolon after @Get
  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  // ERROR FIX: Removed semicolon after @Post
  // ERROR FIX: Added parentheses to @Req() and @Body()
  @Post() 
  create(
    @Req() req: Request, 
    @Body() body: CreatePositionDto
  ) {
    return this.positionsService.create(body);
  }

  // ERROR FIX: Removed semicolon after @Patch
  // ERROR FIX: Added parentheses to @Param() and @Body()
  @Patch(':id') 
  update(
    @Param('id') id: string, 
    @Body() data: UpdatePositionDto
  ) {
    return this.positionsService.update(+id, data);
  }
}