import { useState, type ChangeEvent } from "react";
import type { UserSignUp } from "../types/AuthTypes";

function Signup() {
	const signUpEndpoint = `${import.meta.env.VITE_API_URL}/auth/signup`;
	const [userData, setUserData] = useState<UserSignUp>({
		email: "",
		username: "",
		password: "",
	});
    const [errors, setErrors] = useState([])

	function updateUserData(e: ChangeEvent<HTMLInputElement>, field: string) {
		const obj: UserSignUp = userData;
		obj[field as keyof typeof userData] = e.target.value;
		setUserData(obj);
	}

	async function handleSignUp() {
		try {
			const response = await fetch(signUpEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(userData),
			});
			const result = await response.json();
            if (result.msg !== 'SIGNUP_SUCCESS') {
                setErrors(result)
            }
		} catch (error) {
			throw error;
		}
	}

	return (
		<main>
			<form className="signup-form">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					onChange={(e) => updateUserData(e, "email")}
					required
				/>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					onChange={(e) => updateUserData(e, "username")}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					onChange={(e) => updateUserData(e, "password")}
				/>
				<button type="button" onClick={handleSignUp}>
					Sign Up
				</button>
			</form>
		</main>
	);
}

export default Signup;
