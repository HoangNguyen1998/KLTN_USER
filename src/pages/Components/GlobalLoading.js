import React from "react";
import { useSelector } from "react-redux";
import LoadingIcon from "assets/loading.gif";

const GlobalLoading = () => {
  const loading = useSelector(state => state.Loading.showLoading);
  console.log(loading);
  const _renderLoading = () => {
    let xhtml = null;
    if (loading) {
      xhtml = (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 10000000,
            background: "rgba(0,0,0,0.4)"
          }}
        >
          <img
            src={LoadingIcon}
            alt="Loading"
            style={{
              left: 0,
              right: 0,
              position: "fixed",
              width: 100,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20%"
            }}
          />
        </div>
      );
      return xhtml;
    }
  };
  return <React.Fragment>{_renderLoading()}</React.Fragment>;
};

export default GlobalLoading;
