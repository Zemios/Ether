import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { NeedRole } from "./need-role.decorator";

export function Auth(role: Role) {
    return applyDecorators(
        NeedRole(role),
        UseGuards(AuthGuard, RoleGuard)
    );

}