import React from "react";
import { Container } from "react-bootstrap";
import DoctorMenu from "../components/layout/DoctorMenu";

const TermsOfUse = () => {
  return (
    <DoctorMenu>
      <Container
        style={{
          padding: "5px 50px",
        }}
        className="terms-of-use scroll"
      >
        <h2 className="mb-5">Terms of Use</h2>
        <p>
          Welcome to Doctor’s App! Please read these Terms & Conditions
          ("Terms") carefully before using the Tasty Truck mobile application
          ("App") operated by Tasty Truck ("we," "us," or "our"). Your use of
          the App constitutes your agreement to these Terms.
        </p>
        <div className="privacy-cont">
          <h6 className="text-uppercase">Use of the App:</h6>

          <ol>
            <li>
              <span className="purple-text"> Personal Information:</span> We may
              collect certain personally identifiable information, such as your
              name, email address, phone number, and location when you place an
              order, sign up for an account, or interact with the App.
            </li>{" "}
            <li>
              <span className="purple-text">Order Details:</span> When you place
              an order through the App, we collect information related to your
              order, including the items ordered, payment details, and delivery
              address.
            </li>{" "}
            <li>
              <span className="purple-text">Device Information:</span> We may
              automatically collect information about your device, including its
              model, operating system, and unique device identifier.
            </li>{" "}
          </ol>
        </div>{" "}
        <div className="privacy-cont">
          <h6>How We Use Your Information::</h6>

          <ol>
            <li>
              <span className="purple-text"> Order Processing:</span> We use the
              information you provide to process your orders, manage deliveries,
              and send order updates.
            </li>{" "}
            <li>
              <span className="purple-text">Personalization:</span> We may use
              your preferences and order history to personalize your experience
              and recommend dishes you might enjoy.
            </li>{" "}
            <li>
              <span className="purple-text">Communication:</span> We use your
              contact information to send notifications, updates about offers,
              and other relevant information related to our services.
            </li>{" "}
            <li>
              <span className="purple-text"> Analytics:</span> We gather
              anonymized data to analyze user behavior and improve the App's
              functionality and user experience.
            </li>{" "}
            <li>
              <span className="purple-text">Legal Compliance:</span> We may use
              your information to comply with legal obligations, resolve
              disputes, and enforce our terms and policies.
            </li>
          </ol>
        </div>
        <div className="privacy-cont">
          <h6>Termination:</h6>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information with:
          </p>
          <ul>
            <li>
              <span className="purple-text">Service Providers:</span> We may
              share your information with trusted third-party service providers
              who assist us in delivering our services, such as payment
              processors and delivery partners.
            </li>{" "}
            <li>
              We may disclose your information if required by law or to protect
              our rights, safety, and property, or the rights, safety, and
              property of others.
            </li>
          </ul>
        </div>
        <div className="privacy-cont">
          <h6>Limitation of Liability</h6>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction.
          </p>
        </div>
        <div className="privacy-cont">
          <h6>Changes to Terms::</h6>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. Any changes will be effective immediately
            upon posting the revised Terms on this page. Your continued use of
            the App after any such changes constitutes your acceptance of the
            new Terms.
          </p>
        </div>{" "}
      </Container>
    </DoctorMenu>
  );
};

export default TermsOfUse;
