import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as const_api_endpoints from '../constants/api_endpoints'
import * as routes from '../constants/routes'
import getCookie from '../script'
import Spinner from 'react-bootstrap/Spinner'

const GetInput = () => {

    const effectRan = useRef(false);
    const fileReader = new FileReader();
    const navigate = useNavigate();
    
    const [isUploaded, setIsUploaded] = useState(false);
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [loadSpinner, setLoadSpinner] = useState(false);


    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    }


    const handleOnSubmit = (e) => {
        setLoadSpinner(true);                   
        e.preventDefault();
    }


    // load spinner
    useEffect(() => {
        if (file && loadSpinner) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            
            fileReader.readAsText(file);

            console.log('About to end processing table');
            console.log('loadSpinner: ', loadSpinner);
        }
        
    }, [loadSpinner]);


    // Render table:
    const headerKeys = Object.keys(Object.assign({}, ...array));

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n") - 1).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.trim().split(",");
            const obj = csvHeader.reduce((object, header, index) => {
              object[header] = values[index];
              return object;
            }, {});
            return obj;
        });
        setLoadSpinner(false);
        setIsUploaded(true);
        setArray(array);
    }


    // Submit data
    const handlePostSubmit = (e) => {
        e.preventDefault();

        fetch(`${const_api_endpoints.default.baseUrl}${const_api_endpoints.default.storeData}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie('csrftoken')
            },
            body: JSON.stringify(array).replace((/\r/g, '')).replace('undefined', '')
        })
        .then(async res => await res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
        // navigate to homepage!
        navigate(routes.default.homepageRoute);    
    }
    

    return (
        <div className='container mt-3'>
            {/* Upload Form */}
            <form className='row'>
                <h5>
                    <label htmlFor="formFile" className="form-label mx-3 mb-3">Upload csv data</label>
                </h5>
                <div className="mb-3 col-8">
                    <input className="form-control" type="file" id="formFile" 
                        accept=".csv" onChange={handleFileUpload} 
                    />
                </div>
                <div className="col-1"></div>
                <button
                    className='btn btn-primary col-3 h-50'
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form> 

            {/* Spinner */}
            {
                loadSpinner &&
                <div className="text-center mt-5 pt-5">
                    <Spinner  animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {/* Table -> Can be a different component : But is not use full to break into component except enhancing readability */}
            {
                isUploaded &&
                <div className='row my-3'>
                    <h5 className='col-10'>Data Preview</h5>
                    <button 
                        className='btn btn-success col-1 mx-1' 
                        onClick={(e) => handlePostSubmit(e)}
                    >
                        Submit
                    </button>
                </div>
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