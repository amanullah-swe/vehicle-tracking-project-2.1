import React, { useEffect } from "react";
import camera from "../../../assets/images/ic-camera.svg";

export default function ImageUplode({ setFile }) {
  let id = "DropZone";
  useEffect(() => {
    initDragAndDrop();
  }, []);
  const initDragAndDrop = () => {
    var dropZone = document.getElementById(id);
    // Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
    dropZone &&
      dropZone.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      });
    dropZone && dropZone.addEventListener("drop", drop);
  };
  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    let file = "";
    if (e.target && e.target.files) {
      file = e.target.files;
    } else {
      file = e.dataTransfer.files;
    }
    setFile(file);
  }

  return (
    <div className="border-block " id={id}>
      <div
        className="select_vehicle_icon"
        style={{
          position: "relative",
          cursor: "pointer",
          height: "148px",
        }}
      >
        <input
     
          onChange={drop}
          accept="image/png, image/gif, image/jpeg"
          id={"uploadImages"}
          type="file"
          name="vehicle_images"
          style={{
            display:"none"
          }}
        />
        {/* <img style={{}} src={camera} alt="" className="upload-icon-1" /> */}

        <a
          href="#"
          style={{
            color: "#4D9DE7",
            backgroundColor: "transparent",
            border: "none",
            marginTop: "10px",
          }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("uploadImages").click();
          }}
        >
          {/* <p
            style={{
              // marginTop: "20px",
              backgroundColor: "transparent",
              border: "none",
            }}
            className="uimage-1"
          >
            Upload Image
          </p> */}
          <img src={camera} alt="" />
        </a>
      </div>
    </div>
  );
}
