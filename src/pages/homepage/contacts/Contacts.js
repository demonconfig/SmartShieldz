import React from "react";
import "./contact.css";

const Contacts = () => {
  return (
    <div className="contact">
      <h1 className="text-center py-5">Leave us a Message</h1>
      <div className="container contact-main pb-5">
        <div className="contact-left px-5 py-4">
          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i className="fas fa-phone"></i>
            </div>
            <div className="col-10">
              <h5> Call Us</h5>
              <h6>+91 8806607771</h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i className="far fa-envelope"></i>
            </div>
            <div className="col-10">
              <h5> Sent Us Email.</h5>
              <h6>tanushshyam32@gmail.com</h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i className="far fa-map"></i>
            </div>
            <div className="col-10">
              <h5> Meet Us At </h5>
              <h6>
              Navi Mumbai , Panvel.
              </h6>
            </div>
          </div>

          <div className="row px-0 mx-0 py-3">
            <div className="col-2 contact-logo">
              <i className="fas fa-globe"></i>
            </div>
            <div className="col-10">
              <h5> Website </h5>
              <h6> Smartshieldz.com </h6>
            </div>
          </div>
        </div>
        <div className="contact-right py-4">
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
