import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingLayer from "../../Components/LoadingLayer";
import { useState, FormEvent, ChangeEvent } from "react";
import store, { RootState } from "../../Redux/store";
import { signup } from "../../Redux/userSlice";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const { loading } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password must be the same");
      return;
    }

    store
      .dispatch(signup(formData))
      .unwrap()
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid">
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <div className="col-12 d-flex justify-content-center p-30">
              <Link to="/" className="text-decoration-none">
                <span className="h1 text-uppercase text-primary bg-dark px-2">
                  Book
                </span>
                <span className="h1 text-uppercase text-dark bg-primary px-2">
                  Shop
                </span>
              </Link>
            </div>
            <div className="col-12">
              <form className="bg-light p-30 mb-5" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Confirm password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      placeholder="Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 form-group text-danger">
                    {error}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary font-weight-bold"
                >
                  Create new account
                </button>
                <Link to="/signin" className="text-decoration-none btn-block btn">
                  Already have an account? Login
                </Link>
              </form>
            </div>
          </div>
          <div className="col-4" />
        </div>
      </div>
    </>
  );
}
