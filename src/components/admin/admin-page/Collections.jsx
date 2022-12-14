import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { baseURL } from "../../../config/getConfig";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseURL}/api/collections`);
        setCollections(res.data.collections);
        console.log(res.data.collections);
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      {collections.length <= 0 ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[800px] mx-auto left-[320px] transition-all flex  flex-col mt-[50px]">
          <span className="font-bold mb-5 text-[20px]">COLLECTIONS</span>
          <div className="bg-[#0d1520] w-full p-5 rounded-xl">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th className="font-[500] py-3">Id</th>
                  <th className="font-[500] py-3">Name</th>
                  <th className="font-[500] py-3">Edit</th>
                  <th className="font-[500] py-3">Delete</th>
                </tr>
              </thead>
              {collections.length > 0 &&
                collections.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <th className="font-[400] py-3">{item.id}</th>
                      <th className="font-[400] py-3">{item.name}</th>
                      <th className="font-[400] py-3">
                        <div className="w-full flex items-center justify-center">
                          <EditIcon></EditIcon>
                        </div>
                      </th>
                      <th className="font-[400] py-3">
                        <div className="w-full flex items-center justify-center">
                          <DeleteIcon></DeleteIcon>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                ))}
            </table>
            <div className="w-full ml-auto max-w-[200px]"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collections;
