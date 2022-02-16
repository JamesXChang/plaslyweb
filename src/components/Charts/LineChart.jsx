import React from 'react';
import {
  AreaChart,
  linearGradient,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area
} from 'recharts';
import {
  Row,
  Col 
} from 'reactstrap';

import './LineChart.css';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Row className='line-chart justify-content-center align-items-center'>
            <Col className='title' xs='auto'>{this.props.content}</Col>
            <Col xs='auto'>
              <AreaChart width={this.props.width} height={this.props.height} data={this.props.data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#109CF1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#109CF1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {/* <XAxis dataKey="name" axisLine={false} tickLine={false} interval={2} style={{transform: 'translate(0, 10px)'}}/> */}
                {/* <YAxis axisLine={false} tickLine={false} style={{transform: 'translate(-10px, 0)'}}/> */}
                {/* <CartesianGrid strokeDasharray="6 6" vertical={false}/> */}
                {/* <Tooltip content={<CustomTooltip />}/> */}
                <Area type="monotone" dataKey="pv" stroke="#109CF1" fillOpacity={1} fill="url(#color)" />
              </AreaChart>
            </Col>
            <Col xs='auto' className='content'>
              <div>庫存：{this.props.storage} kg</div>
              <div>銷售：{this.props.sale} kg</div>
            </Col>
          </Row>
        );
    }

    componentDidMount() {

    }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default LineChart;

// const data = [
//   {
//     "name": "1月",
//     "pv": 2400
//   },
//   {
//     "name": "2月",
//     "pv": 1398
//   },
//   {
//     "name": "3月",
//     "pv": 9800
//   },
//   {
//     "name": "4月",
//     "pv": 3908
//   },
//   {
//     "name": "5月",
//     "pv": 4800
//   },
//   {
//     "name": "6月",
//     "pv": 3800
//   },
//   {
//     "name": "7月",
//     "pv": 4300
//   }
// ]