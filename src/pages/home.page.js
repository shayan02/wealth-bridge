import React from "react";
import "./home.page.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1>Welcome to Wealth Bridge</h1>
              <p>
                Where our Relationship Managers share their wealth management
                strategies and insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 box">
            <h1 className="text-center">Welcome to Wealth Bridge</h1>
            <p className="lead">
              We are a wealth management firm that provides expert financial
              advice and personalized solutions to help you achieve your
              financial goals.
            </p>
            <p>
              Our wealth management app is designed to provide our clients with
              an unmatched level of investment support and guidance. Our team of
              highly skilled and experienced relationship managers work
              tirelessly to identify and analyze investment opportunities across
              a wide range of asset classes and markets. Every day, our
              relationship managers provide hundreds of investment ideas to our
              clients, tailored to their individual investment objectives, risk
              tolerance, and financial goals. Our clients can choose from a
              diverse range of investment options and receive personalized
              advice and support from our dedicated team of experts. With our
              wealth management app, clients can access the latest market
              insights and make informed investment decisions with confidence.
            </p>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h2 className="text-center">Latest Insights</h2>
            <div className="card mx-3 col-md-5">
              <img
                src="https://prod-upp-image-read.ft.com/cf0756e4-39ff-11e5-bbd1-b37bc06f590c"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Investing in Emerging Markets</h5>
                <p className="card-text">
                  Investing in emerging markets can offer significant growth
                  opportunities for investors looking to diversify their
                  portfolios. Emerging markets, such as China, India, and
                  Brazil, are characterized by their high-growth potential and
                  rapidly expanding economies. While investing in these markets
                  can be more volatile and riskier than investing in developed
                  markets, it can also yield higher returns in the long run.{" "}
                </p>
              </div>
            </div>
            <div className="card mx-3 col-md-5">
              <img
                src="https://www.bankingsupport.info/wp-content/uploads/2023/01/AdobeStock_293196436.-2048x1366.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Planning for Retirement</h5>
                <p className="card-text">
                  Investing with us for your retirement plan can be a smart
                  choice to secure your financial future. Our team of
                  experienced professionals can guide you through the investment
                  process and help you create a personalized plan tailored to
                  your goals and risk tolerance. Don't wait until it's too late,
                  start investing with us today and take control of your
                  financial future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="feature">
                <h2>Expertise</h2>
                <p>
                  Our Relationship Managers have decades of experience in wealth
                  management and are dedicated to helping you achieve your
                  financial goals.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature">
                <h2>Strategy</h2>
                <p>
                  We work with you to develop a customized wealth management
                  strategy that takes into account your unique financial
                  situation and goals.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature">
                <h2>Insights</h2>
                <p>
                  Our Relationship Managers share their insights and
                  perspectives on the markets, investments, and wealth
                  management strategies to
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>Ready to get started?</h2>
              <p>
                Sign up today to schedule a consultation with one of our
                Relationship Managers and start your journey to financial
                success.
              </p>
              <Link className="nav-link" to="./sign-up">
                {" "}
                <button className="btn btn-primary"> Sign up </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p>&copy; 2023 Wealth Bridge. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
