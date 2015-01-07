describe('mergeModeConfig', function() {
	'use strict';

	var snooze = require('snooze');
	var should = require('should');

	require('../main.js');
	snooze.module('myApp', ['snooze-baselib']);

	it('should merge the development mode config', function() {
		snooze.module('myApp').snoozeConfig = {
			foo: 'bar',
			modes: {
				development: {
					foo: 'baz'
				}
			}
		};

		snooze.module('myApp').preprocessConfig();

		snooze.module('myApp').snoozeConfig.foo.should.equal('bar');

		snooze.module('myApp').snoozeConfig.mode = 'development';

		snooze.module('myApp').preprocessConfig();

		snooze.module('myApp').snoozeConfig.foo.should.equal('baz');
	});
});