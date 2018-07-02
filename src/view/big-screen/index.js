import React, { Component } from 'react';
import BsPart from './bs-part';
import EvidenceSize from './evidence-size';
import EvidenceSizeDistribution from './evidence-size-distribution';
import EvidenceSizeTop5 from './evidence-size-top5';

import DataNodeDistribution from './data-node-distribution';
import EvidenceTendency from './evidence-tendency';

import EvidenceCaseSize from './evidence-case-size';
import EvidenceCaseState from './evidence-case-state';
import Nearly6mCaseDistribution from './nearly6m-case-distribution';

import './index.css';
export default class Index extends Component {
  render() {
    return (
      <div className="big-screen">
        <div className="bs-header">大屏展示</div>
        <div className="bs-body">
          <div className="bs-col1">
            <BsPart title="xxx" body={<EvidenceSize/>} ownclass="evidence-size"/>
            <BsPart title="xxx" body={<EvidenceSizeDistribution/>}  ownclass="evidence-size-distribution"/>
            <BsPart title="xxx" body={''}  ownclass="evidence-size-top5"/>
            {/* <EvidenceSizeTop5/> */}
          </div>
          <div className="bs-col2">
            <BsPart title="xxx" body={<DataNodeDistribution/>} ownclass="data-node-distribution"/>
            <BsPart title="xxx" body={''}  ownclass="evidence-tendency"/>
            {/* <EvidenceTendency/> */}
          </div>
          <div className="bs-col3">
            <BsPart title="xxx" body={<EvidenceCaseSize/>} ownclass="evidence-case-size"/>
            <BsPart title="xxx" body={<EvidenceCaseState/>}  ownclass="evidence-case-state"/>
            <BsPart title="xxx" body={<Nearly6mCaseDistribution/>}  ownclass="nearly6m-case-distribution"/>
          </div>
        </div>
      </div>
    );
  }
}
