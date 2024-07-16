import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../../Redux/store";
import { fetchCustomerOrders, fetchOrderById } from "../../Redux/orderSlice";
import DateTimeConverter from "../../Components/Converter/dateTime";
import Popup from "../../Components/Popup";
import LoadingLayer from "../../Components/LoadingLayer";
import { RootState } from "../../Redux/store";
import type { Order } from "../../Types";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface ExtendedOrder {
  id: string;
  date: Date;
  status: string;
  items: OrderItem[];
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: string;
}

interface OrderProps {
  item: ExtendedOrder;
  viewCallback: (id: string) => void;
}

interface OrderDetailPopupProps {
  order: ExtendedOrder;
  closeCallback: () => void;
}

interface OrderItemProps {
  item: OrderItem;
}

export default function Orders() {
  const { orders, loading } = useSelector((state: RootState) => state.order);

  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handleViewOrder = (id: string) => {
    store
      .dispatch(fetchOrderById(id))
      .unwrap()
      .then((data: Order) => {
        const extendedOrder: ExtendedOrder = {
          ...data,
          items: [],
          name: "",
          phone: "",
          address: "",
          city: "",
          country: "",
          paymentMethod: "",
          date: data.date,
        };
        setSelectedOrder(extendedOrder);
        setShowOrderDetail(true);
      });
  };

  const handleCloseViewOrder = () => {
    setSelectedOrder(null);
    setShowOrderDetail(false);
  };

  return (
    <>
      {loading && <LoadingLayer />}
      {showOrderDetail && selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          closeCallback={handleCloseViewOrder}
        />
      )}
      <h4 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Your orders</span>
      </h4>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Date placed</th>
            <th>Status</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {orders.map((item: Order, index: number) => (
            <Order key={index} item={item as unknown as ExtendedOrder} viewCallback={handleViewOrder} />
          ))}
        </tbody>
      </table>
    </>
  );
}

const Order: React.FC<OrderProps> = ({ item, viewCallback }) => {
  return (
    <tr>
      <td className="align-middle">{DateTimeConverter(item.date)}</td>
      <td className="align-middle">{item.status}</td>
      <td className="align-middle">
        {item.name}, {item.phone} -{" "}
        {item.address + ", " + item.city + ", " + item.country}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary font-weight-bold"
          onClick={() => {
            viewCallback(item.id);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
};

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({ order, closeCallback }) => {
  const [total, setTotal] = useState(0);

  // Calculate total price
  useEffect(() => {
    let tempTotal = 0;

    order.items.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });

    setTotal(tempTotal);
  }, [order]);

  return (
    <Popup>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between">
          <h4 className="section-title position-relative text-uppercase mb-3">
            Order #{order.id}
          </h4>
          <button className="btn btn-secondary" onClick={closeCallback}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="col-md-12">
          <div className="border-bottom">
            <h6 className="mb-3">Products</h6>

            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
          <div className="border-bottom">
            <div className="d-flex justify-content-between mt-3 mb-4">
              <h5>Total</h5>
              <h5>${total}</h5>
            </div>
          </div>
          <div className="border-bottom">
            <div className="d-flex justify-content-between mt-3 mb-4">
              <h5>Shipping address</h5>
              <h6>
                {order.name}, {order.phone} -{" "}
                {order.address + ", " + order.city + ", " + order.country}
              </h6>
            </div>
            <div className="d-flex justify-content-between mt-1 mb-4">
              <h5>Payment method</h5>
              <h6>{order.paymentMethod}</h6>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <h5>Status</h5>
            <h6>{order.status}</h6>
          </div>
        </div>
      </div>
    </Popup>
  );
};

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="d-flex justify-content-between">
      <p>
        {item.name} x {item.quantity}
      </p>
      <p>${item.price * item.quantity}</p>
    </div>
  );
};
