/**
 * Applies a percentage change (increase/growth or decrease/discount) to a given value.
 *
 * @param {number} originalNumber The value to change.
 * @param {number} percentChange The percentage change to apply, such as .5 or 50% or -50%.
 * @return The new value.
 * @customfunction
 */
function PCNEW(originalNumber, percentChange) {
  let newNumber = originalNumber * (1 + percentChange);
  return newNumber;
}

/**
 * Returns the orginal value before a percentage change was applied.
 *
 * @param {number} newNumber The new value after the percentage change was applied.
 * @param {number} percentChange The percentage change that was applied, such as .5 or 50% or -50%.
 * @return The original value.
 * @customfunction
 */
function PCORIGINAL(newNumber, percentChange) {
  let originalNumber = newNumber /  (1 + percentChange);
  return originalNumber;
}

/**
 * Returns the percentage change (increase/growth or decrease/discount) based on orginal and new values.
 *
 * @param {number} originalNumber The original value.
 * @param {number} newNumber The new value.
 * @return The percentage change.
 * @customfunction
 */
function PC(originalNumber, newNumber) {
  let percentChange = (newNumber - originalNumber) / originalNumber;
  return percentChange;
}