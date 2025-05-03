import { SetMetadata } from "@nestjs/common";
import { Role } from "src/domain/users/role.enum";

export const ROLES_KEY = 'roles';
export const NeedRole = (role: Role) => SetMetadata(ROLES_KEY, role);