import type { StrategyOptions } from "passport-jwt";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma";

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: `${process.env.JWT_SECRET}`,
};

const strategyJWT = new JwtStrategy(opts, async (jwt_payload, done) => {
	try {
		const userId = jwt_payload.user.id;
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (user) {
			return done(null, user);
		}

		return done(null, false);
	} catch (err) {
		return done(err);
	}
});

export default strategyJWT;
