import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import StepperComponent from './StepperComponent';
import actions from './duck/actions';
import stepperData from './_data';
import { chartUtils } from './duck';
import 'font-awesome/css/font-awesome.min.css';
import './stepper.css';

class StepperContainer extends Component {
  componentDidMount() {
    const { setStepperData, setStepperRaw, setStepperOptions } = this.props;
    const meta = _.get(stepperData, 'data.metadata', {});
    const levels = _.get(meta, 'hdi_levels', []);
    const data = _.map(stepperData.data.countries, (x, i) => {
      const carto = _.get(meta, 'carto_layout[' + x.ISO + ']', {
        x: -100,
        y: -100,
      });
      return {
        ...x,
        x: +x[meta.x_field],
        y: +x[meta.y_field],
        i: i,
        groupIndex: levels.indexOf(x.HDI),
        cartoX: carto.x,
        cartoY: carto.y,
      };
    });
    setStepperData(data);
    setStepperRaw(stepperData);

    chartUtils.init();
    chartUtils.update(0, null, data, meta);
  }

  render() {
    const { stepper, setStepperCurrent } = this.props;
    const mode = _.get(stepper, 'scenes[' + stepper.current + '].mode');
    return (
      <div className={'chart-wrap mode-' + mode} id="chart-wrap">
        <div id="chart" className="chart" />
        {stepper.scenes.length > 0 ? (
          <div>
            <StepperComponent
              {...stepper}
              setStepperCurrent={setStepperCurrent}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

StepperContainer.propTypes = {
  setStepperData: PropTypes.func,
  setStepperRaw: PropTypes.func,
  setStepperCurrent: PropTypes.func,
  setStepperOptions: PropTypes.func,
  stepper: PropTypes.object,
};

const mapStateToProps = state => ({
  stepper: state.stepper,
});

const enhance = connect(
  mapStateToProps,
  {
    setStepperData: actions.setStepperData,
    setStepperRaw: actions.setStepperRaw,
    setStepperCurrent: actions.setStepperCurrent,
    setStepperOptions: actions.setStepperOptions,
  },
);

export default enhance(StepperContainer);
