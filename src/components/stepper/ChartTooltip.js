import React from 'react';
import PropTypes from 'prop-types';

const ChartTooltip = ({ meta }) => {
  return (
    <div className="tooltip-wrap hidden" id="chart-tooltip">
      <div className="title" id="chart-Name" />
      <div className="valuePair">
        <span className="label">{meta.tip_cases_label}</span>
        <span className="value" id="chart-Cases" />
      </div>
      <div className="valuePair">
        <span className="label">{meta.tip_incidences_label}</span>
        <span className="value" id="chart-y" />
      </div>
      <div className="valuePair">
        <span className="label">{meta.tip_ratio_label}</span>
        <span className="value" id="chart-x" />
      </div>
    </div>
  );
};
ChartTooltip.propTypes = {
  meta: PropTypes.object
};

export default ChartTooltip;
