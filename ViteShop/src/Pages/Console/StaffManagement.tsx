import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { addStaff, fetchStaff, updateStaff } from "../../Redux/staffSlice";
import Popup from "../../Components/Popup";
import LoadingLayer from "../../Components/LoadingLayer";
import { RootState } from "../../Redux/store";
import type { StaffMember } from "../../Types";


interface StaffManagementPopupProps {
  member: StaffMember | null;
  closeCallback: () => void;
}

export default function StaffManagement() {
  const { loading, members } = useSelector((state: RootState) => state.staff);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  useEffect(() => {
    store.dispatch(fetchStaff());
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedMember(null);
    setShowPopup(false);
  };

  const handleEdit = (member: StaffMember) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showPopup && (
        <StaffManagementPopup
          member={selectedMember}
          closeCallback={handleClosePopup}
        />
      )}
      <div>
        <div className="col-12 p-0 mb-3">
          <button
            className="btn btn-primary pl-4 pr-4"
            onClick={handleOpenPopup}
          >
            Add
          </button>
        </div>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {members.map((member, index) => (
            <StaffItem key={index} member={member} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
}

interface StaffItemProps {
  member: StaffMember; // Ensure this matches the Staff interface
  editCallback: (member: StaffMember) => void;
}

function StaffItem({ member, editCallback }: StaffItemProps) {
  const { id, name, phone, address,email,password } = member;

  return (
    <tr>
      <td className="align-middle">{email}</td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{phone}</td>
      <td className="align-middle">{address}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(member);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

function StaffManagementPopup({ member, closeCallback }: StaffManagementPopupProps) {
  const [memberData, setMemberData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regPhone = /^\d{10}$/;
  const regName = /^[a-zA-Z ]{2,30}$/;
  const regAddress = /^[a-zA-Z0-9\s,'-]*$/;

  const [emailMessage, setEmailMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");

  useEffect(() => {
    if (member) {
      // Ensure member has account.email and other required properties
      setMemberData({ ...member });
    }
  }, [member]);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>, message: string, setFunction: React.Dispatch<React.SetStateAction<string>>, regType: RegExp) => {
    if (!regType.test(e.target.value)) {
      setFunction(message);
    } else {
      setFunction("");
    }
  };

  const isEmpty = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: typeof memberData) => {
    if (data.email === "" ||
      data.password === "" ||
      data.name === "" ||
      data.phone === "" ||
      data.address === "") {
      e.preventDefault();
      return true;
    }
    return false;
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isEmpty(e, memberData)) {
      if (emailMessage === "" &&
        nameMessage === "" &&
        phoneMessage === "" &&
        addressMessage === "") {
        if (member) {
          store.dispatch(updateStaff(memberData));
          return closeCallback();
        }
        store.dispatch(addStaff(memberData));
        return closeCallback();
      }
    }
  };

  return (
    <Popup>
      <div className="row">
        {!member && (
          <>
            <div className="col-md-12 form-group">
              <h5>Account</h5>
            </div>
            <div className="col-md-6 form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={memberData.email}
                onChange={(evt) => {
                  setMemberData({ ...memberData, email: evt.target.value });
                }}
                onBlur={(evt) => handleValidation(evt, "Email Wrong", setEmailMessage, regEmail)}
              />
              <p className="message" style={{ color: "red", paddingLeft: "1px" }}>{emailMessage}</p>
            </div>

            <div className="col-md-6 form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={memberData.password}
                onChange={(evt) => {
                  setMemberData({ ...memberData, password: evt.target.value });
                }}
              />
            </div>
          </>
        )}
        <div className="col-md-12 form-group mt-1">
          <h5>Information</h5>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={memberData.name}
            onChange={(evt) => {
              setMemberData({ ...memberData, name: evt.target.value });
            }}
            onBlur={(evt) => handleValidation(evt, "Name Wrong", setNameMessage, regName)}
          />
          <p className="message" style={{ color: "red", paddingLeft: "1px" }}>{nameMessage}</p>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={memberData.phone}
            onChange={(evt) => {
              setMemberData({ ...memberData, phone: evt.target.value });
            }}
            onBlur={(evt) => handleValidation(evt, "Phonenumber Wrong", setPhoneMessage, regPhone)}
          />
          <p className="message" style={{ color: "red", paddingLeft: "1px" }}>{phoneMessage}</p>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={memberData.address}
            onChange={(evt) => {
              setMemberData({ ...memberData, address: evt.target.value });
            }}
            onBlur={(evt) => handleValidation(evt, "Address Wrong", setAddressMessage, regAddress)}
          />
          <p className="message" style={{ color: "red", paddingLeft: "1px" }}>{addressMessage}</p>
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={(e) => handleSave(e)}
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
