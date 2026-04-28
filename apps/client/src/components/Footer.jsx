import { Link } from "react-router";
import { useAuth } from "../context/User.context";

export default function Footer() {
  const { data, logout } = useAuth();
  const quickLinks = [
    {
      text: "Home",
      path: "/",
    },
  ];
  return (
    <footer className="bg-primary text-white mt-5 footer ">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Campus Forum</h5>
            <p className="small">
              A place for students to connect, share knowledge, and collaborate
              on ideas. Built for our campus community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              {quickLinks.map((data) => (
                <li key={data.text}>
                  <Link
                    to={data.path}
                    className="text-white text-decoration-none"
                  >
                    {data.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">📍 Navsari, GJ</p>
            <p className="small mb-1">📧 support@campusforum.edu</p>
            <p className="small">📞 +91 1234567894</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center small">
          &copy; 2025 Campus Forum. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
