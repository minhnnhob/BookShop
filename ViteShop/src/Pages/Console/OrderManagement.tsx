import { useSelector } from "react-redux";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import { useEffect, useState } from "react";
import store from "../../Redux/store";
import LoadingLayer from "../../Components/LoadingLayer";
import {
  fetchAllOrders,
  fetchOrderById,
  updateOrderStatus,
} from "../../Redux/orderSlice";
import Popup from "../../Components/Popup";
import DateTimeConverter from "../../Components/Converter/dateTime";
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
  order: ExtendedOrder;
  openDetailCallback: (id: string) => void;
}

interface OrderDetailPopupProps {
  order: ExtendedOrder;
  closeCallback: () => void;
}

export default function OrderManagement() {
  const { orders, loading } = useSelector((state: RootState) => state.order);

  const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(null);

  useEffect(() => {
    store.dispatch(fetchAllOrders());
  }, []);

  const handleOpenOrderDetail = (id: string) => {
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
          date: new Date(data.date),
        };
        setSelectedOrder(extendedOrder);
        setShowOrderDetail(true);
      });
  };

  const handleCloseOrderDetail = () => {
    setSelectedOrder(null);
    setShowOrderDetail(false);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : null}
      {showOrderDetail && selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          closeCallback={handleCloseOrderDetail}
        />
      )}
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {orders.map((order: Order, index: number) => (
            <Order
              key={index}
              order={order as unknown as ExtendedOrder}
              openDetailCallback={handleOpenOrderDetail}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

const Order: React.FC<OrderProps> = ({ order, openDetailCallback }) => {
  return (
    <tr>
      <td className="align-middle">{order.id}</td>
      <td className="align-middle">{DateTimeConverter(order.date)}</td>
      <td className="align-middle">{order.name + ", " + order.phone}</td>
      <td className="align-middle">{order.status}</td>
      <td className="align-middle">
        <button
          className="btn btn-primary"
          onClick={() => {
            openDetailCallback(order.id);
          }}
        >
          Detail
        </button>
      </td>
    </tr>
  );
};

const OrderDetailPopup: React.FC<OrderDetailPopupProps> = ({ order, closeCallback }) => {
  const updating = useSelector((state: RootState) => state.order.updating);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string>(order.status);

  // Calculate total price
  useEffect(() => {
    let tempTotal = 0;

    order.items.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });

    setTotal(tempTotal);
  }, [order]);

  const handleSaveStatus = () => {
    store.dispatch(updateOrderStatus({ id: order.id, status: status }));
  };

  return (
    <Popup>
      {updating ? <LoadingLayer /> : null}
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

            {order.items.map((item: OrderItem, index: number) => (
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

const OrderItem: React.FC<{ item: OrderItem }> = ({ item }) => {
  return (
    <div className="d-flex justify-content-between">
      <p>
        {item.name} x {item.quantity}
      </p>
      <p>${item.price * item.quantity}</p>
    </div>
  );
};
