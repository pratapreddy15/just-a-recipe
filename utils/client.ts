export const sort = <T, K extends keyof T>(items: T[], propertyName: K): T[] => {
  const clonedItems = items.map((item) => ({ ...item }))
  clonedItems.sort((item1, item2) => {
    if (item1[propertyName] < item2[propertyName]) {
      return -1
    }

    if (item1[propertyName] > item2[propertyName]) {
      return 1
    }
    return 0
  })
  return clonedItems
}
