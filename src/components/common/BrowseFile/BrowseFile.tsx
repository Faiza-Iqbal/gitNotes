import "./BrowseFile.css"
const BrowseFile = () => {
    return (
      <>
        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="file"
          className="fileInput"
          type="file"
        />
        <label htmlFor="file" className="fileLabel">
          Add File
        </label>
      </>
    )
  }
  export default BrowseFile;