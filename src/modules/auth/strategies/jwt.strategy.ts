// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../../users/users.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET,
//     });

//     console.log('JwtStrategy constructor');
//   }

//   async validate(payload: any) {
//     console.log('payload', payload);
//     // Add custom validation logic here, e.g., fetching the user by ID from the database
//     //return this.userService.findOne(payload.sub);
//   }
// }
