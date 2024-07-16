import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  addCategory,
  fetchCategories,
  updateCategory,
} from "../../Redux/CategorySlice";
import LoadingLayer from "../../Components/LoadingLayer";
import Popup from "../../Components/Popup";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function CategoryManagement() {
  const { loading, items } = useSelector((state: any) => state.category);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    store.dispatch(fetchCategories());
  }, []);

  const handleOpenPopup = () => {
    setSelectedCategory(null);
    setShowPopUp(true);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
    setShowPopUp(false);
  };

  const handleEdit = (item: Category) => {
    setSelectedCategory(item);
    setShowPopUp(true);
  };

  const handleSave = () => {
    if (selectedCategory) {
      store.dispatch(updateCategory({ id: selectedCategory.id, ...categoryData }));
    } else {
      store.dispatch(addCategory(categoryData));
    }
    handleClosePopup();
  };

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setCategoryData({ ...selectedCategory });
    } else {
      setCategoryData({ name: "", description: "" });
    }
  }, [selectedCategory]);

  return (
    <>
      {loading ? <LoadingLayer /> : null}
      {showPopUp && (
        <CategoryPopup item={selectedCategory} closeCallback={handleClosePopup} onSave={handleSave} />
      )}

      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4" onClick={handleOpenPopup}>
          Add
        </button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item: Category, index: number) => (
            <CategoryItem key={index} item={item} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
}

interface CategoryItemProps {
  item: Category;
  editCallback: (item: Category) => void;
}

function CategoryItem({ item, editCallback }: CategoryItemProps) {
  const { id, name, description } = item;
  return (
    <tr>
      <td className="align-middle">{id}</td>
      <td className="align-middle">{name}</td>
      <td
        className="align-middle "
        style={{
          maxWidth: "250px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(item);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

interface CategoryPopupProps {
  item: Category | null;
  closeCallback: () => void;
  onSave: () => void;
}

function CategoryPopup({ item, closeCallback, onSave }: CategoryPopupProps) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (item) {
      setCategoryData({ ...item });
    } else {
      setCategoryData({ name: "", description: "" });
    }
  }, [item]);

  return (
    <Popup>
      <div className="row" style={{ width: "40vw" }}>
        <div className="col-md-12 form-group">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Enter name"
            value={categoryData.name}
            onChange={(evt) => {
              setCategoryData({
                ...categoryData,
                name: evt.target.value,
              });
            }}
          />
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={6}
            placeholder="Enter Description"
            value={categoryData.description}
            onChange={(evt) => {
              setCategoryData({
                ...categoryData,
                description: evt.target.value,
              });
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={onSave}
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
