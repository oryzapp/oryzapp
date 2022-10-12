import React, { useState } from "react";

export default function AddRiceAccessions() {
  const [state, setState] = useState({
    accession: "",
    variety: "",
    source: "",
    classification: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="hidden addRiceModal flex flex-col p-3 bg-white w-3/6 h-4/6 absolute top-0 bottom-16 right-0 left-0 m-auto rounded-md">
      <button className="bg-blue-300 absolute right-3">X</button>
      <div className="flex-auto bg-red-300">
        <form action="" className="flex h-full flex-col bg-green-800">
          <label htmlFor="">
            <input
              type="text"
              name="accession"
              value={state.accession}
              placeholder="CL-XXXX"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Variety
            <input
              type="text"
              name="variety"
              value={state.variety}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Source
            <input
              type="text"
              name="source"
              value={state.source}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="">
            Classification
            <input
              type="text"
              name="classification"
              value={state.classification}
              onChange={handleChange}
            />
          </label>
          <div className="flex-auto  bg-slate-400">+ Add Image</div>
          <button className=" bg-green-300">Store</button>
        </form>
      </div>
    </section>
  );
}
