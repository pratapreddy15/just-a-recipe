import * as fs from 'fs/promises'

export const getFileContent = async <T>(filePath: string): Promise<T> => {
  const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' })
  const parsed: T = JSON.parse(fileContent)
  return parsed
}
