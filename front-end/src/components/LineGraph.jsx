import React from 'react'
import Plot from 'react-plotly.js'

const Plotter = (props) => {
    const data = [
        {
            x: props.x_array,
            y: props.y_array,
            type: 'scatter',
            marker: {color: props.color},
        },
    ]

    const layout = {
        width: props.width, 
        height: props.height, 
        title: props.title,
        xaxis: {
            title: props.x_title,
            nticks: 15,
            tickfont: {
                size: 1,
            }
        },
        yaxis: {
            title: props.y_title,
            nticks: 10,
            tickfont: {
                size: 10,
            }
        },
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

Plotter.defaultProps = {
    width: 700,
    height: 500,
    color: 'orange',
}

export default Plotter


// Samples plotter referred: 
    // <Plot
    //     data={[
    //       {
    //         x: plotData['dates'],
    //         y: plotData['weekly_sales'],
    //         type: 'scatter',
    //         // mode: 'lines+markers',
    //         marker: {color: 'green'},
    //       },
    //       // {type: 'bar', x: plotData['dates'], y: plotData['weekly_sales']},
    //     ]}
    //     layout={{
    //       width: 700, 
    //       height: 500, 
    //       title: `Store no. ${ storeInput } sales profit`,
    //       xaxis: {
    //         title: 'Weeks',
    //         // range: [0, 15],
    //         nticks: 15,
    //       },
    //       yaxis: {
    //         title: 'Sales Profit',
    //         // range: [0, 10],
    //         nticks: 10
    //       },
    //     }}
    //   />