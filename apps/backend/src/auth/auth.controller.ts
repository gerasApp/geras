import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Recibe los datos de OAuth desde NextAuth y devuelve el JWT del backend.
   */
  @Post("social")
  async socialLogin(
    @Body()
    body: {
      provider: string;
      providerAccountId: string;
      accessToken: string;
      idToken: string;
      profile: {
        email?: string;
        name?: string;
        picture?: string;
        // más campos?
      };
    },
  ) {
    const jwt = await this.authService.validateOAuthLogin(
      body.provider,
      body.providerAccountId,
      body.profile,
      body.accessToken,
      body.idToken,
    );
    return { accessToken: jwt };
  }

  // Este endpoint está protegido con tu JwtStrategy
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  me(@Req() req: any) {
    // req.user es lo que devolviste en JwtStrategy.validate()
    // Puedes devolver solo los campos que necesites
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      picture: req.user.picture,
    };
  }
}
