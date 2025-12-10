import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<React.Fragment>
			<Link activeProps={{ className: "text-blue-500 font-bold" }} to="/">
				Main Page
			</Link>
			<Link activeProps={{ className: "text-blue-500 font-bold" }} to="/about">
				About Page
			</Link>
			<Outlet />
		</React.Fragment>
	);
}
