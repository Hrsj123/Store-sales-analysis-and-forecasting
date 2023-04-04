import React, { useEffect, useState, useRef } from 'react'

const GetInput = () => {

    const effectRan = useRef(false);
    const fileReader = new FileReader();
    
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
    }

    // Render table:
    const headerKeys = Object.keys(Object.assign({}, ...array));

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
              object[header] = values[index];
              return object;
            }, {});
            return obj;
        });
        setIsUploaded(true);
        setArray(array);
    }


    return (
        <div className='container mt-3'>
            {/* Upload Form */}
            <form className='row'>
                <h5>
                    <label for="formFile" class="form-label mx-3 mb-3">Upload csv data</label>
                </h5>
                <div class="mb-3 col-8">
                    <input class="form-control" type="file" id="formFile" 
                        accept=".csv" onChange={handleFileUpload} 
                    />
                </div>
                <div className="col-1"></div>
                <button
                    className='btn btn-success col-3 h-50'
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}

                >
                    IMPORT CSV
                </button>
            </form> 

            {/* Table */}
            {
                isUploaded &&
                <h5 className='mt-3'>Data Preview</h5>
            }
            <table className='table table-striped'>
                <thead>
                <tr key={"header"}>
                    {headerKeys.map((key) => (
                    <th>{key}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {array.map((item) => (
                    <tr key={item.id}>
                    {Object.values(item).map((val) => (
                        <td>{val}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default GetInput