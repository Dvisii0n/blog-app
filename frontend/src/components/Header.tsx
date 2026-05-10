import { Link } from "react-router";
import { useNavigate } from "react-router";

function Header() {
	const navigate = useNavigate()
	return (
		<header>
			<Link to={'/'} className="header-title">The Journal</Link>
			<div className="header-right">
				<button className="header-btn login">Log In</button>
				<button onClick={() => navigate('signup')} className="header-btn signup">Sign Up</button>
				<img src="/svg/user.svg" alt="" className="header-icon user" />
			</div>
		</header>
	);
}

export default Header;
