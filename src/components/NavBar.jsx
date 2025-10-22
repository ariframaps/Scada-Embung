import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarLink,
	NavbarCollapse,
	NavbarToggle,
} from "flowbite-react";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { logout } from "../lib/api";

const NavBar = () => {
	const location = useLocation();

	return (
		<Navbar fluid className="border-b border-b-neutral-200">
			<NavbarBrand href="/" className="flex gap-3">
				<img
					className="-rotate-12"
					src={logo}
					width={50}
					alt="Kontrol Pipa"
				/>
				<span className="self-center whitespace-nowrap text-lg font-semibold text-blue-800">
					Valve
				</span>
			</NavbarBrand>
			{location.pathname !== "/login" && <NavbarToggle />}
			{location.pathname !== "/login" && (
				<NavbarCollapse className="gap-2">
					<NavbarLink
						active={location.pathname === "/"}
						className="h-full flex justify-center items-center"
						href="/">
						Home
					</NavbarLink>
					<NavbarLink>
						<Button
							onClick={logout}
							size="sm"
							className="w-full text-xs border-blue-300 text-blue-700"
							color={"alternative"}>
							Logout
						</Button>
					</NavbarLink>
				</NavbarCollapse>
			)}
		</Navbar>
	);
};

export default NavBar;
