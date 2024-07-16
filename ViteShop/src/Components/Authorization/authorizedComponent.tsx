import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store"; // Assuming you have a RootState type defined

interface Props {
    children: React.ReactNode;
    requiredRoles?: string[] | null;
}

export default function AuthorizedComponent({
    children,
    requiredRoles = null,
}: Props): React.ReactNode {
    const { loggedIn, role } = useSelector((state: RootState) => state.user);

    if (!requiredRoles && loggedIn) return children; // Role not specified and user logged in

    if (requiredRoles && requiredRoles.includes(role as string)) return children; // Role specified and user has that role

    return null;
}
