import { createLink, type LinkComponent } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

// tbh I don't really understand at the current moment why I would do any of what's happening here
// nvm, I get it now, it makes it so that when putting your Link components in the __root.tsx, you don't need to specify the class names and such
// you basically just create your own NavLink Component which extends the default LinkComponent in tanstack with the additional tailwindcss className.
type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	// functionality can be extended with other props to be passed from parent, but not used here except for the one below
	ref: React.Ref<HTMLAnchorElement>;
};

// this may not be necessary depending on ui library that is being used, but here it is being done from scratch:
const BasicLinkComponent = ({ className, ref, ...props }: BasicLinkProps) => {
	return <a ref={ref} {...props} className={cn("nav-link", className)} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
	return (
		<CreatedLinkComponent
			activeProps={{ className: "active-nav-link" }}
			{...props}
		/>
	);
};
