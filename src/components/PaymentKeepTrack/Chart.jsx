import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.addSymbols = this.addSymbols.bind(this);
	}
	addSymbols(e) {
		var suffixes = [""];
		var order = Math.max(Math.floor(Math.log(e.value)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value) + suffix;
	}

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	componentDidMount() {
		this.props.dispatch({
			type: 'FETCH_TOTAL_PAYMENT_BY_MONTH',
			payload: this.props.year
		});
	}

	render() {
		

		const options = {
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
				text: `Monthly Payment ${this.props.year}`
			},
			axisX: {
				valueFormatString: "MMMM"
			},
			axisY: {
				prefix: "$",
				labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: "column",
				name: "Actual Pay",
				showInLegend: true,
				xValueFormatString: "MMMM YYYY",
				yValueFormatString: "$#,##0",
				dataPoints: this.props.reduxState.totalPaymentByMonthReducer.map(z => {
					return {
						x: new Date(this.props.year,z.month -1),
						y:  Number(z.total_amount)
					}
				})

			}, {
				type: "line",
				name: "Expected Pay",
				showInLegend: true,
				yValueFormatString: "$#,##0",
				dataPoints: [0,1,2,3,4,5,6,7,8,9,10,11].map((month)=>{
					return {x: new Date(this.props.year, month), y: 500}
				})
			},
				// {
				// 	type: "area",
				// 	name: "Profit",
				// 	markerBorderColor: "white",
				// 	markerBorderThickness: 2,
				// 	showInLegend: true,
				// 	yValueFormatString: "$#,##0",
				// 	dataPoints: [
				// 		{ x: new Date(2020, 0), y: 11500 },
				// 		{ x: new Date(2020, 1), y: 10500 },
				// 		{ x: new Date(2020, 2), y: 9000 },
				// 		{ x: new Date(2020, 3), y: 13500 },
				// 		{ x: new Date(2020, 4), y: 13890 },
				// 		{ x: new Date(2020, 5), y: 18500 },
				// 		{ x: new Date(2020, 6), y: 16000 },
				// 		{ x: new Date(2020, 7), y: 14500 },
				// 		{ x: new Date(2020, 8), y: 15880 },
				// 		{ x: new Date(2020, 9), y: 24000 },
				// 		{ x: new Date(2020, 10), y: 31000 },
				// 		{ x: new Date(2020, 11), y: 19000 }
				// 	]
				// }
			]
		}
		return (
			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
			</div>
		);
	}
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(Chart);