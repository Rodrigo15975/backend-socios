import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { env } from 'process';

@Injectable()
export class AuthUserGuard extends AuthGuard(env.PASSPORT_AUTH) {}
