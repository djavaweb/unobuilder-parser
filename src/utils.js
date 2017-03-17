
/**
 * Data ID from attribute prefix
 * @type {[type]}
 */
export const SelectorAttrId = `data-uno-id`

/**
 * Generate random UID
 * @return {String}
 */
export const RandomUID = () => {
  const getUID = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  const UIDs = []

  for (let i = 0; i < 4; i++) {
    UIDs.push(getUID(i))
  }

  return UIDs.join('-')
}
