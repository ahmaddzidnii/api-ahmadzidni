import React from "react";


const ServerError = () => {
  return (
    <div className="space-navbar bg-sky-50 pb-5">
      <div className="container">
        <div className="row  d-flex align-items-center text-center">
          <div className="col-md-6">
            <img className="card-img" src="/assets/img/500.png" />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold titlenotfound">500</h1>
            <h1 className="fw-bold fs-1">INTERNAL SERVER ERROR</h1>
            <h2 className="fs-3">Maaf Ada Kesalahan Teknis di Server Kami. Tenang.. Akan Kami Perbaiki Sesegera Mungkin.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
