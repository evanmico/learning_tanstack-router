import { getRouteApi, Link } from "@tanstack/react-router";
import { useState } from "react";
import { type SearchParams, sortOptions } from "../-types/searchSchema";

const searchRouteApi = getRouteApi("/(public)/search"); // this is defined to be able to access things from the current url of search (necessary for setting default filter values down below)
// only searchRouteApi is done because then we can just pull exactly what we need from the parent component and we don't need to pass an entire route object to the filterPanel component
const FilterPanel = () => {
	const { filter, page, sort } = searchRouteApi.useSearch();

	const [filterInput, setFilterInput] = useState(filter); // this is where the url values that were brought in are used for defaults
	const [pageInput, setPageInput] = useState(page.toString());

	const getSearchParams = (updates: Partial<SearchParams>) => {
		return {
			filter: updates.filter !== undefined ? updates.filter : filter,
			page: updates.page !== undefined ? updates.page : page,
			sort: updates.sort !== undefined ? updates.sort : sort,
		};
	};

	return (
		<div className="space-y-3">
			<div>
				<label className="label">
					Filter:
					<input
						className="input"
						type="text"
						value={filterInput}
						onChange={(e) => setFilterInput(e.target.value)}
					/>
				</label>
				<Link
					className="outlined-button"
					to="/search"
					search={getSearchParams({ filter: filterInput })}
				>
					Apply Filter
				</Link>
			</div>
			<div>
				<label className="label">
					Page:
					<input
						className="input"
						type="number"
						min="1"
						value={pageInput}
						onChange={(e) => setPageInput(e.target.value)}
					/>
				</label>
				<div className="space-x-2 inline">
					<Link
						className="outlined-button"
						to="/search"
						search={getSearchParams({ page: parseInt(pageInput, 10) || 1 })}
					>
						Go to page
					</Link>
					<Link
						className="outlined-button"
						to="/search"
						search={getSearchParams({ page: Math.max(1, page - 1) })}
						disabled={page <= 1}
					>
						Previous
					</Link>
					<Link
						className="outlined-button"
						to="/search"
						search={getSearchParams({ page: page + 1 })}
					>
						Next
					</Link>
				</div>
			</div>
			<div className="space-x-2">
				<label className="label">Sort:</label>
				{Object.values(sortOptions).map((sortOption) => (
					<Link
						className="outlined-button"
						to="/search"
						search={getSearchParams({ sort: sortOption })}
						key={sortOption}
					>
						{sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
					</Link>
				))}
			</div>
			<pre className="code">
				{JSON.stringify({ filter, page, sort }, null, 2)}
			</pre>
		</div>
	);
};

export default FilterPanel;
