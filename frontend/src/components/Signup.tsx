import { useState, type ChangeEvent } from "react";
import type { UserSignUp } from "../types/AuthTypes";
import { Link } from "react-router";
import { groupErrorsByField } from "../utils";
import FormInput from "./FormInput";
import { LineWobble } from "ldrs/react";
import "ldrs/react/LineWobble.css";
import { Navigate } from "react-router";


function Signup() {
	const signUpEndpoint = `${import.meta.env.VITE_API_URL}/auth/signup`;
	const [userData, setUserData] = useState<UserSignUp>({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<Map<string, Array<string>> | null>(null);
	const [loading, setLoading] = useState<Boolean>(false);
	const [success, setSuccess] = useState<Boolean>(false);

	function updateUserData(
		e: ChangeEvent<HTMLInputElement>,
		field: string,
	): void {
		const obj: UserSignUp = userData;
		obj[field as keyof typeof userData] = e.target.value;
		setUserData(obj);
	}

	async function handleSignUp() {
		try {
			setLoading(true);
			const response = await fetch(signUpEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(userData),
			});
			const result = await response.json();
			if (result[0].msg !== "SIGNUP_SUCCESS") {
				const errors = groupErrorsByField(result);
				setErrors(errors);
			} else {
				setSuccess(true);
			}
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	}

	return success ? (
		<Navigate to={"/login"} replace></Navigate>
	) : (
		<main className="user-form-page">
			<form className="user-form signup-form">
				<legend className="user-form-legend">Create an account</legend>
				<section className="signup-top">
					<FormInput
						className={"form-input signup-email"}
						labelTxt="Email"
						name="email"
						type="email"
						onChange={updateUserData}
						errors={errors}
					/>
					<FormInput
						className={"form-input signup-username"}
						labelTxt="Username"
						name={"username"}
						type={"text"}
						onChange={updateUserData}
						errors={errors}
					/>
				</section>
				<FormInput
					className={"form-input"}
					labelTxt="Password"
					name={"password"}
					type={"password"}
					onChange={updateUserData}
					errors={errors}
				/>
				<FormInput
					className={"form-input"}
					labelTxt="Confirm Password"
					name={"confirmPassword"}
					type={"password"}
					onChange={updateUserData}
					errors={errors}
				/>
				<button type="button" className="submit-btn" onClick={handleSignUp}>
					Sign Up
				</button>
				<section className="form-notice">
					<span className="form-notice-sp">Already have an account? </span>
					<Link className="form-anchor" to={"/login"}>
						Log In
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

export default Signup;
