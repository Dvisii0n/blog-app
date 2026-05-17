import { Link } from "react-router";
import { useNavigate } from "react-router";

interface HeaderProps {
	isLoggedIn: Boolean;
	logout: () => void;
}

function Header({ isLoggedIn, logout }: HeaderProps) {
	const navigate = useNavigate();
	const username = localStorage.getItem('username')
	return (
		<header>
			<Link to={"/"} className="header-title">
				The Journal
			</Link>
			<div className="header-right">
				{!isLoggedIn ? (
					<>
						<button
							onClick={() => navigate("login")}
							className="header-btn login"
						>
							Log In
						</button>
						<button
							onClick={() => navigate("signup")}
							className="header-btn signup"
						>
							Sign Up
						</button>
					</>
				) : (
					<>
						<button onClick={logout} className="header-btn logout">
							Log Out
						</button>
						<button className="header-btn create-post">Create Post</button>

						<img src="/svg/user.svg" alt="" className="header-icon user" />
						<p className="username">{username}</p>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
