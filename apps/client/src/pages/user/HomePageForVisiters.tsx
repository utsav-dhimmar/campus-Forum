import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="min-vh-100 bg-base-200 flex flex-col">
      <div className="hero bg-primary text-primary-content py-20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Welcome to Campus Forum</h1>
            <p className="py-6 text-xl opacity-90">
              Connect. Collaborate. Contribute. Your campus knowledge hub.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link to="/login" className="btn btn-neutral btn-lg">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg text-white">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary text-2xl mb-2">Ask Questions</h2>
              <p>Post your doubts and get answers from peers and mentors.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary text-2xl mb-2">Share Knowledge</h2>
              <p>Help others by answering queries and sharing resources.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary text-2xl mb-2">Stay Updated</h2>
              <p>Follow trending topics and stay in sync with campus buzz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-20 border-t border-base-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Ready to dive in?</h2>
          <p className="text-lg mb-10 max-w-xl mx-auto opacity-70">
            Join the conversation and make your voice heard in our growing community.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg px-12">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
