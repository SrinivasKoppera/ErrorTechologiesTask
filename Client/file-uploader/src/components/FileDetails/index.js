import "./index.css";

const FileDetails = (props) => {
  const { fileDetails, deleteFileFromDB } = props;
  const { name, url, _id } = fileDetails;

  return (
    <li className="file-item">
      <img src={url} alt={name} className="file-image" />
      <button
        type="button"
        className="delete-btn"
        onClick={() => deleteFileFromDB(_id)}
      >
        Delete
      </button>
    </li>
  );
};

export default FileDetails;
