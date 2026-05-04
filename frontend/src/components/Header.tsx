function Header() {
	return (
		<header>
			<p className="header-title">The Journal</p>
			<div className="header-right">
				<button className="header-btn login">Log In</button>
				<button className="header-btn signup">Sign Up</button>
				<img src="/user.svg" alt="" className="header-icon user" />
			</div>
		</header>
	);
}

export default Header;
