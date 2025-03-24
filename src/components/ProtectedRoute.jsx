// import { useAuth } from "@clerk/clerk-react";
// import React from "react";
// import { Route } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isSignedIn } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={(props) => {
//         isSignedIn ? <Component {...props} /> : <Redirect to="/sign-in" />;
//       }}
//     />
//   );
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
