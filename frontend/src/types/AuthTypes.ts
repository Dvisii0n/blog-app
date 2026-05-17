export interface UserSignUp {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export interface UserLogin {
	username: string;
	password: string;
}

export interface LoginContext {
	setIsLoggedIn: (arg: Boolean) => void;
}
