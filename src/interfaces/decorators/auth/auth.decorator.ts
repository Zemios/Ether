import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/domain/users/role.enum";
import { AuthGuard } from "src/interfaces/guards/auth.guard";
import { RoleGuard } from "src/interfaces/guards/role.guard";
import { NeedRole } from "./need-role.decorator";

export function Auth(role: Role) {
    return applyDecorators(
        NeedRole(role),
        UseGuards(AuthGuard, RoleGuard)
    );

}