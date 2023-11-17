import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Header from "../Header";
import FileDetails from "../FileDetails";
import noDataImage from "../../images/no-data.webp";
import { Link } from "react-router-dom";
import "./index.css";

const filesAPIConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Files = () => {
  const [filesArray, updateFilesArray] = useState([]);
  const [APIStatus, updateAPIStatus] = useState(filesAPIConstants.initial);

  useEffect(() => {
    gettingFilesFromDB();
  }, []);

  const renderLoadingView = () => (
    <div className="loading-container">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );

  const gettingFilesFromDB = async () => {
    updateAPIStatus(filesAPIConstants.inProgress);
    try {
      const url = "https://file-uploader-back-end.onrender.com/file";
      const option = {
        method: "GET",
      };
      const response = await fetch(url, option);
      const data = await response.json();
      updateAPIStatus(filesAPIConstants.success);
      updateFilesArray(data.files);
    } catch (error) {
      console.log("Getting Files Error", error);
      updateAPIStatus(filesAPIConstants.failure);
    }
  };

  const renderNoFilesView = () => {
    return (
      <div className="no-data-container">
        <img src={noDataImage} alt="noFilesImage" className="no-data-image" />
        <p className="no-data-description">No Data In Your Database</p>
        <Link to="/">
          <button type="button" className="go-to-upload-btn">
            Go to Upload
          </button>
        </Link>
      </div>
    );
  };

  const deleteFileFromDB = async (id) => {
    try {
      const url = `https://file-uploader-back-end.onrender.com/file/${id}`;
      const option = {
        method: "DELETE",
      };
      const response = await fetch(url, option);
      const data = await response.json();
      alert(data.message);
      gettingFilesFromDB();
    } catch (error) {
      console.log("File Deleting Error : ", error);
    }
  };

  const renderSuccessView = () => {
    return (
      <div className="success-files-container">
        <h2 className="files-heading">This is all your files</h2>
        <ul className="success-files-lists">
          {filesArray.map((eachItem) => (
            <FileDetails
              key={eachItem._id}
              fileDetails={eachItem}
              deleteFileFromDB={deleteFileFromDB}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={() => gettingFilesFromDB()}
      >
        Retry
      </button>
    </div>
  );

  const renderFilesView = () => {
    switch (APIStatus) {
      case filesAPIConstants.success:
        return filesArray.length === 0
          ? renderNoFilesView()
          : renderSuccessView();
      case filesAPIConstants.failure:
        return renderFailureView();
      case filesAPIConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="main-container">{renderFilesView()}</div>
    </div>
  );
};

export default Files;
