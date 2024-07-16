import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  addAddress,
  fetchAddresses,
  removeAddress,
  updateAddress,
} from "../../Redux/addressSlice";
import LoadingLayer from "../../Components/LoadingLayer";
import Popup from "../../Components/Popup";
import { RootState } from "../../Redux/store";
import { Address } from "../../Types";


interface AddressItemProps {
  item: Address;
  editCallback: (item: Address) => void;
}

interface AddressPopupProps {
  editItem: Address | null;
  closeCallback: () => void;
}

export default function Addresses() {
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState<Address | null>(null);

  const { items, loading } = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(fetchAddresses());
  }, [dispatch]);

  const handleClosePopup = () => {
    setEditItem(null);
    setShowPopup(false);
  };

  const handleAddItem = () => {
    setEditItem(null);
    setShowPopup(true);
  };

  const handleEditItem = (item: Address) => {
    setEditItem(item);
    setShowPopup(true);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : null}
      {showPopup && (
        <AddressPopup editItem={editItem} closeCallback={handleClosePopup} />
      )}
      <h4 className="section-title position-relative text-uppercase">
        <span className="bg-secondary pr-3">Addresses</span>
      </h4>
      <div className="container-fluid d-flex justify-content-end align-items-center mb-3">
        <button
          className="btn btn-sm btn-primary font-weight-bold p-2 pl-4 pr-4"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      <table className="table table-light table-borderless table-hover text-center mb-5">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item: Address, index: number) => (
            <AddressItem key={index} item={item} editCallback={handleEditItem} />
          ))}
        </tbody>
      </table>
    </>
  );
}

const AddressItem: React.FC<AddressItemProps> = ({ item, editCallback }) => {
  const { id, name, address, phone, city, country } = item;

  const handleDelete = () => {
    store.dispatch(removeAddress(id));
  };

  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{phone}</td>
      <td className="align-middle">{address}</td>
      <td className="align-middle">{city}</td>
      <td className="align-middle">{country}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary font-weight-bold"
          onClick={() => editCallback(item)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-secondary font-weight-bold ml-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const AddressPopup: React.FC<AddressPopupProps> = ({ editItem, closeCallback }) => {
  const [data, setData] = useState<Address>({
    id: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  useEffect(() => {
    if (editItem) {
      setData(editItem);
    }
  }, [editItem]);

  const handleSave = () => {
    if (editItem) {
      store.dispatch(updateAddress(data));
    } else {
      store.dispatch(addAddress(data));
    }
    closeCallback();
  };

  return (
    <Popup>
      <div className="row">
        <div className="col-md-12 form-group">
          <h4>{editItem ? "Edit address" : "Add address"}</h4>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(evt) => setData({ ...data, name: evt.target.value })}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={data.phone}
            onChange={(evt) => setData({ ...data, phone: evt.target.value })}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={(evt) => setData({ ...data, address: evt.target.value })}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={(evt) => setData({ ...data, city: evt.target.value })}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={(evt) => setData({ ...data, country: evt.target.value })}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={handleSave}
        disabled={
          !data.name ||
          !data.phone ||
          !data.address ||
          !data.city ||
          !data.country
        }
      >
        Save
      </button>
      <button
        className="btn btn-block btn-secondary font-weight-bold py-2"
        onClick={closeCallback}
      >
        Cancel
      </button>
    </Popup>
  );
};
