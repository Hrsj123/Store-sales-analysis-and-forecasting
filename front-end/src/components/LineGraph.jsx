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
            // range: [],
            nticks: 15,
            tickfont: {
                size: 1,
            }
        },
        yaxis: {
            title: props.y_title,
            range: [props.minRange + (props.minRange * 0.05), props.maxRange + (props.maxRange * 0.05)],
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