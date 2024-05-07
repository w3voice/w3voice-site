import {array, number, object, parse, string, optional} from 'valibot'
import {readFileSync} from "fs";
import {join} from "path";
import {feedParse} from "@/lib/parse";

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content?: string
  audio: {
    src: string
    length: string
    type: string
  }
}

export async function getAllEpisodes(): Promise<Array<Episode>> {
  let FeedSchema = object({
    items: array(
      object({
        id: number(),
        title: string(),
        published: number(),
        description: string(),
        content: optional(string()),
        enclosures: array(
          object({
            url: string(),
            length: string(),
            type: string(),
          }),
        ),
      }),
    ),
  })

  const data = readFileSync(join('public', 'feed.xml'), 'utf8');
  const feed = await feedParse(data);
  const items = parse(FeedSchema, feed).items
  return items.map(
    ({id, title, description, content, enclosures, published}) => ({
      id,
      title: `${id}: ${title}`,
      published: new Date(published),
      description,
      content,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        length: enclosure.length,
        type: enclosure.type,
      }))[0],
    }),
  )
}
