import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">
            Contact us for any questions or suggestions you have. We are here to
            support you.
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3" />
            Duong Dinh Nghe, Cau Giay, Ha Noi
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3" />
            vclong2003@gmail.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3" />
            0888827768
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h6 className="text-secondary text-uppercase mt-4 mb-3">
                Follow Us
              </h6>
              <div className="d-flex">
                <Link
                  className="btn btn-primary btn-square mr-2"
                  to="https://twitter.com/elonmusk"
                >
                  <i className="fab fa-twitter" />
                </Link>
                <Link
                  className="btn btn-primary btn-square mr-2"
                  to="https://www.facebook.com/zuck/"
                >
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-primary btn-square mr-2" to="#">
                  <i className="fab fa-linkedin-in" />
                </Link>
                <Link className="btn btn-primary btn-square" to="#">
                  <i className="fab fa-instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row border-top mx-xl-5 py-4"
        style={{ borderColor: "rgba(256, 256, 256, 0.1) !important" }}
      >
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-secondary">
            ©VCL - All right reserved
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="img/payments.png" alt="" />
        </div>
      </div>
    </div>
  );
}
