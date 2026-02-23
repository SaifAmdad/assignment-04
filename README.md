### Q1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

#### Ans :

**getElementById** select by ID. it can select only one element.
**getElementsByClassName** select by class. it can select multiple with same class.
**querySelector** select by any valid selector (like: class, id, tagName). it selects only first one.
**querySelectorAll** selects by any valid selector. it selects multiple elements with same selector. (like: id, class, tag, etc..)

### Q2. How do you create and insert a new element into the DOM?

### Ans :

**document.createElement()** for creating a new element. and select a parent element and then using **parentElement.appendChild()** insert the new element.

### Q3. What is Event Bubbling? And how does it work?

#### Ans:

if i **click** on a button, its all parent elements are clicked till the document level.

### Q4. What is Event Delegation in JavaScript? Why is it useful?

#### Ans :

It's a nice way to handle events without selecting each and every elements. Just select the parent element and we can get its every child for triggering events.

### Q5. What is the difference between preventDefault() and stopPropagation() methods?

#### Ans :

**preventDefault()** is used for preventing browser's default behavior (like: reloading while submitting form, etc).
**stopPropagation()** is used for stop propagating (down to up / up to down) from other elements in DOM.
