import { SetMetadata } from "@nestjs/common";

export const NeedRole = (role: string) => SetMetadata('roles', role);