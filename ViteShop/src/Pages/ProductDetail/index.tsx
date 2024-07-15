import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/productSlice";
import { useEffect, useState } from "react";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import store from "../../Redux/store";
import { addItemToCart } from "../../Redux/cartSlice";
import DateTimeConverter from "../../Components/Converter/dateTime";

import { Product } from "../../Types";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function ProductDetail() {
  const { id = "" } = useParams<RouteParams>();
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  useEffect(() => {
    store
      .dispatch(fetchProductById(id))
      .unwrap()
      .then((productData: Product) => {
        setSelectedItem(productData);
      });
    window.scrollTo(0, 0);
  }, [id]);

  return selectedItem ? (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-3 mb-30">
          <img
            alt={selectedItem.name}
            src={selectedItem.thumbnailUrl}
            className="img-fluid w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-9 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{selectedItem.name}</h3>
            <h4 className="font-weight-semi-bold mb-4">
              ${selectedItem.price}
            </h4>
            <p className="mb-4">
              Author: {selectedItem.author}
              <br />
              Publisher: {selectedItem.publisher}
              <br />
              Published: {DateTimeConverter(selectedItem.publishcationDate)}
              <br />
              Quantity: {selectedItem.quantity}
            </p>
            <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
              <AddToCartButtons selectedItem={selectedItem} />
            </AuthorizedComponent>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <Description selectedItem={selectedItem} />
      </div>
    </div>
  ) : (
    <></>
  );
}

interface AddToCartButtonsProps {
  selectedItem: Product;
}

function AddToCartButtons({ selectedItem }: AddToCartButtonsProps) {
  return (
    <div className="d-flex align-items-center mb-4 pt-2">
      <button
        className="btn btn-primary px-3"
        onClick={() => {
          store.dispatch(addItemToCart({ id: selectedItem.id }));
        }}
      >
        <i className="fa fa-shopping-cart mr-1" /> Add To Cart
      </button>
    </div>
  );
}

interface DescriptionProps {
  selectedItem: Product;
}

function Description({ selectedItem }: DescriptionProps) {
  return (
    <div className="col">
      <div className="bg-light p-30">
        <div className="nav nav-tabs mb-4">
          <a
            className="nav-item nav-link text-dark active"
            data-toggle="tab"
            href="#tab-pane-1"
          >
            Description
          </a>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Product Description</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: selectedItem.description,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
