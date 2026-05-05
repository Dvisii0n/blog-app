import { Link } from "react-router";

function Header() {
	return (
		<header>
			<Link to={'/'} className="header-title">The Journal</Link>
			<div className="header-right">
				<button className="header-btn login">Log In</button>
				<button className="header-btn signup">Sign Up</button>
				<img src="/user.svg" alt="" className="header-icon user" />
			</div>
		</header>
	);
}

export default Header;
