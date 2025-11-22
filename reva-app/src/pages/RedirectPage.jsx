const RedirectPage = ({ error }) => {
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Link Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <a href="/" className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors">
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default RedirectPage;