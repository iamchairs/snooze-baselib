describe('Constant', function() {
	'use strict';

	var snooze = require('snooze');
	var should = require('should');

	require('../main.js');
	snooze.module('myApp', ['snooze-baselib']);

	beforeEach(function() {
		snooze.module('myApp').EntityManager.removeEntity('val');
		snooze.module('myApp').configs.length = 0;
		snooze.module('myApp').runs.length = 0;
	});

	it('should be defined', function() {
		(typeof snooze.module('myApp').value).should.not.equal('undefined');
	});

	it('should inject an object constant', function(done) {
		snooze.module('myApp')
			.constant('val', {foo: 'bar'})
			.run(function(val) {
				val.foo.should.equal('bar');
				done();
			})
			.wakeup();
	});

	it('should inject an array constant', function(done) {
		snooze.module('myApp')
			.constant('val', ['foo'])
			.run(function(val) {
				val[0].should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should inject a non-object constant', function(done) {
		snooze.module('myApp')
			.constant('val', 'foo')
			.run(function(val) {
				val.should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should inject a function constant', function(done) {
		snooze.module('myApp')
			.constant('val', function() {
				return 'foo';
			})
			.run(function(val) {
				val().should.equal('foo');
				done();
			})
			.wakeup();
	});

	it('should not update an object constant between runs', function(done) {
		snooze.module('myApp')
			.constant('val', {foo: 'bar'})
			.run(function(val) {
				val.foo.should.equal('bar');
				val.foo = 'baz';
			})
			.run(function(val) {
				val.foo.should.not.equal('baz');
				done();
			})
			.wakeup();
	});

	it('should not update a value using the module.constant method', function() {
		var thrown = false;

		try {
			snooze.module('myApp')
				.constant('val', {foo: 'bar'})
				.constant('val', {foo: 'baz'});
		} catch(e) {
			thrown = true;
		}

		thrown.should.equal(true);
	});
});