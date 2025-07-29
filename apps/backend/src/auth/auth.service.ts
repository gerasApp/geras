import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateOAuthLogin(
    provider: string,
    providerAccountId: string,
    profile: { email?: string; name?: string; picture?: string },
    accessToken: string,
    idToken: string,
  ): Promise<string> {
    // 1) Buscamos la cuenta en Account
    const account = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: { provider, providerAccountId },
      },
      include: { user: true },
    });

    let user = account?.user;

    // 2) Si no existe, creamos user + account si no existe otro con mail
    if (!user) {
      if (profile.email) {
        const existingUser = await this.prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (existingUser) {
          // rechazamos el login vinculando un mensaje de error
          throw new BadRequestException(
            "Ya existe una cuenta con ese email usando otro proveedor. " +
              "Por favor inicia sesión con el proveedor original.",
          );
        }
      }
      user = await this.prisma.user.create({
        data: {
          email: profile.email!,
          name: profile.name!,
          image: profile.picture,
          accounts: {
            create: {
              provider,
              providerAccountId,
              type: "oauth", // o el valor que uses para Account.type
              access_token: accessToken,
              id_token: idToken,
            },
          },
        },
      });
    } else {
      // 3) Si existe la cuenta, opcionalmente actualizamos tokens
      await this.prisma.account.update({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
        data: {
          access_token: accessToken,
          id_token: idToken,
        },
      });
    }

    // 4) Firmamos y devolvemos el JWT con sub = user.id
    return this.jwtService.signAsync({ sub: user.id });
  }
}
