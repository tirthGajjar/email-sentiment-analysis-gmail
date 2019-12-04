/**
 * Parse the time to string
 * @param {composeView} composeView
 * @returns void
 */
export function addIconToComposeView(composeBody) {
  const tableNode = composeBody.querySelector('table.iN');
  let nodeToInsert = document.createElement('div');
  tableNode && tableNode.parentNode.insertBefore(nodeToInsert, tableNode);
  return nodeToInsert;
}
