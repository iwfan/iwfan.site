import { Client } from '@notionhq/client'

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export const queryNotionDatabase = async (pageSize = 9999) => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    sorts: [
      {
        property: 'created_date',
        direction: 'descending',
      },
    ],
    page_size: pageSize,
  })
  return response.results
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

  const blocksWithChildren: any = await Promise.all(
    blocks.map(async block => {
      // @ts-ignore
      if (block.has_children) {
        return {
          ...block,
          block_children: await retrieveNotionBlocks(block.id),
        }
      }
      return block
    })
  )

  return blocksWithChildren
}
