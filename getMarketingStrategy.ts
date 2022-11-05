import { Config } from '../../models/Config'
import { task } from '../../src/task'

export async function getMarketingStrategy(project: Config) {
  /**
   * Make derivative content:
   * - Translate existing content into other languages
   * Send a message to other projects' groups: "Hello team, how is ${project.name} compare to Coliquidity? ${justificationForQuestion}"
   *   * justificationForQuestionDefault = "Is it a better investment?"
   * Use PG's article spamming strategy: https://twitter.com/paulg/status/1467068141993971714
   * Airdrop NFTs with URLs (marketing tactic)
   * Spam invites (docs / calendar / other apps)
   * Register on new social networks, post duplicate content
   * Content -> PromoPost where data PromoPost = { body :: Gratitude | Excerpt, url :: URL, mention :: Mention }
   * WebsiteY: What does the influencer X think about the project Y
   */
  throw task()
}
