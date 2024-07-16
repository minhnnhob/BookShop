import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import AuthorizedComponent from "../Authorization/authorizedComponent";
import store from "../../Redux/store";
import { toggleNavCat } from "../../Redux/CategorySlice"
import { RootState } from "../../Redux/store";

export default function NavigationBar() {
    return (
        <>
            <TopBar />
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Categories />
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">
                                    Book
                                </span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                                    Shop
                                </span>
                            </Link>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <Pages />
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <ActionButtons />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

function TopBar() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="container-fluid">
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <Link to="/" className="text-decoration-none">
                        <span className="h1 text-uppercase text-primary bg-dark px-2">
                            Book
                        </span>
                        <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                            Shop
                        </span>
                    </Link>
                </div>
                <div className="col-lg-4 col-6 text-left">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or author"
                            value={searchValue}
                            onChange={(evt) => {
                                setSearchValue(evt.target.value);
                            }}
                        />
                        <Link
                            className="input-group-append"
                            to={{ pathname: "product", search: `search=${searchValue}` }}
                        >
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search" />
                            </span>
                        </Link>
                        <Link
                            className="input-group-append"
                            to={{ pathname: "product" }}
                            onClick={() => {
                                setSearchValue("");
                            }}
                        >
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fas fa-window-close" />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Customer Service</p>
                    <h5 className="m-0">0888827768</h5>
                </div>
            </div>
        </div>
    );
}

function Categories() {
    const categories = useSelector((state: RootState) => state.category.items);

    return (
        <>
            <div
                className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                data-toggle="collapse"
                ref="#navbar-vertical"
                onClick={() => {
                    store.dispatch(toggleNavCat());
                }}
                style={{ height: "65px", padding: "0 30px" }}
            >
                <h6 className="text-dark m-0">
                    <i className="fa fa-bars mr-2" />
                    Categories
                </h6>
                <i className="fa fa-angle-down text-dark" />
            </div>
            <nav
                className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                id="navbar-vertical"
                style={{ width: "calc(100% - 30px)", zIndex: 999 }}
            >
                <div className="navbar-nav w-100">
                    {categories.map((item, index) => (
                        <CategoryItem
                            key={index}
                            name={item.name}
                            id={item.id}
                            count={item.count}
                        />
                    ))}
                </div>
            </nav>
        </>
    );
}

function Pages() {
    return (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/product"
                className={({ isActive }) =>
                    isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
            >
                Product
            </NavLink>
        </>
    );
}

function ActionButtons() {
    const { loggedIn } = useSelector((state: RootState) => state.user);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
        <>
            <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
                {/* Cart button */}
                <Link to="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary" />
                    <span className="badge text-secondary border border-secondary rounded-circle ml-1">
                        {cartItems.length}
                    </span>
                </Link>
            </AuthorizedComponent>

            <AuthorizedComponent>
                <Link to="/profile" className="btn px-0 ml-3">
                    <i className="fas fa-user text-primary" />
                </Link>
            </AuthorizedComponent>

            {/* Sign in button */}
            {loggedIn ? (
                ""
            ) : (
                <Link
                    to="/signin"
                    className="btn px-0 ml-3 text-secondary border border-primary pl-2 pr-2 bg-primary"
                >
                    <span className="badge text-dark">Sign In</span>
                </Link>
            )}

            <AuthorizedComponent requiredRoles={["MANAGER", "STAFF"]}>
                <Link
                    to="/console"
                    className="btn px-0 ml-3 text-secondary border border-primary pl-2 pr-2 bg-primary"
                >
                    <i className="fa fa-cogs text-dark" />
                    <span className="badge text-dark  ml-1">Manage</span>
                </Link>
            </AuthorizedComponent>
        </>
    );
}

interface CategoryItemProps {
    name: string;
    id: string;
    count: string; // Change the type of 'count' to string
}

function CategoryItem({ name, id, count }: CategoryItemProps) {
    const countNumber = parseInt(count); // Convert 'count' to a number

    return (
        <Link
            to={{ pathname: "/product", search: `category=${id}` }}
            className="nav-item nav-link"
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <div>{name}</div>
            <div className="">{countNumber} </div> // Use the converted 'count' value
        </Link>
    );
}
