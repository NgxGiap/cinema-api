import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';

// Dùng @Roles('admin') để yêu cầu role cụ thể
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
