describe('Service', function() {
	'use strict';

	var snooze = require('snooze');
	var should = require('should');

	require('../main.js');
	snooze.module('myApp', ['snooze-baselib']);

	beforeEach(function() {
		snooze.module('myApp').EntityManager.removeEntity('mySrv');
		snooze.module('myApp').EntityManager.removeEntity('mySrv2');
		snooze.module('myApp').configs.length = 0;
		snooze.module('myApp').runs.length = 0;
	});

	it('should be defined', function() {
		(typeof snooze.module('myApp').service).should.not.equal('undefined');
	});

	it('should inject a service using $get', function(done) {
		snooze.module('myApp')
			.service('mySrv', function() {
				var $get = {
					foo: 'bar'
				};

				return {
					bar: 'baz',
					'$get': $get
				};
			})
			.run(function(mySrv) {
				(typeof mySrv.bar).should.equal('undefined');
				mySrv.foo.should.equal('bar');
				done();
			})
			.wakeup();
	});

	it('should config a service using $config', function(done) {
		snooze.module('myApp')
			.service('mySrv', function() {
				var $config = {
					foo: 'bar'
				};

				return {
					bar: 'baz',
					'$config': $config
				};
			})
			.config(function(mySrv) {
				(typeof mySrv.bar).should.equal('undefined');
				mySrv.foo.should.equal('bar');
				done();
			})
			.wakeup();
	});

	it('should register dependencies from the injectable function constructor', function(done) {
		snooze.module('myApp')
			.service('mySrv', function() {})
			.service('mySrv2', function(mySrv) {})
			.run(function() {
				snooze.module('myApp').EntityManager.getEntity('mySrv2').dependencies.length.should.equal(1);
				done();
			})
			.wakeup();
	});
});