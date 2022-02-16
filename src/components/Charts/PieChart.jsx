import React from 'react';
import { connect } from 'react-redux';

import './PieChart.css';

import { pieChartStatus } from 'api/warehouse-api.js';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: {},
          mid_key: ''
        }

        this.drawCanvas = this.drawCanvas.bind(this);
    }

    render() {
      var length = Object.keys(this.state.data).length;
      return(
        <div className='pie-chart-container'>
          <canvas id='pie-chart' width={2*this.props.radius+17+100} height={2*this.props.radius+17}
            onClick={() => this.props.handleOnClick(this.state.mid_key)}/>
          {Object.keys(this.state.data).map((k, i) => (
            <div key={k} className='pie-chart-text' style={{left: 2*this.props.radius+77, top: this.props.radius+12-(length/2-i)*24}}>{status_mapping[k]}</div>
          ))}
          {this.state.data[this.state.mid_key] && <div className='pie-chart-mid' style={{color: color[this.state.mid_key], top: this.props.radius+8, left: this.props.radius+8}}>{this.state.data[this.state.mid_key].toFixed(1)}%</div>}
        </div>
      );
    }

    sumTo100(data){
      var sum = 0;
      for(var key in data) {
        sum += parseInt(data[key]);
      }
      this.setState({
        sum: sum
      })
      var result = {}
      for(var key in data) {
        result[key] = parseInt(data[key]) * 100 / sum;
      }
      this.setState({
        data: result
      })
      this.setState({
        mid_key: Object.keys(data)[0]
      })
    }

    drawCanvas(offsetX, offsetY) {
      var canvas = document.getElementById("pie-chart");
      var ctx = canvas.getContext("2d");
      var start = 0;
      var length = Object.keys(this.state.data).length;
      var i = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var cx = this.props.radius+8, cy = this.props.radius+8;
      var cursor_in_circle = false;
      for(var key in this.state.data) {
        var end = start + this.state.data[key];
        ctx.beginPath();
        ctx.strokeStyle = color[key];
        ctx.lineWidth = 7;
        ctx.arc(cx, cy, this.props.radius, start/100. *2*Math.PI, end/100. *2*Math.PI);
        ctx.stroke();
        if (ctx.isPointInStroke(offsetX, offsetY)) {
          this.setState({
            mid_key: key
          })
          cursor_in_circle = true;
        }

        // white region to detect mouse moving
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.moveTo(cx,cy);
        ctx.arc(cx, cy, this.props.radius-3, start/100. *2*Math.PI, end/100. *2*Math.PI);
        ctx.lineTo(cx,cy);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        if (ctx.isPointInPath(offsetX, offsetY)) {
          this.setState({
            mid_key: key
          })
          cursor_in_circle = true;
        }
        start = end;

        ctx.beginPath();
        ctx.strokeStyle = color[key];
        ctx.lineWidth = 2;
        ctx.arc(2*this.props.radius+62, this.props.radius+20-(length/2-i)*24, 4, 0, 2*Math.PI);
        ctx.stroke();
        i = i + 1;
      }
      if(cursor_in_circle) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'auto';
      }
    }

    componentDidMount() {
      pieChartStatus(this.props.token).then(response => {
        if(response.status == "success") {
          this.sumTo100(response.info[0]);
          this.drawCanvas(-10, -10); // no point in canvas
        }
      })
      
      var canvas = document.getElementById('pie-chart');
      canvas.onmousemove = e => {
        this.drawCanvas(e.offsetX, e.offsetY);
      }
    }
}

export default connect(state=>{
  return {
      ...state.token
  }
})(PieChart);

const color = {
  normal: '#2ED47A',
  expired_soon: '#FF0000',
  expired: '#838383',
  not_enough: '#FFB946',
  producing: '#5FC5FF'
};

const status_mapping = {
  normal: '庫存正常',
  expired_soon: '久置',
  expired: '過期',
  not_enough: '庫存不足',
  producing: '生產中'
}