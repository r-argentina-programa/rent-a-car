import { IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @MaxLength(320)
  @IsString()
  public username!: string;

  @IsString()
  public password!: string;
}
