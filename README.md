# snooze-baselib 1.0.0-alpha.1

## Installation
In your applications root direction install via npm.

    npm install snooze-baselib --save

In you main.js file import the `snooze-baselib` module.

    snooze.module('myApp', ['snooze-baselib']);
    
## Entities

`snooze-baselib` provides 3 Entities. `service`, `value`, and `constant`.

#### Service

A service is generic and unopinionated as far as Entities go. It allows you to inject functionality into other Entities, run processes, or config processes. Once `snooze-baselib` has been imported, the `module.service` method becomes available.

    snooze.module('myApp', ['snooze-baselib'])
        .service('MyService', function() {});
        
A service is constructed with an injectable function. What is returned by the function becomes the `EntityInstance`. If we wanted to create a Math service that could do our basic mathematical operations we can create the service like so-

    snooze.module('myApp', ['snooze-baselib'])
        .service('MyService', function() {
            function sum(num1, num2) {
                return num1 + num2;
            };
            
            function difference(num1, num2) {
                return num1 - num2;
            };
            
            function product(num1, num2) {
                return num1 * num2;
            };
            
            function quotient(num1, num2) {
                return num1 / num2;
            };
            
            return {
                sum: sum,
                difference: difference,
                product: product,
                quotient: quotient
            };
        });
        
The returned object makes these methods available when injected.

    snooze.module('myApp')
        .service('Bank', function(Math) {
            var accountBalance = 1000;
            
            function deposit(amt) {
                accountBalance = Math.sum(accountBalance, amt);
            };
            
            function withdraw(amt) {
                accountBalance = Math.difference(accountBalance, amt);
            };
            
            function getBalance() {
                return accountBalance;
            };
            
            return {
                deposit: deposit,
                withdraw: withdraw,
                getBalance: getBalance
            };
        })
        .run(function(Bank) {
            Bank.deposit(500);
            console.log(Bank.getBalance());
            Bank.withraw(750);
            console.log(Bank.getBalance());
        });
        
Outputs

    1500
    750
    
You can also define what specifically gets injected when or configured by returned a `$get` or `$config` property.

    snooze.module('myApp')
        .service('Bank', function(Math) {
            var accountBalance = 0;
            
            function deposit(amt) {
                accountBalance = Math.sum(accountBalance, amt);
            };
            
            function withdraw(amt) {
                accountBalance = Math.difference(accountBalance, amt);
            };
            
            function getBalance() {
                return accountBalance;
            };
            
            function initBalance(balance) {
                accountBalance = balance;
            };
            
            return {
                $get: {
                    deposit: deposit,
                    withdraw: withdraw,
                    getBalance: getBalance
                },
                $config: {
                    initBalance: initBalance
                }
            };
        })
        .config(function(Bank) {
            Bank.initBalance(1000);
            console.log(Bank.deposit);
        })
        .run(function(Bank) {
            Bank.deposit(1000);
            console.log(Bank.initBalance);
            console.log(Bank.getBalance());
        });

Outputs

    undefined
    undefined
    2000
    
Finally you can set if the `service` is `injectable`, `configurable`, or `private` by setting the `$injectable`, `$configurable`, and `$private` properties respectively.

    snooze.module('myApp')
        .service('Bank', function(Math) {
            return {
                $injectable: false,
                $configurable: false,
                $private: true
            };
        });
        
The Bank `service` is now not injectable, configurable, and cannot be imported into other modules (and is useless at this point).

#### Value

A single value can be passed as an injectable.

    snooze.module('myApp')
        .value('port', 80)
        .service('HTTP', function(port) {
            // ... do something with port
        });

The value can be a string, function, object, array, integer, anything.

#### Constant

A constant is the same as a value except it's value is copied instead of returned. This means if an object or array is used the injected value cannot change the original.

    snooze.module('myApp')
        .constant('settings', {color: 'blue'})
        .run(function(settings) {
            settings.color = 'red';
            console.log(settings.color);
        })
        .run(function(settings) {
            console.log(settings.color);
        });
        
Outputs

    red
    blue
    
## Import Processes

**importEntities** - Imports Entities from all imported modules to the importee module. Imported Entities will overwrite existing Entities with the same name.
**importEntityGroups** - Imports EntityGroups from all imported modules to the importee module. If an importing EntityGroup has the same type as an existing EntityGroup it will be skipped.

## Config Preprocessors

**mergeModeConfigs** - If a mode is defined and that mode exists in the modes object, those properties will be merged on top of the existing config.

## snooze.json extensions

`snooze-baselib` Allows creating config modes. This lets you create a base config but merge properties on top of the base config depending on the `mode` you define.

    {
        "mode": "development",
        "modes": {
            "development": {
                "silent": false
            },
            "production": {
                "silent": true
            },
            "foobar": {
                "silent": true,
                "bar": "baz"
            }
        }
    }