/**
 * Parse the time to string
 * @param {composeView} composeView
 * @returns void
 */
export function addIconToComposeView(composeView) {
  const composeBody = composeView.getElement();
  const tableNode = composeBody && composeBody.querySelector('table.iN');
  let nodeToInsert = document.createElement('div');
  tableNode && tableNode.parentNode.insertBefore(nodeToInsert, tableNode);
  return nodeToInsert;
}
