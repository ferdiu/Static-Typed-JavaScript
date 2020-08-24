/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const StaticTyping = {};

/**
 * A simple function to get the name of constructor of object "object"
 * @param {Object} object The target object
 */
StaticTyping._get_class = function(object) {
  return object.constructor.name;
};

/**
 * A simple function to get the type of a variable
 * @param {Any} variable The target variable
 */
StaticTyping._get_type = function(variable) {
  if (variable === null) return "null";
  if (typeof(variable) === "object") return StaticTyping._get_class(variable);
  return typeof(variable);
};

/**
 * Check if the given variable is of type Map
 * @param {Object} variable The target variable
 */
StaticTyping._is_map = function(variable) {
  return StaticTyping._get_type(variable) === "Map";
};

/**
 * Interate an array checking if its elements match type "type_of_elements"
 * @param {Array} array The target array
 * @param {String} type_of_elements The type of array elements
 * @param {Boolean} nullable Optional argument to specify
 *                           if the array elements can be "null"
 */
StaticTyping._check_array_type = function(array, type_of_elements, nullable = true) {
  if (! Array.isArray(array)) return false;
  for (var el of array) {
    if (! StaticTyping.check_variable_type(el, type_of_elements, nullable)) {
      return false;
    }
  }
  return true;
};

/**
 * Interate a Map checking if its values match type "type_of_values"
 * @param {Map} map The target map
 * @param {String} type_of_values The type of map values
 * @param {Boolean} nullable Optional argument to specify
 *                           if the map elements can be "null"
 */
 StaticTyping._check_map_type = function(map, type_of_values, nullable = true) {
  if (! StaticTyping._is_map(map)) return false;
  for (var el of map.values()) {
    if (! StaticTyping.check_variable_type(el, type_of_values, nullable)) return false;
  }
  return true;
};

/**
 * Check if object "object" directly inherits from "parent_type"
 * @param {Object} object The target object
 * @param {String} parent_type The parent class type
 */
StaticTyping._check_object_extends_type = function(object, parent_type) {
  try {
    // open to any suggestion to improve this way of checking inheritance
    if (typeof(object) !== "object") return false;
    return eval(parent_type).isPrototypeOf(eval(StaticTyping._get_class(object)));
  } catch (ex) {
    return false;
  }
};

/**
 * Check if "variable" is of type "type" (this is the one function intended to be used in objects' constructor)
 * @param {Any} variable The target variable
 * @param {String} type The type of variable
 * @param {Boolean} nullable Optional argument to specify
 *                           if the variable can be "null"
 * @param {Boolean} check_inheritance Optional argument to specify
 *                                    if the function can return true if the
 *                                    target object inherits directly from type "type"
 */
StaticTyping.check_variable_type = function(variable, type, nullable = true, check_inheritance = false) {
  if (nullable && variable === null) return true;
  if (Array.isArray(variable)) return StaticTyping._check_array_type(variable, type, nullable);
  if (StaticTyping._is_map(variable)) return StaticTyping._check_map_type(variable, type, nullable);
  return StaticTyping._get_type(variable) === type || (check_inheritance && StaticTyping._check_object_extends_type(variable, type));
};
