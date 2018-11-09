import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import ChartTooltip from './ChartTooltip';

function Controlbar({ current, scenes, setStepperCurrent }) {
  return (
    <div>
      {scenes && scenes.length > 0 && current !== 0 ? (
        <ButtonToolbar>
          <Button
            onClick={() => setStepperCurrent(current - 1)}
            disabled={current === 0}
          >
            Prev
          </Button>

          <ButtonGroup className="m-l-sm">
            {scenes.map((s, i) => {
              return (
                <Button
                  key={i}
                  color={current === i ? 'primary' : 'default'}
                  onClick={() => setStepperCurrent(i)}
                  active={current === i}
                >
                  {i}
                </Button>
              );
            })}
          </ButtonGroup>
          <Button onClick={() => setStepperCurrent(current + 1)}>Next</Button>
        </ButtonToolbar>
      ) : null}
    </div>
  );
}

Controlbar.propTypes = {
  current: PropTypes.number,
  scenes: PropTypes.array,
  setStepperCurrent: PropTypes.func
};

function StepperComponent(props) {
  const { current, scenes, meta, setStepperCurrent } = props;
  const scene = scenes[current];
  return (
    <div>
      <div className="furniture">
        <Controlbar {...props} />
        <div className="title">{scene.title}</div>
        <div className="description">{scene.text}</div>
        <div className="footnote">{scene.note}</div>
      </div>
      {current === 0 ? (
        <Button
          className="btn-begin btn-lg"
          onClick={() => setStepperCurrent(current + 1)}
        >
          Begin <i className="fa fa-chevron-right m-l-sm" />
        </Button>
      ) : null}
      <ChartTooltip meta={meta} />
    </div>
  );
}

StepperComponent.propTypes = {
  current: PropTypes.number,
  scenes: PropTypes.array,
  meta: PropTypes.object,
  setStepperCurrent: PropTypes.func
};

export default StepperComponent;
