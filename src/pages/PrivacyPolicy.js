import React from "react";
import { Container } from "react-bootstrap";
import DoctorMenu from "../components/layout/DoctorMenu";

const PrivacyPolicy = () => {
  return (
    <DoctorMenu>
      <Container
        style={{
          padding: "5px 50px",
        }}
        className="privacy-policy scroll"
      >
        <h2 className="mb-5">Privacy Policy</h2>
        <p>
          This Privacy Policy outlines how Doctor’s App we collects, uses, and
          safeguards your personal information when you use our mobile
          application ("App"). By using the App, you agree to the terms
          described in this Privacy Policy.
        </p>
        <div className="privacy-cont">
          <h6>Information We Collect:</h6>

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
            <li>
              <span className="purple-text"> Location Information:</span> With
              your permission, we may collect your precise location data to
              provide you with location-based services, such as finding the
              nearest food truck.
            </li>
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
          <h6>Sharing Your Information:</h6>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information with:{" "}
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
          <h6>Security</h6>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction.
          </p>
        </div>
        <div className="privacy-cont">
          <h6>Changes to Privacy Policy:</h6>
          <p>
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page, and the "Last Updated" date will be modified
            accordingly.
          </p>
        </div>
      </Container>
    </DoctorMenu>
  );
};

export default PrivacyPolicy;
