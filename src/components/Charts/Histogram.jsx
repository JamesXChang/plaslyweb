import React from 'react';
import {
  Container,
  Row, 
  Col
} from 'reactstrap';

import './Histogram.css';

class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ylim: 0,
          indicator: []
        };
    }

    render() {
        return (
            <div className='histogram' style={{height: this.props.height.toString()+'px',
                                               /*width: this.props.width.toString() + 'px'*/}}>
              <div className='ylabel'>庫存<br/>(噸)</div>
              <div className='xlabel'>類別</div>
              <HistogramChart data={this.props.data} ylim={this.state.ylim}
                            indicator={this.state.indicator}
                            handleCategoryOnClick={this.props.handleCategoryOnClick}/>
            </div>
        );
    }

    componentDidMount() {
      var d = []
      for(var i=0; i<this.props.data.length; ++i) {
        d.push(this.props.data[i].storage_qty);
      }

      var max = Math.max(...d);
      var x = parseInt(Math.log10(max));
      var ylabel = Math.ceil(max / Math.pow(10, x))
      var ylim = ylabel  * Math.pow(10, x);

      var indicator = []
      if(ylabel == 1 || ylabel == 2 || ylabel == 4 || ylabel == 8) {
        indicator = [{p: '0%', l: ylim},
                     {p: '25%', l: ylim / 4 * 3},
                     {p: '50%', l: ylim / 4 * 2},
                     {p: '75%', l: ylim / 4 * 1},
                     {p: '100%', l: 0}]
      }
      if(ylabel == 3 || ylabel == 6 || ylabel == 9) {
        indicator = [{p: '0%', l: ylim},
                     {p: '33%', l: ylim / 3 * 2},
                     {p: '66%', l: ylim / 3 * 1},
                     {p: '100%', l: 0}]
      }
      if(ylabel == 5) {
        indicator = [{p: '0%', l: ylim},
                     {p: '20%', l: ylim / 5 * 4},
                     {p: '40%', l: ylim / 5 * 3},
                     {p: '60%', l: ylim / 5 * 2},
                     {p: '80%', l: ylim / 5 * 1},
                     {p: '100%', l: 0}]
      }
      if(ylabel == 7) {
        indicator = [{p: '0%', l: ylim},
                     {p: (100/7).toString()+'%', l: ylim / 7 * 6},
                     {p: (200/7).toString()+'%', l: ylim / 7 * 5},
                     {p: (300/7).toString()+'%', l: ylim / 7 * 4},
                     {p: (400/7).toString()+'%', l: ylim / 7 * 3},
                     {p: (500/7).toString()+'%', l: ylim / 7 * 2},
                     {p: (600/7).toString()+'%', l: ylim / 7 * 1},
                     {p: '100%', l: 0}]
      }

      this.setState({
        ylim: ylim,
        indicator: indicator
      })
    }
}

class HistogramChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hover_id: -1
      }

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    render() {
      return(
        <Container className='histogram-chart' fluid>
          <Row style={{height: '100%'}}>
            <Col xs={12} style={{position: 'relative'}}>
              <div className='histogram-bar-indicator'>
                {this.props.indicator.map(ip => (
                  <div key={ip.p} className='histogram-dashed-line' style={{top: ip.p}} label={ip.l}></div>
                ))}
              </div>
              <Row style={{height: '100%'}}>
              {this.props.data.map((d, i) => (
              <Col key={d.category} className='histogram-bar-container'>
                <div className='histogram-bar' style={{transform: 'translate(0, calc('+(100-(d.storage_qty / this.props.ylim * 100))+'% + 2px))'}}>
                  <div>
                    <div className='histogram-bar-stock' style={{height: (d.storage_qty / this.props.ylim * 100)+'%'}} onMouseEnter={() => this.handleMouseEnter(i)} onMouseOut={this.handleMouseOut}
                    onClick={() => this.props.handleCategoryOnClick(d.category)}></div>
                    <div className='histogram-bar-amount' style={{height: (d.sale_qty / this.props.ylim * 100)+'%', transform: 'translate(0, -100%)'}}></div>
                    {(this.state.hover_id == i) && <div className='histogram-bar-detail' style={{top: (d.storage_qty / this.props.ylim * 50)+'%'}}>
                      <div className='d-flex justify-content-center'>庫存：{d.storage_qty} kg</div>
                      <div className='d-flex justify-content-center'>銷售：{d.sale_qty} kg</div>
                    </div>}
                  </div>
                </div>
                <div className='histogram-content pt-3'>{d.category}</div>
              </Col>
              ))}
              </Row>
            </Col>
          </Row>
        </Container>
      )
    }

    handleMouseEnter(idx) {
      this.setState({
        hover_id: idx
      })
    }

    handleMouseOut() {
      this.setState({
        hover_id: -1
      })
    }
}

export default Histogram;