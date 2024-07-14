import { useSelector } from "react-redux";
import LoadingLayer from "../LoadingLayer";


interface AuthorizedPageProps {
    children: React.ReactNode;
    requiredRoles?: string[] | null;
}

interface RootState {
    user: {
        loggedIn: boolean;
        role: string;
        fetchCurrentUserLoading: boolean;
    };

}

export default function AuthorizedPage({
    children,
    requiredRoles = null,
}: AuthorizedPageProps) {
    const { loggedIn, role, fetchCurrentUserLoading } = useSelector(
        (state: RootState) => state.user
    );

    if (fetchCurrentUserLoading) {
        return <LoadingLayer />;
    }

    if (
        (!requiredRoles && loggedIn) ||
        (requiredRoles && requiredRoles.includes(role))
    ) {
        return <>{children}</>;
    }

    return (
        <div className="container-fluid d-flex">
            <h4>You are not allowed to view this page!</h4>
        </div>
    );
}
