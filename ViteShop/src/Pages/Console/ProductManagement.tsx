import { useEffect, useState } from "react";
import Popup from "../../Components/Popup";
import "react-quill/dist/quill.snow.css"; // Css for rich text editor
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import DateTimeConverter from "../../Components/Converter/dateTime";
import store from "../../Redux/store";
import {
  addProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "../../Redux/productSlice";
import LoadingLayer from "../../Components/LoadingLayer";
import {Product} from "../../Types";


export default function ProductManagement() {
  const [showPopup, setShowpopup] = useState(false);

  const { items, loading } = useSelector((state: any) => state.product);
  const [editItem, setEditItem] = useState<any>(null); //item to be edited, null if adding new item

  useEffect(() => {
    store.dispatch(fetchProducts({ category: "", search: "" }));
  }, []);

  const handleOpenPopup = () => {
    setShowpopup(true);
  };
  const handleClosePopup = () => {
    setEditItem(null);
    setShowpopup(false);
  };
  const handleEdit = (id: string) => {
    store
      .dispatch(fetchProductById(id))
      .unwrap()
      .then((productData: any) => {
        setEditItem(productData);
      })
      .then(() => {
        setShowpopup(true);
      });
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showPopup ? (
        <ProductManagementPopup
          editItem={editItem}
          closeCallback={handleClosePopup}
        />
      ) : (
        ""
      )}
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4" onClick={handleOpenPopup}>
          Add
        </button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publishcation Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item: any, index: number) => (
            <ProductItem key={index} item={item} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProductItem({ item, editCallback }: any) {
  const { name, author, publisher, publishcationDate, price, quantity } = item;
  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{author}</td>
      <td className="align-middle">{publisher}</td>
      <td className="align-middle">{DateTimeConverter(publishcationDate)}</td>
      <td className="align-middle">${price}</td>
      <td className="align-middle">{quantity}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(item.id);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

function ProductManagementPopup({ editItem, closeCallback }: any) {
  const categories = useSelector((state: any) => state.category.items);

  const [thumbnailFile, setThumbnailFile] = useState<any>(null); //thumbnail file to be uploaded to Firebase, process locally
  const [description, setDescription] = useState("");
  const [productData, setProductData] = useState({
    
    categoryId: categories[0].id, //default category will be the first category in the list
    name: "",
    thumbnailUrl: "",
    
    author: "",
    publisher: "",
    publishcationDate: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (editItem) {
      setProductData({
        ...editItem,
        description: null, //description is not stored in productData, it is stored in productDescription (react-quill cause component to re-render)
        publishcationDate: new Date(editItem.publishcationDate)
          .toISOString()
          .split("T")[0],
      });
      setDescription(editItem.description);
    }
  }, [editItem]);



  const handleSave = () => {
    
    if (editItem) {
      store.dispatch(
        updateProduct({
          productData: { ...productData, description: description } as unknown as Product,
          thumbnailFile,
        })
      );
      return closeCallback();
    }

    store.dispatch(
      addProduct({
        productData: { ...productData, description: description } as unknown as Product,
        thumbnailFile,
      })
    );
    return closeCallback();
  };

  return (
    <Popup>
      <div className="row">
        <div className="col-md-12 form-group">
          <h4>{editItem ? "Edit" : "Add"} product</h4>
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Product name"
            value={productData.name}
            onChange={(evt) => {
              setProductData({ ...productData, name: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Author"
            value={productData.author}
            onChange={(evt) => {
              setProductData({ ...productData, author: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Publisher"
            value={productData.publisher}
            onChange={(evt) => {
              setProductData({ ...productData, publisher: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="date"
            placeholder="Publishcation date"
            value={productData.publishcationDate}
            onChange={(evt) => {
              setProductData({
                ...productData,
                publishcationDate: evt.target.value,
              });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <select
            className="form-control"
            value={productData.categoryId}
            onChange={(evt) => {
              setProductData({ ...productData, categoryId: evt.target.value });
            }}
          >
            {categories.map((category: any, index: number) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 form-group">
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(evt) => {
              setProductData({ ...productData, price: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-3 form-group">
          <input
            className="form-control"
            type="number"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={(evt) => {
              setProductData({ ...productData, quantity: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            type="file"
            accept="image/*"
            title="Thumbnail"
            onChange={(evt) => {
              if (evt.target.files !== null) {
                setThumbnailFile(evt.target.files[0]);
              }
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <img
            src={
              thumbnailFile
                ? URL.createObjectURL(thumbnailFile)
                : productData.thumbnailUrl
            }
            alt="Thumbnail"
            className="mw-100"
          />
        </div>
        <div className="col-md-12 form-group">
          <ReactQuill
            value={description}
            onChange={setDescription}
            placeholder="Description"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={handleSave}
        disabled={
          !productData.name ||
          !productData.author ||
          !productData.publisher ||
          !productData.publishcationDate ||
          !productData.price ||
          !productData.quantity ||
          (!thumbnailFile && !productData.thumbnailUrl)
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
}
