import { IsString } from 'class-validator';

export class CreateMasterProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
