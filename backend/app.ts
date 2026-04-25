import express from "express";
import type { Application } from "express";
import passport from "passport";
import postsRouter from "./routes/postsRouter";
import authRouter from "./routes/authRouter";
import cors from "cors";
import {
	default404Handler,
	default500Handler,
} from "./middleware/errorHandlers";
import strategyJWT from "./config/passport";
import userRouter from "./routes/userRouter";

const PORT: string = process.env.PORT as string;

const app: Application = express();
const baseRoute: string = "/api/v1";

app.use(cors());
app.use(express.urlencoded());
passport.use(strategyJWT);

app.use(`${baseRoute}/auth`, authRouter);
app.use(`${baseRoute}/posts`, postsRouter);
app.use(`${baseRoute}/users`, userRouter);

app.use(default404Handler);
app.use(default500Handler);

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
