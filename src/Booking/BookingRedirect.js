import React, { useEffect } from "react";

const BookingRedirect = () => {
  useEffect(() => {
    // Redirect to the main Ring and Ride website booking form
    window.location.href = "https://www.ringandride.org/request-a-journey/";
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <main className="wmnds-container wmnds-m-t-lg homepage">
      <div className="wmnds-m-b-lg">
        <h1>Redirection</h1>
        <p>Redirecting...</p>
        <p>
          If you are not automatically redirected, please click{" "}
          <a href="https://www.ringandride.org/request-a-journey/">
            here to book a journey
          </a>.
        </p>
      </div>
    </main>
  );
};

export default BookingRedirect;