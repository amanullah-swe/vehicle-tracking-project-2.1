import React, { useRef, useState } from "react";
import uploadIcon from "../assets/images/uploadIcon.svg";
import Dropzone from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
// import { dataUrlToFile, dataUrlToFileUsingFetch } from "./react-cropper/utils";
import "cropperjs/dist/cropper.css";
import { Modal } from "react-bootstrap";
// import { Compress } from "compress"

export default function DragAndDrop({ lkey, setter, data, size, setErrorMsg, errorMsg }) {

  const [imageSize, setImageSize] = useState({
    height: "",
    width: "",
  });
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const cropperRef = useRef(null);
 const [uplodedImageInFileBlob, setUplodedImageInFileBlobirst] = useState("")

  function drop(e) {
    setErrorMsg("")
    let current = { ...data };
      var [imageFile] = e;
      setUplodedImageInFileBlobirst(imageFile)
      const { type: mimeType } = imageFile;

      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = function (e) {
        var image = new Image();

        image.src = e.target.result;
        image.onload = function () {
          setImage(reader.result);
          var height = this.height;
          var width = this.width;
          if (height > size.height || width > size.width) {
            // BY CROPPING IMAGE
            // setShow(true);
            // BY CROPPING IMAGE


            // BY IMAGE COMPRESS  

            const canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            const context = canvas.getContext('2d', { alpha: false });
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const resizedImageAsBase64 = canvas.toDataURL(mimeType);
            var arr = resizedImageAsBase64.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[arr.length - 1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            const fileBlob = new File([u8arr], imageFile.name, { type: mime });

            current[lkey] = fileBlob;
            setter({ ...current });

            //  COMPRESS IMAGE  

          } else {
            current[lkey] = imageFile;
            setter({ ...current });
            setErrorMsg("");
          }
          return true;
        };
      };

  }

  const onCrop = (e) => {
  
    setImageSize({
      height: e.detail?.height,
      width: e.detail?.width,
    });

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
 
    } else if (e.target) {
      files = e.target.files;
  
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    // reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    let current = { ...data };

    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      let cropData = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      var arr = cropData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const fileBlob = new File([u8arr], uplodedImageInFileBlob.name, { type: mime });
     
      current[lkey] = fileBlob;
      setter({ ...current });
      setShow(false);
    }

  };

  // const handleUpload = async (url) => {
  //   console.log("url,", url);
  //   // const file = dataUrlToFile(url, "output.png");
  //   // console.log(file);
  //   // console.log(
  //   //   `We have File "${file.name}", now we can upload it wherever we want!`
  //   // );
  // };

  return (
    <Dropzone
      onDrop={drop}
      // onChange={uploadImage}
      multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <>
          <div {...getRootProps({ className: "fileDropper" })}>
            <label htmlFor={lkey} className="imageHolder">
              <div className="innerFlex">
                {/* <img src={uploadIcon} className="browseImg" alt="" />
                <p className="innerTxt">Drag & Drop Your File</p>
                <p className="innerTxt">Or</p> */}
                {/* <label htmlFor={lkey} className="browseBtn">
                  <input
                   accept="image/png, image/jpeg"
                    type="file"
                    id={lkey}
                    className="d-none"
                    onChange={drop}
                    // onChange={uploadImage}
                    {...getInputProps()}
                    multiple={false}
                  />
                 
                </label> */}
                 <p className="mt-1 browseBtn" >Browse File</p>
              </div>
            </label>
          </div>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            centered
            className="common-model"
          >
            <Modal.Header closeButton>
              <Modal.Title>{"Crop image"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label> Height </label> : {Math.round(imageSize?.height)} px{" "}
                <br />
                <label> Width </label> : {Math.round(imageSize?.width)} px
              </div>
              <div>
                <Cropper
                  ref={cropperRef && cropperRef}
                  style={{ height: 400, width: "700px" }}
                  //   zoomTo={0.5}
                  initialAspectRatio={size.width / size.height}
                  preview=".img-preview"
                  crop={onCrop}
                  src={image}
                  //   src={image && URL?.createObjectURL(image)}
                  viewMode={1}
                  minCropBoxHeight={size.height}
                  minCropBoxWidth={size.width}
                  background={false}
                  responsive={true}
                  // autoCropArea={size.width / size.height}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="pop-up-modal-footer">
              <button className="cx-btn-2" onClick={getCropData}>
                {"Crop & Uplode image"}
              </button>
              {/* <button
                className="cx-btn-2"
                onClick={() => handleUpload(cropData)}
              >
                {"Uplode"}
              </button> */}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Dropzone>
  );
}
