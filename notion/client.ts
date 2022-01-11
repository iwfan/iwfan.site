import { Client } from '@notionhq/client'
import { NotionBlock, TextBlock } from './typings'

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

export const retrieveNotionBlocks = async (blockId: string): Promise<NotionBlock[]> => {
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

const formatNotionBlocks = (blocks: NotionBlock[]): NotionBlock[] => {
  const newBlocks: NotionBlock[] = []

  blocks.forEach((block, idx) => {
    const prevBlock = blocks[idx - 1]
    if (prevBlock) {
      if (
        (block.type === prevBlock.type && block.type === 'bulleted_list_item') ||
        (block.type === prevBlock.type && block.type === 'numbered_list_item') ||
        (block.type === prevBlock.type && block.type === 'to_do')
      ) {
        const last = newBlocks[newBlocks.length - 1]

        if (Array.isArray(last[block.type])) {
          // @ts-ignore
          ;(last[block.type] as { text: TextBlock[] }[]).push(
            block[block.type] as { text: TextBlock[] }
          )
        } else {
          // @ts-ignore
          last[block.type] = [
            last[block.type] as { text: TextBlock[] },
            block[block.type] as { text: TextBlock[] },
          ]
        }
      } else {
        newBlocks.push(block)
      }
    } else {
      newBlocks.push(block)
    }
  })

  return newBlocks
}

export const retrieveNotionPage = async (pageId: string) => {
  const page = await notionClient.pages.retrieve({ page_id: pageId })
  const blocks = await retrieveNotionBlocks(pageId)

  return {
    ...page,
    blocks: formatNotionBlocks(blocks),
    // blocks,
  }
}
