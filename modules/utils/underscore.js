const _ = module.exports = require('underscore');

_.mixin({
    /**
     * Get a deeply nested object property.
     *
     * @param {Object} obj The object.
     * @param {String} path The path within the object to fetch.
     * @param {*} fallbackValue The value to return if given path not found.
     *
     * @return {*} Returns value if found; otherwise the fallbackVAlue.
     */
    get: function(obj, path, fallbackValue) {
        if (this.isUndefined(obj) || null === obj || typeof path !== 'string') {
            return fallbackValue;
        }

        var fields = path.split('.'),
            result = obj;

        for (var i=0; i<fields.length; ++i) {
            if (!this.isObject(result) && !this.isArray(result)) {
                return fallbackValue;
            }

            result = result[fields[i]];
        }

        return result || fallbackValue;
    }  
});

module.exports = _;

