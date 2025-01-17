import React, { Component } from 'react';
import * as StationsAPI from './StationsAPI';
import * as CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {

    constructor() {
        super();
        this.state = {
            oneOfstation: null
        }
      }    

    componentDidMount() {
        StationsAPI.graphData(this.props.stationId).then((points) => {
            //console.log(oneOfstation)
            this.setState({
                oneOfstation: points
            })
        })
    }

    handlePoints(points){
        
        if(points == null) {
            return 
        } else{
            return points.map((point) => {
                //let pointX = { x: point.x, y: point.y }
                
                return { x: new Date(point.x), y: point.y }
            })
        }

        
    }

    render() {
        console.log('before')
        let invokeHandlePoints = this.handlePoints(this.state.oneOfstation)
        console.log(invokeHandlePoints)
        
        console.log('after')
        const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: ""
			},
			axisY:{
				title: "Liczba rowerów",
				includeZero: false
			},
			data: [{
				type: "stepLine",
				xValueFormatString: "HH MM MMM YYYY",
				markerSize: 5,
                dataPoints: invokeHandlePoints
                /*[
                    
					{ x: new Date("2017- 01- 01"), y: 1792 },
					{ x: new Date("2017- 02- 20"), y: 1526 },
					{ x: new Date("2017- 03- 11"), y: 1955 },
					{ x: new Date("2017- 04- 05"), y: 1727 },
					{ x: new Date("2017- 05- 04"), y: 1523 },
					{ x: new Date("2017- 06- 21"), y: 1257 },
					{ x: new Date("2017- 07- 05"), y: 1520 },
					{ x: new Date("2017- 08- 03"), y: 1853 },
					{ x: new Date("2017- 09- 11"), y: 1738 },
                    { x: new Date("2017- 10- 03"), y: 1754 }
                    
				]*/
            }]
            

		}

        return (
            <div>
            <CanvasJSChart options = {options}
                    
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        );
    }
}

export default Graph;