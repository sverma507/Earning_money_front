import React from "react";
import "./term&conditions.css";
import Layout from "../../components/Layout";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="term-container">
        <h1>Terms and Conditions</h1>
        <div>
          <h2>1. Information We Collect</h2>
          <p>
            We may collect various types of personal information from you when
            you use our website, including but not limited to:
          </p>
          <ul>
            <li>
              Name, email address, phone number, and shipping/billing address
            </li>
            <li>Payment information (such as credit card details)</li>
            <li>Information about your purchase history and preferences</li>
            <li>
              Demographic information (such as age, gender, and interests)
            </li>
            <li>
              Information about your device and internet usage (such as IP
              address, browser type, and operating system)
            </li>
          </ul>
          <p>
            We may collect this information directly from you or from
            third-party sources, such as social media platforms or analytics
            providers.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We may use your personal information for various purposes, including
            but not limited to:
          </p>
          <ul>
            <li>Processing and fulfilling your orders</li>
            <li>
              Communicating with you about your orders, promotions, and other
              updates
            </li>
            <li>
              Personalizing your shopping experience and recommending products
            </li>
            <li>Improving our website, products, and services</li>
            <li>Preventing fraud and unauthorized transactions</li>
            <li>Complying with legal requirements and protecting our rights</li>
          </ul>
          <p>
            We will only use your personal information for the purposes for
            which it was collected, unless we obtain your consent for other
            uses.
          </p>

          <h2>3. How We Share Your Information</h2>
          <p>
            We may share your personal information with third parties for
            various purposes, including but not limited to:
          </p>
          <ul>
            <li>Shipping carriers and fulfillment providers</li>
            <li>Payment processors and fraud prevention services</li>
            <li>Marketing and advertising partners</li>
            <li>Analytics and website hosting providers</li>
            <li>Legal and regulatory authorities</li>
          </ul>
          <p>
            We will only share your personal information with third parties who
            have a legitimate need to access it and who are bound by
            confidentiality obligations.
          </p>

          <h2>4. How We Protect Your Information</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. We use
            industry-standard security technologies and procedures to safeguard
            your information.
          </p>
          <p>
            However, please note that no method of transmission over the
            internet or electronic storage is 100% secure. We cannot guarantee
            the security of your personal information and are not responsible
            for any unauthorized access, use, or disclosure that is beyond our
            control.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>
            You have certain rights and choices regarding your personal
            information, including but not limited to:
          </p>
          <ul>
            <li>Accessing and updating your personal information</li>
            <li>Opting out of marketing communications</li>
            <li>Deleting your personal information</li>
            <li>Objecting to certain uses of your personal information</li>
            <li>
              Withdrawing your consent for certain uses of your personal
              information
            </li>
          </ul>
          <p>To exercise your rights and choices, please contact us.</p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under the
            age of 13. If we become aware that we have collected personal
            information from a child under the age of 13, we will take steps to
            delete the information as soon as possible.
          </p>

          <h2>7. Changes to this Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time to reflect
            changes in our information practices. If we make any material
            changes to this privacy policy, we will notify you by email or by
            posting a notice on our website.
          </p>
          <p>
            If you have any questions or concerns about this privacy policy,
            please contact us via email.
          </p>
        </div>
        
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
