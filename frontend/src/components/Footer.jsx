const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-center space-x-6 mb-4">
        <div>
          <h2>For Job Seekers</h2>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Find Jobs
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:underline">
                Create Profile
              </a>
            </li>
            <li>
              <a href="/companies" className="hover:underline">
                Salary Guide
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>For Employers</h2>
          <ul>
            <li>
              <a href="/employers" className="hover:underline">
                Find Candidates
              </a>
            </li>
            <li>
              <a href="/post-job" className="hover:underline">
                Post a Job
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contact us</h2>
          <ul>
            <li>
              <a href="/blog" className="hover:underline">
                support@filojobhunt.com
              </a>
            </li>
            <li>
              <a href="/help" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/help" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} FiloJobHunt. All rights reserved. 🇵🇭
        </p>
      </div>
    </footer>
  );
};

export default Footer;
