import { UserExist } from '@app/common/decorators/user-exist.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UserIdParamDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'User ID must be provided' })
  @Type(() => Number)
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt({ message: 'User ID must be a valid number' })
  @Min(1, { message: 'User ID must be a positive number' })
  @UserExist()
  userId: number;
}
