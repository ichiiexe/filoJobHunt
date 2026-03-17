const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-800 text-gray-100 py-4 mt-8 border-t border-gray-700">
      <div className="container flex justify-center space-x-6 mb-4">
        <div>
          <h2 className="text-gray-100 font-semibold mb-2">For Job Seekers</h2>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/" className="hover:text-gray-200 transition">
                Find Jobs
              </a>
            </li>
            <li>
              <a
                href="/jobs"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Create Profile
              </a>
            </li>
            <li>
              <a
                href="/companies"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Salary Guide
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-100 font-semibold mb-2">For Employers</h2>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/employers" className="hover:text-gray-200 transition">
                Find Candidates
              </a>
            </li>
            <li>
              <a
                href="/post-job"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Post a Job
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-100 font-semibold mb-2">Contact us</h2>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/blog" className="hover:text-gray-200 transition">
                support@filojobhunt.com
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="text-gray-400 hover:text-gray-200 transition"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-100 font-semibold mb-2">Company</h2>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="/about" className="hover:text-gray-200 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-200 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} FiloJobHunt. All rights reserved. 🇵🇭
        </p>
      </div>
    </footer>
  );
};

export default Footer;
