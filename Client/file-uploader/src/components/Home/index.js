import Header from "../Header";
import "./index.css";

const Home = () => {
  const createFileInDB = async (formData) => {
    try {
      const url = `https://file-uploader-back-end.onrender.com/file`;
      const option = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(url, option);
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log("Upload file Error: ", error);
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    createFileInDB(formData);
  };
  return (
    <div className="bg-container">
      <Header />
      <div className="container">
        <div className="form-container">
          <p className="suggetion">
            Please upload documents only in 'jpg', 'jpeg', 'png' format
          </p>
          <h1 className="document-heading">My Documents</h1>
          <form className="form" onSubmit={onSubmitForm}>
            <label className="file-label" htmlFor="file">
              Please select a document
            </label>
            <input
              type="file"
              className="file-input-field"
              id="file"
              name="file"
              accept="image/*"
            />
            <label htmlFor="checkBox" className="check-box-label">
              Over Write :
            </label>
            <input
              type="checkbox"
              className="check-box"
              name="replace"
              id="checkBox"
            />
            <button className="upload-btn" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
