import path from 'path'
import { readJson, writeJson, pathExists, ensureFile } from 'fs-extra'
import { Client } from '@notionhq/client'
import { NotionBlock, TextBlock } from './typings'

const CACHE_PATH = path.resolve(process.cwd(), 'notion/.cache')

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
})

export const queryNotionDatabase = async (pageSize = 9999) => {
  const databaseId = process.env.NOTION_DATABASE_ID as string
  const databaseCachePath = path.resolve(CACHE_PATH, 'd', `${databaseId}.json`)

  if (await pathExists(databaseCachePath)) {
    return await readJson(databaseCachePath)
  } else {
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
    const { results } = response
    await ensureFile(databaseCachePath)
    await writeJson(databaseCachePath, results)
    return results
  }
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
  const pageCachePath = path.resolve(CACHE_PATH, 'p', `${pageId}.json`)

  if (await pathExists(pageCachePath)) {
    return await readJson(pageCachePath)
  } else {
    const page = await notionClient.pages.retrieve({ page_id: pageId })
    const blocks = await retrieveNotionBlocks(pageId)
    const result = {
      ...page,
      blocks: formatNotionBlocks(blocks),
    }
    await ensureFile(pageCachePath)
    await writeJson(pageCachePath, result)
    return result
  }
}
