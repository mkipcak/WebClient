angular.module("proton.filters",[])

.filter("capitalize", function() {
    return function(input) {
        if (input!==null) {
            input = input.toLowerCase();
        }
        return input.substring(0,1).toUpperCase()+input.substring(1);
    };
})

.filter('number', function () {
    return function (input, places) {
        if (isNaN(input)) {
            return input;
        }
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");

        return Math.round(input * factor) / factor;
    };
})

.filter('labels', function() {
    return function(labels) {
        return _.filter(labels, function(label) {
            if(angular.isObject(label)) {
                return label.ID.toString().length > 5;
            } else {
                return label.toString().length > 5;
            }
        });
    };
})

.filter('currency', function() {
    return function(amount, currency) {
        var result;

        switch(currency) {
            case 'EUR':
                result = amount + ' €';
                break;
            case 'CHF':
                result = amount + ' CHF';
                break;
            case 'USD':
                result = '$' + amount;
                break;
        }

        return result;
    };
})

.filter('readableTime', function() {
    return function(time) {
        var m = moment.unix(time);

        if (m.isSame(moment(), 'day')) {
            return m.format('h:mm a');
        }
        else {
            return m.format('ll');
        }
    };
})

.filter('utcReadableTime', function() {
    return function(time) {
        var m = moment.unix(time);

        return m.utc().format('LL h:mm a');
    };
})

.filter('localReadableTime', function() {
    return function(time) {
        var m = moment.unix(time);

        return m.format('LL h:mm a');
    };
})

.filter('longReadableTime', function() {
    return function(time) {
        var m = moment.unix(time);

        return m.format('LLL') + " (" + m.fromNow() + ")";
    };
})
// unused
.filter('purify', function($sce) {
    // var dirty = $sce.trustAsHtml(value);
    // var config = {
    //     ALLOWED_TAGS: ['a', 'img', 'p', 'div', 'table', 'tr', 'td', 'tbody', 'thead'],
    //     ALLOWED_ATTR: ['style', 'href'],
    //     // KEEP_CONTENT: false, // remove content from non-white-listed nodes too
    //     // RETURN_DOM: false // return a document object instead of a string
    // };
    // return function(value) {
    //     return dirty;
    //     // return DOMPurify.sanitize(dirty);
    // };
    // var c = {
    //     ALLOWED_TAGS: ['b', 'q'],
    //     ALLOWED_ATTR: ['style']
    // };
    // getTrustedHtml
    // trustAsHtml
    return function(value) {
        return $sce.trustAsHtml(value);
    };
})

.filter("humanDuration", function () {
    return function (input, units) {
        var duration = moment.duration(Math.round(input), units);
        var days = duration.days();
        var cmps = [];
        if (days === 1) {
            cmps.push("a day");
        } else if (days > 1) {
            cmps.push(days + " days");
        }

        duration.subtract(days, 'days');
        var hours = duration.hours();
        if (hours === 1) {
            cmps.push("an hour");
        } else if (hours > 1) {
            cmps.push(hours + " hours");
        }
        return cmps.join(" and ");
    };
})

.filter('contact', function() {
    return function(contact) {
        var same = contact.Address === contact.Name;
        var alone = angular.isUndefined(contact.Name) || contact.Name.length === 0;

        if(same || alone) {
            return contact.Address;
        } else {
            return contact.Name + ' <' + contact.Address + '>';
        }
    };
})

.filter("humanSize", function () {
    return function (input, withoutUnit) {
        var bytes;
        var unit = "";
        var kb = 1024;
        var mb = kb*kb;
        var gb = mb*kb;

        if (_.isNumber(input)) {
            bytes = input;
        }
        else if (_.isNaN(bytes = parseInt(input))) {
            bytes = 0;
        }

        if (bytes < mb) {
            if (!!!withoutUnit) {
                unit = " KB";
            }
            return (bytes/1024).toFixed(1) + unit;
        }
        else if (bytes < gb) {
            if (!!!withoutUnit) {
                unit = " MB";
            }
            return (bytes/1024/1024).toFixed(2) + unit;
        }
        else {
            if (!!!withoutUnit) {
                unit = " GB";
            }
            return (bytes/1024/1024/1024).toFixed(2) + unit;
        }

    };
})

.filter('bytes', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
            return '-';
        } else {
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
    			number = Math.floor(Math.log(bytes) / Math.log(1024));

    		if (typeof precision === 'undefined') {
                precision = 1;
            }

    		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
	};
})

.filter("contrast", function () {
    return function (input, character) {
        if (!input) {
            return input;
        }

        var split = input.split(character);

        if (split.length === 1) {
            return "*" + input + "*";

        } else {
            if (character === '<') {
                character = '&lt;';
                split[1].replace('>', '&gt;');
            }

            return "*" + _.string.trim(split[0]) + "* " + character + split[1];
        }
    };
})

.filter('range', function() {
    return function(val, range) {
        range = parseInt(range);

        for (var i=1; i<range; i++) {
            val.push(i);
        }

        return val;
    };
});
