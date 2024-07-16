import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import { useEffect } from "react";
import { fetchFeaturedProducts } from "../../Redux/productSlice";
import store, { RootState } from "../../Redux/store";
import { addItemToCart } from "../../Redux/cartSlice";
import { Product } from "../../Types";


export default function Home() {
  useEffect(() => {
    store.dispatch(fetchFeaturedProducts());
  }, []);

  return (
    <>
      <Carousel />
      <Featured />
      <Categories />
      <NewProducts />
      <BestSellingProducts />
    </>
  );
}

function Carousel() {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-ride="carousel">
            <ol className="carousel-indicators">
              <li
                data-target="#header-carousel"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#header-carousel" data-slide-to={1} />
              <li data-target="#header-carousel" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              {/* Item 1 */}
              <div
                className="carousel-item position-relative active"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src={require("./2560.webp")}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Discover the best Novel
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      View all novels
                    </p>
                    <Link
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      to="/product?category=2">
                      View
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item 2 */}
              <div
                className="carousel-item position-relative"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src={require("./shiromani-kant-mo3fotg62ao-unsplash.jpg")}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Discover the best Self-help books
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      View all Self-help books
                    </p>
                    <Link
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      to="/product?category=6">
                      View
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item 3 */}
              <div
                className="carousel-item position-relative"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src={require("./best-romance-novels-featured-1280x720.jpg")}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Discover the best Romance novels
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      View all Romance novels
                    </p>
                    <Link
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      to="/product?category=3">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img
              className="img-fluid"
              src={require("./pngtree-delivery-truck-is-parked-next-to-a-3d-smartphone-image_2659337.png")}
              alt=""
            />
            <div className="offer-text">
              <h1 className="text-white mb-3">Free shipping</h1>
              <p className="text-secondary small">for all order over $200</p>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src={require("./books.png")} alt="" />
            <div className="offer-text">
              <h6 className="text-secondary">
                1000+ books in different language
              </h6>
              <h3 className="text-white mb-3">Explore our books library</h3>
              <Link to="/product" className="btn btn-primary">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Featured() {
  return (
    <div className="container-fluid pt-1">
      <div className="row px-xl-5">
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="  m-0 mr-3">
              <i className="fa fa-check text-primary" />
            </h1>
            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="  m-0 mr-3">
              <i className="fa fa-shipping-fast text-primary" />
            </h1>
            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="  m-0 mr-3">
              <i className="fa fa-exchange-alt text-primary" />
            </h1>
            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="  m-0 mr-3">
              <i className="fa fa-phone-volume text-primary" />
            </h1>
            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

function Categories() {
  const items = useSelector((state: RootState) => state.category.items);
  return (
    <div className="container-fluid">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {items.map((category, index) => {
          return (
            <CategoryItem key={index} name={category.name} id={category.id} />
          );
        })}
      </div>
    </div>
  );
}

interface CategoryItemProps {
  name: string;
  id: string;
}

function CategoryItem({ name, id }: CategoryItemProps) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <Link
        className="text-decoration-none"
        to={{ pathname: "/product", search: `category=${id}` }}>
        <div className="cat-item d-flex align-items-center  mb-4 pt-4 pb-4">
          <div className="flex-fill pl-3">
            <h6 className="m-0">{name}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
}

function NewProducts() {
  const newlyProduct = useSelector(
    (state: RootState) => state.product.featuredItems.newlyProduct
  );

  return (
    <div className="container-fluid">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Recently published books</span>
      </h2>
      <div className="row px-xl-5">
        {newlyProduct.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function BestSellingProducts() {
  const bestSelling = useSelector(
    (state: RootState) => state.product.featuredItems.bestSelling
  );

  return (
    <div className="container-fluid">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Best Selling</span>
      </h2>
      <div className="row px-xl-5">
        {bestSelling.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

interface ProductItemProps {
  item: {
    id: string;
    name: string;
    author: string;
    price: number;
    thumbnailUrl?: string;
  };
}

function ProductItem({ item }: ProductItemProps) {
  const { id, name, author, price, thumbnailUrl } = item;

  return (
    <div className="col-lg-2 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <div className="embed-responsive embed-responsive-1by1">
            <img
              className="img-fluid w-100 embed-responsive-item"
              style={{ objectFit: "contain" }}
              src={thumbnailUrl}
              alt=""
            />
          </div>
          <div className="product-action">
            {/* Cart button */}
            <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
              <Link
                className="btn btn-outline-dark btn-square"
                onClick={() => {
                  store.dispatch(addItemToCart({ id }));
                }} to={""}>
                <i className="fa fa-shopping-cart" />
              </Link>
            </AuthorizedComponent>
            <Link
              className="btn btn-outline-dark btn-square"
              to={`product/${id}`}>
              <i className="fa fa-info" />
            </Link>
          </div>
        </div>
        <div className="text-center py-4">
          <Link
            className="h6 text-decoration-none text-truncate d-inline-block w-100 pl-3 pr-3"
            to={`product/${id}`}>
            {name}
          </Link>
          <div className="d-flex align-items-center justify-content-center d-inline-block w-100 pl-3 pr-3">
            <p>{author}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <small>${price}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
