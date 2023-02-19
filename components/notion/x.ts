import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

export const retrieveNotionPage = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId)
  return { recordMap }
}
