import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chartOptions from '../chartOptions';

const init = (chartInstanceId = _.random(1000000)) => {
  // TODO: enable multiple instances of chart. Requires refactor of store
  const container = document.getElementById('chart-wrap');
  const h = container.offsetHeight;
  const w = container.offsetWidth;
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', w)
    .attr('height', h);
  return svg
    .append('g')
    .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');
};
const update = (current, prev, data, meta) => {
  // basic scene info
  const scene = meta.scenes[current];
  const mode = scene.mode;
  const scatterplot = mode === 'scatterplot';
  const type = scene.type;
  const xProp = scatterplot ? 'x' : 'cartoX';
  const yProp = scatterplot ? 'y' : 'cartoY';
  const rProp = 'Cases';
  const selected = data.filter(x => scene.selected.indexOf(x.ISO) > -1);

  // node functions
  const nodeRadius = 6;
  const rFromA = a => Math.sqrt(a) / 3.14159;
  const nodeFill = d => chartOptions.colors[d.groupIndex];

  const nodeR = d => (scatterplot ? nodeRadius : rFromA(+d.Cases) / 2.2);
  const nodeRLarge = d =>
    scatterplot ? nodeRadius * 2 : (rFromA(+d.Cases) / 2) * 1.2;
  const nodeX = d => d[xProp];
  const nodeY = d => d[yProp];
  const nodeOpacity = d =>
    type !== 'group' || scene.active.indexOf(d.ISO) > -1 ? 1 : 0.1;

  const t = d3.transition().duration(750);
  const tShort = d3.transition().duration(250);
  const tLong = d3.transition().duration(1500);

  // chart info
  const container = document.getElementById('chart-wrap');
  const h = container.offsetHeight;
  const w = container.offsetWidth;
  const margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
  };

  const svg = d3
    .select('svg')
    .attr('width', w)
    .attr('height', h);

  svg.select('.axis').remove();
  svg.select('#average').remove();
  const minMax = [
    Math.round(_.minBy(data, xProp)[xProp]),
    Math.round(_.maxBy(data, xProp)[xProp]),
    Math.round(_.minBy(data, yProp)[yProp]),
    Math.round(_.maxBy(data, yProp)[yProp]),
    rFromA(Math.round(_.minBy(data, rProp)[rProp])),
    rFromA(Math.round(_.maxBy(data, rProp)[rProp])),
  ];
  const xScale = d3
    .scaleLinear()
    .range([margin.left, w - margin.right])
    .domain([
      Math.floor((minMax[0] * 0.9) / 10) * 10,
      Math.ceil((minMax[1] * 1.1) / 10) * 10,
    ]);
  const yRange = scatterplot
    ? [h - margin.top, margin.bottom]
    : [margin.bottom, h - margin.top];
  const yScale = d3
    .scaleLinear()
    .range(yRange)
    .domain([minMax[2] * 0.9, minMax[3] * 1.1]);
  const rScale = d3
    .scaleLinear()
    .range([0, 20])
    .domain([minMax[4], minMax[5]]);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // prev scene - workaround for transitions failure
  const pscene = prev !== null ? meta.scenes[prev] : {};
  const pmode = pscene.mode;
  const pscatterplot = pmode === 'scatterplot';
  const ptype = pscene.type;
  const pxProp = pscatterplot ? 'x' : 'cartoX';
  const pyProp = pscatterplot ? 'y' : 'cartoY';

  // node functions
  const pnodeR = d => (pscatterplot ? nodeRadius : rFromA(+d.Cases) / 2);
  const pnodeX = d => d[pxProp];
  const pnodeY = d => d[pyProp];
  const pnodeOpacity = d =>
    ptype !== 'group' || pscene.active.indexOf(d.ISO) > -1 ? 1 : 0.1;

  const pminMax = [
    Math.round(_.minBy(data, pxProp)[pxProp]),
    Math.round(_.maxBy(data, pxProp)[pxProp]),
    Math.round(_.minBy(data, pyProp)[pyProp]),
    Math.round(_.maxBy(data, pyProp)[pyProp]),
  ];
  const pxScale = d3
    .scaleLinear()
    .range([margin.left, w - margin.right])
    .domain([
      Math.floor((pminMax[0] * 0.9) / 10) * 10,
      Math.ceil((pminMax[1] * 1.1) / 10) * 10,
    ]);
  const pyRange = pscatterplot
    ? [h - margin.top, margin.bottom]
    : [margin.bottom, h - margin.top];
  const pyScale = d3
    .scaleLinear()
    .range(pyRange)
    .domain([pminMax[2] * 0.9, pminMax[3] * 1.1]);

  const pxAxis = d3.axisBottom().scale(pxScale);
  const pyAxis = d3.axisLeft().scale(pyScale);

  const nodes = svg.selectAll('.node').remove();

  if (scatterplot) {
    svg
      .append('g')
      .attr('class', 'axis xAxis')
      .style('stroke-dasharray', '3, 3')
      .attr('transform', 'translate(0,' + (h - margin.bottom) + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'axis yAxis')
      .style('stroke-dasharray', '3, 3')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(yAxis);
  } else {
  }
  function addGroup() {
    const filtered = data.filter(x => scene.active.indexOf(x.ISO) > -1);
    const ave = [_.meanBy(filtered, 'x'), _.meanBy(filtered, 'y')];
    const groupIndex = filtered[0].groupIndex;
    const color = chartOptions.colors[groupIndex];
    const pos = [xScale(ave[0]), yScale(ave[1])];
    const group = svg.append('g').attr('id', 'average');

    filtered.forEach(d =>
      group
        .append('line')
        .style('stroke', color)
        .style('stroke-opacity', 0.2)
        .attr('x1', xScale(nodeX(d)))
        .attr('y1', yScale(nodeY(d)))
        .attr('x2', xScale(nodeX(d)))
        .attr('y2', yScale(nodeY(d)))
        .transition(tLong)
        .attr('x2', pos[0])
        .attr('y2', pos[1]),
    );

    group
      .append('circle')
      .attr('cx', () => pos[0])
      .attr('cy', () => pos[1])
      .transition(t)
      .attr('fill', '#ffffff')
      .attr('stroke-width', 3)
      .attr('stroke', color)
      .attr('r', function() {
        return nodeRadius;
      })
      .style('fill-opacity', 1);

    group
      .append('text')
      .style('fill', '#333333')
      .style('text-anchor', 'middle')
      .attr('x', () => pos[0])
      .attr('y', () => pos[1] - 15)
      .text(function() {
        return 'AVERAGE';
      });
    selected.forEach(d =>
      group
        .append('text')
        .attr('class', 'hover-ignore')
        .style('fill', '#a0a0a0')
        .style('text-anchor', 'middle')
        .attr('x', () => xScale(nodeX(d)))
        .attr('y', () => yScale(nodeY(d)) - 15)
        .text(function() {
          return d.Name;
        }),
    );
  }
  function addGroupCarto() {
    const group = svg.append('g').attr('id', 'average');
    selected.forEach(d =>
      group
        .append('text')
        .attr('class', 'hover-ignore')
        .style('fill', () => (scatterplot ? '#a0a0a0' : '#ffffff'))
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .attr('x', () => xScale(nodeX(d)))
        .attr(
          'y',
          () => (scatterplot ? yScale(nodeY(d)) - 15 : yScale(nodeY(d))),
        )
        .text(function() {
          return d.Name;
        }),
    );
  }
  // Create Event Handlers for mouse
  function handleMouseOver(d, i) {
    console.log('this', this, d, d.ISO, i, svg);
    d3.select(this)
      .attr('fill', '#ea27a3')
      .attr('r', nodeRLarge);

    const tooltip = d3
      .select('#chart-tooltip')
      .style('left', xScale(nodeX(d)) - 30 + 'px')
      .style('top', yScale(nodeY(d)) - 15 + 'px');
    tooltip.select('#chart-Name').text(d.Name);
    tooltip.select('#chart-Cases').text(d3.format(',')(d.Cases));
    tooltip.select('#chart-x').text(d.x);
    tooltip.select('#chart-y').text(d.y);

    d3.select('#chart-tooltip').classed('hidden', false);
  }

  function handleMouseOut(d, i) {
    // Change color back to normal
    d3.select(this)
      .attr('fill', nodeFill)
      .attr('r', nodeR);

    d3.select('#chart-tooltip').classed('hidden', true);
  }

  // EXIT old elements not present in new data.
  /*
node
    .exit()
    .attr('class', 'exit')
    .transition(t)
    .style('fill-opacity', 1e-6)
    .remove();

  // UPDATE old elements present in new data.
  // TODO: the app doesn't recognize the updates for some reason, for a work-around we retrieve the expected locations and redraw
  node
    .attr('class', 'update')
    .transition(t)
    .attr('fill', nodeFill)
    .attr('cx', d => xScale(nodeX(d)))
    .attr('cy', d => yScale(nodeY(d)))
    .attr('r', nodeR)
    .style('fill-opacity', nodeOpacity);
    */

  // ENTER new elements present in new data.

  const newNodes = svg.selectAll('.node').data(data, function(d) {
    return d;
  });

  newNodes
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('id', d => d.ISO)
    .attr('fill', nodeFill)
    .attr('cx', d => pxScale(pnodeX(d)))
    .attr('cy', d => pyScale(pnodeY(d)))
    .attr('r', pnodeR)
    .style('fill-opacity', pnodeOpacity)
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)
    .transition(t)
    .attr('cx', d => xScale(nodeX(d)))
    .attr('cy', d => yScale(nodeY(d)))
    .attr('r', nodeR)
    .style('fill-opacity', nodeOpacity);

  if (type === 'group') {
    addGroup();
  } else {
    addGroupCarto();
  }
};

export const chartUtils = {
  init,
  update,
};
