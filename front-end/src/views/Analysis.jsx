import React, { useEffect, useState, useRef } from 'react'
import * as const_api_endpoints from '../constants/api_endpoints'
import LineGraph from '../components/LineGraph'

const Analysis = () => {
  const effectRan = useRef();
  const [storeInput, setStoreInput] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [avgPlotData, setAvgPlotData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleInput = (e) => {
    const regex = /^[0-9]*$/;             // Matches any string consisting of zero or more digits
    if (regex.test(e.target.value) && e.target.value.length < 3) {
      setStoreInput(e.target.value);
    }
  }

  const handleSubmit = () => {
    if (storeInput === '') return alert('Enter a store number');

    setIsSubmitted(true);
    fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.storeWeeklySale + `?store-no=${storeInput}`)
      .then(res => res.json())
      .then(data => setPlotData(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (!effectRan.current) {
      fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.avgSalesProfit)
        .then(res => res.json())
        .then(data => setAvgPlotData(data))
        .catch(err => console.error(err));

        return () => {
          effectRan.current = true;
        }
    }
  }, []);

  return (
    <div className='container'>
      <h1 className='text-center mt-3'>Analysis</h1>

      {/* Form to take store number input! */}
      {
        !isSubmitted &&
        <div className="card mt-5 px-0 col-md-8 mx-auto rounded text-center">
          <form className="card-header py-5" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="store-no" className="col-sm-2 col-form-label">Store No: </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="store-no" value={storeInput} onChange={(e) => handleInput(e)} required />
              </div>
              <div className="row mt-4">
                <div className="col-10"></div>
                <input type="submit" value="Submit" className='btn btn-success col-2' />
              </div>
            </div>
          </form> 
        </div>
      }

      {     /* Add an outer card background */
        plotData &&
        <div>
          <LineGraph 
            x_array={plotData['dates']}
            y_array={plotData['weekly_sales']}
            color='green'
            title={`Store no. ${ storeInput } Sales Profit`}
            x_title='Weeks'
            y_title='Sales Profit'
            width={550}
          />
          <LineGraph 
            x_array={avgPlotData['store_no']}
            y_array={avgPlotData['avg_sales']}
            color='orange'
            title={`Stores Avg Sales Profit`}
            x_title='Store number'
            y_title='Avg Sales Profit'
            width={550}
          />
        </div>
      }
    </div>
  )
}

export default Analysis