# STJS - Static Typed JavaScript

Use the functions included in this library to keep track of types of your variables.

This is not the recommended way of doing static typing in JavaScript but may be useful in small projects. For a more comprehensive way of using static typing in JS see [Flow](https://flow.org).

In terms of performance there is no game between this library and Flow: the second one is much more recommended for production because all the unwanted "checking" will be stripped off at "compiling" time.

## Usage

Include this script in your html page or in your Node.js script and call it in constructor of objects (of course it can be used outside constructor but it will weigh down your code).

Call the function `StaticTyping.check_variable_type(variable, type)` where `variable` is the variable to test and `type` is the desired type for the variable.

If `variable` is an `Array` (or a `Map`) this function will iterate and check all the elements (or values) to be of the specified type.

There are two more optional parameters that can be added, both boolean:
* nullable: make the function return `true` even if the values are `null` (default: `true`);
* check_inheritance: make the function return `true` even if the variable inherits from the specified class (default: `false`).

**NB** There are more functions included in the library but those are not intended to be used by the end user (the ones that start with underscore) but of course there is no harm in doing that.

### Example

```javascript
class Person {
    constructor(name, surname, year_of_birth, object_owned = []) {
        this.name = name;
        this.surname = surname;
        this.year_of_birth = year_of_birth;
        this.objects = object_owned;

        // check if variables this.name and this.surname are of type string
        if (! StaticTyping.check_variable_type(this.name, "string")) console.log("Variable \"name\" as mismatching type.");
        if (! StaticTyping.check_variable_type(this.surname, "string")) console.log("Variable \"surname\" as mismatching type.");
        // check if variable this.year_of_birth is of type number
        if (! StaticTyping.check_variable_type(this.year_of_birth, "number")) console.log("Variable \"year_of_birth\" as mismatching type.");
        // check if all elements of array this.objects are of type string
        if (! StaticTyping.check_variable_type(this.objects, "string")) console.log("Array \"objects\" as mismatching types.");
    }
}

let mike = new Person("Mike", "Bongiorno", 1924, [ "microphone", "camera" ]);

// if mike isn't a person the developer will be notified in console
if (! StaticTyping.check_variable_type(mike, "Person")) console.log("Variable \"mike\" is not of type \"Person\"");
```

### Types

The possible types are the ones in the table [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) (primitives) or user-defined classes:

Type | Result
-----|-------
[Undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)|"undefined"
[Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)|"boolean"
[Number](https://developer.mozilla.org/en-US/docs/Glossary/Number)|"number"
[BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt)|"bigint"
[String](https://developer.mozilla.org/en-US/docs/Glossary/String)|"string"
[Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)|"symbol"
[Function](https://developer.mozilla.org/en-US/docs/Glossary/Function)|"function"
Object|"object" **\***

**\*** just for "basic" objects, otherwise should be used the class name.
