import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column">
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">Welcome to Campus Forum</h1>
          <p className="lead">
            Connect. Collaborate. Contribute. Your campus knowledge hub.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-light btn-lg me-3">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">
              Join Now
            </Link>
          </div>
        </div>
      </header>

      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Ask Questions</h5>
                <p className="card-text">
                  Post your doubts and get answers from peers and mentors.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Share Knowledge</h5>
                <p className="card-text">
                  Help others by answering queries and sharing resources.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Stay Updated</h5>
                <p className="card-text">
                  Follow trending topics and stay in sync with campus buzz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-5 border-top">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-3">Ready to dive in?</h2>
          <p className="mb-4">
            Join the conversation and make your voice heard.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
