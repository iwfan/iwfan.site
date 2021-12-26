import { Client } from '@notionhq/client'

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export const queryNotionDatabase = async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    sorts: [
      {
        property: 'created_time',
        direction: 'descending',
      },
    ],
    page_size: 9999,
  })
  return response
}

export const retrieveNotionPage = async (pageId: string) => {
  const page = await notionClient.pages.retrieve({ page_id: pageId })
  const blocks = await retrieveNotionBlocks(pageId)

  return {
    ...page,
    blocks,
  }
}

export const retrieveNotionBlocks = async (blockId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: blockId,
    page_size: 9999,
  })
  const blocks = response.results

  const blocksWithChildren: any = blocks.map(block => {
    // @ts-ignore
    if (block.has_children) {
      return {
        ...block,
        __block_children: retrieveNotionBlocks(block.id),
      }
    }
    return block
  })

  return blocksWithChildren
}
