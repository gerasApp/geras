import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Missing JWT_SECRET environment variable");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  /**
   * Tras validar la firma del JWT, buscamos el usuario en la DB.
   * Si no existe, lanzamos Unauthorized.
   */
  async validate(payload: { sub: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      // Podemos incluir más datos si es necesario
      include: { accounts: true },
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    // Passport inyecta este objeto en req.user
    return user;
  }
}
