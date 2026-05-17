import { useState, type ChangeEvent } from "react";
import type { UserLogin, LoginContext } from "../types/AuthTypes";
import { Link, useOutletContext } from "react-router";
import { groupErrorsByField } from "../utils";
import FormInput from "./FormInput";
import { LineWobble } from "ldrs/react";
import "ldrs/react/LineWobble.css";
import { Navigate } from "react-router";

function Login() {
	const loginContext:LoginContext = useOutletContext<LoginContext>()
	const loginEndpoint = `${import.meta.env.VITE_API_URL}/auth/login`;
	const [userData, setUserData] = useState<UserLogin>({
		username: "",
		password: "",
	});

	const [errors, setErrors] = useState<Map<string, Array<string>> | null>(null);
	const [loading, setLoading] = useState<Boolean>(false);
	const [success, setSuccess] = useState<Boolean>(false);

	async function handleLogIn() {
		try {
			setLoading(true);
			const response = await fetch(loginEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData)
			});

			const result = await response.json()
			if (result[0].msg !== 'LOGIN_SUCCESS') {
				const errors = groupErrorsByField(result)
				setErrors(errors)
			} else {
				const token: string = result[0].token
				const username: string = result[0].username
				const role:string = result[0].role
				localStorage.setItem('token', token)
				localStorage.setItem('username', username)
				localStorage.setItem('role', role)
				loginContext.setIsLoggedIn(true)
				setSuccess(true)
			}

		} catch (error) {
			throw error;
		} finally {
			setLoading(false)
		}
	}

	function updateUserData(
		e: ChangeEvent<HTMLInputElement>,
		field: string,
	): void {
		const obj: UserLogin = userData;
		obj[field as keyof typeof userData] = e.target.value;
		setUserData(obj);
	}

	return success ? (
		<Navigate to={"/"} replace></Navigate>
	) : (
		<main className="user-form-page">
			<form className="user-form login-form">
				<legend className="user-form-legend">Log In</legend>

				<FormInput
					className={"form-input login-username"}
					labelTxt="Username"
					name={"username"}
					type={"text"}
					onChange={updateUserData}
					errors={errors}
				/>
				<FormInput
					className={"form-input"}
					labelTxt="Password"
					name={"password"}
					type={"password"}
					onChange={updateUserData}
					errors={errors}
				/>
				<button type="button" className="submit-btn" onClick={handleLogIn}>
					Log In
				</button>
				<section className="form-notice">
					<span className="form-notice-sp">Dont't have an account? </span>
					<Link className="form-anchor" to={"/signup"}>
						Sign Up
					</Link>
				</section>
			</form>
			{loading ? (
				<LineWobble
					size="80"
					stroke="5"
					bgOpacity="0.1"
					speed="1.75"
					color="white"
				/>
			) : (
				<></>
			)}
		</main>
	);
}

export default Login;
