import {
	createFileRoute,
	Link,
	Outlet,
	useLoaderData,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { getCountries } from "@/lib/mock";

export const Route = createFileRoute("/contact-us")({
	component: RouteComponent,
	loader: async () => {
		// loader function is made to fetch data for this route
		const countries = await getCountries();
		return { countries };
	},
	pendingComponent: () => <div>Countries are loading...</div>, // a pendingComponent to show while we wait for data, there can also be an error component on error
});

function RouteComponent() {
	const { countries } = Route.useLoaderData();

	return (
		<div className="space-y-3">
			<h2 className="heading">What country are you at?</h2>
			<div className="list">
				{countries.map((country) => (
					<Link
						className="card"
						activeProps={{ className: "active-card" }}
						to="/contact-us/$country"
						params={{
							country: country.name,
						}}
						key={country.name}
					>
						<span className="title">{country.name}</span>
					</Link>
				))}
			</div>
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
}
