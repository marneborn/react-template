'use strict';

const React = require('react');
const ReactShallowRenderer = require('react-test-renderer/shallow');

const Thing = require('../js/Thing');

describe('#Thing', function() {
  const color = 'pink';
  let thing;

  beforeEach(function() {
    const shallow = new ReactShallowRenderer();
    thing = shallow.render(React.createElement(Thing));
  });

  it('should create have the "thing" class on the created div', function() {
    expect(thing.type).to.equal('div');
    expect(thing.props.className).to.equal('thing');
  });
});
