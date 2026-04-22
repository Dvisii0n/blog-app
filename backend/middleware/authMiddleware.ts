import passport from "passport";

const authUser = passport.authenticate("jwt", {
	session: false,
});

export { authUser };
