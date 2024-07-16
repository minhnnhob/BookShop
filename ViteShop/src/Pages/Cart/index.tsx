import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { removeItemFromCart, updateItemInCart } from "../../Redux/cartSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorizedPage from "../../Components/Authorization/authorizedPage";
import { CartItem } from "../../Types"; // Import CartItem from shared types file


interface CartSummaryProps {
  items: CartItem[];
}

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <AuthorizedPage requiredRoles={["CUSTOMER"]}>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <CartItemsList items={items} />
          </div>
          <div className="col-lg-4">
            <CartSummary items={items} />
          </div>
        </div>
      </div>
    </AuthorizedPage>
  );
}

interface CartItemsListProps {
  items: CartItem[];
}

function CartItemsList({ items }: CartItemsListProps) {
  return (
    <>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Shopping Cart</span>
      </h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartItemComponent key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function CartItemComponent({ id, name, price, quantity }: CartItem) {
  // const dispatch = useDispatch();

  const handleRemoveItem = () => {
    store.dispatch(removeItemFromCart(id));
  };

  const handleIncreaseQuantity = () => {
    store.dispatch(updateItemInCart({ id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return handleRemoveItem(); // Remove item if quantity is 1
    store.dispatch(updateItemInCart({ id, quantity: quantity - 1 }));
  };

  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle">${price}</td>
      <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-minus"
              onClick={handleDecreaseQuantity}>
              <i className="fa fa-minus" />
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm bg-secondary border-0 text-center"
            value={quantity}
            readOnly
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-plus"
              onClick={handleIncreaseQuantity}>
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </td>
      <td className="align-middle">${quantity * price}</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-danger" onClick={handleRemoveItem}>
          <i className="fa fa-times" />
        </button>
      </td>
    </tr>
  );
}



function CartSummary({ items }: CartSummaryProps) {
  const [total, setTotal] = useState(0);

  // Calculate total price
  useEffect(() => {
    let tempTotal = 0;
    items.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });
    setTotal(tempTotal);
  }, [items]);

  return (
    <>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Cart Summary</span>
      </h5>
      <div className="bg-light p-30 mb-5">
        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>${total}</h5>
          </div>
          <Link to="/checkout">
            <button
              className="btn btn-block btn-primary font-weight-bold my-3 py-3"
              disabled={items.length === 0}>
              Proceed To Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
