/**
 * Parse the time to string
 * @param {composeView} composeView
 * @returns void
 */
export function createElementWithClassName(elememtType, className) {
  let element = document.createElement(elememtType);
  element.classList.add(className);
  return element;
}
