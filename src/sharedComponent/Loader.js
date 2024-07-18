import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader-wrapper">
<FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#fc7700', '#fc7700', '#fc7700']}
  backgroundColor="#9c4900"
/>
    </div>
  );
}
