import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavLink } from "./-components/nav-link";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="container mx-auto max-w-xl">
			<div className="space-x-2">
				<NavLink to="/">Main Page</NavLink>
				<NavLink to="/about">About Page</NavLink>
				<NavLink to="/contact-us">Contact Us</NavLink>
			</div>
			<Outlet />
		</div>
	);
}
