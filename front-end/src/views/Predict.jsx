import React, { useState, useEffect, useRef } from 'react'
import * as const_api_endpoints from '../constants/api_endpoints'
import { Table } from 'react-bootstrap';
import ScatterPlot from '../components/ScatterPlot';
import Spinner from 'react-bootstrap/Spinner'

const Predict = () => {

  const effectRan = useRef(false);
  const [storeNo, setStoreNo] = useState('');
  const [holidayFlag, setHolidayFlag] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');
  const [responseReceived, setResponseReceived] = useState(false);
  const [response, setResponse] = useState(null);
  const [callFetch, setCallFetch] = useState(false);                

  useEffect(() => {
    if (callFetch) {
      if (!effectRan.current) {
        const query_params = `?store_no=${storeNo}&holiday_flag=${holidayFlag ? 1 : 0}&year=${year}&month=${month}&week=${week}`;
        console.log(query_params);
        fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.weeklySalePrediction + query_params)
          .then(res => res.json())
          .then(data => {
            setResponse(data);
            setResponseReceived(true);
          })
          .catch(err => console.error(err));
        
        return () => {
          effectRan.current = true;
        }
      }
    }
  }, [callFetch]);
  
  const getPredictionValue = (e) => {
    e.preventDefault();
    setCallFetch(true);             
  }

  return (
    <div className='container mt-3'>
      <h1 className="text-center">Predict</h1>
      {
        !responseReceived ?
          !callFetch ?
          <div className="row mt-4">
            <div className="mx-auto col-8">
                <form>

                  <div className="form-group">
                    <label htmlFor="storeNo">Store No: </label>
                    <input type="text" className="form-control" placeholder="Store No." value={storeNo} onChange={(e) => setStoreNo(e.target.value)}/>
                  </div>

                  <div className="form-check mt-3">
                    <input type="checkbox" className="form-check-input" checked={holidayFlag} onChange={(e) => setHolidayFlag(e.target.checked)} id="holiday_flag" />
                    <label className="form-check-label" htmlFor="holiday_flag">Holiday Flag</label>
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="year">Year: </label>
                    <input type="number" className="form-control" id="year" placeholder="Year" onChange={(e) => setYear(e.target.value)} />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="month">Month: </label>
                    <input type="number" className="form-control" id="month" placeholder="Month" onChange={(e) => setMonth(e.target.value)} />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="week">Week: </label>
                    <input type="number" className="form-control" id="week" placeholder="Week" onChange={(e) => setWeek(e.target.value)} />
                  </div>

                  <input type="submit" value="Submit" className="btn btn-primary mt-3" onClick={(e) => getPredictionValue(e)} />
                </form>
            </div>
          </div> 
          : 
          <div className="text-center mt-5 pt-5">
            <Spinner  animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        :
        <div className="mt-3">
          <p className="text-center"><b>The predicted value of weekly sale by various algorithms:</b></p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='align-middle'>Algorithm</th>
                <th className='align-middle'>Weekly Sales Prediction</th>
                <th className='align-middle'>r<sup>2</sup> Score</th>
                <th className='align-middle'>mse Score</th>
                <th className='align-middle'>rmse Score</th>
                <th className='align-middle'>Scatter Plot</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(response).map(([key, value], index) => (
                  <tr key={index}>
                    <td className='align-middle'>{key}</td>
                    <td className='align-middle'>{value.weeklySalesPrediction}</td>
                    <td className='align-middle'>{value.r2Score}</td>
                    <td className='align-middle'>{value.mseScore}</td>
                    <td className='align-middle'>{value.rmseScore}</td>
                    <td className='align-middle p-0'>  
                      <ScatterPlot 
                          x_array={value.y_test}
                          y_array={value.y_pred}
                          color='blue'
                          x_title='Actual value'
                          y_title='Predicted value'
                          title='Scatter Plot'
                        />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      }
    </div>
  )
}

export default Predict



