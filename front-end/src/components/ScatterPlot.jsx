import React from 'react'
import Plot from 'react-plotly.js'

const ScatterPlot = (props) => {

    const data = [
        {
            x: props.x_array,       
            y: props.y_array,       
            mode: 'markers',
            type: 'scatter',        
            marker: {
                color: props.color,
                size: 5
            },
        }
    ]

    const layout = {
        width: props.width, 
        height: props.height, 
        title: props.title,
        xaxis: {
            title: props.x_title,
            nticks: 15,
            tickfont: {
                size: 10,
            }
        },
        yaxis: {
            title: props.y_title,
            nticks: 10,
            tickfont: {
                size: 10,
            }
        },
        margin: {
            l: 45,
            r: 5,
            b: 50,
            t: 45,
            // pad: 0,
        }   
    }

    const config = {
        displayModeBar: false,
    }

  return (
    <Plot
        data={ data }
        layout={ layout }
        config={ config }
    />
  )
}

ScatterPlot.defaultProps = {
    width: 300,
    height: 260,
    color: 'orange',
}

export default ScatterPlot