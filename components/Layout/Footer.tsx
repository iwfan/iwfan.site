import { github_name, twitter_name } from '../../site.config'
import { Container } from './Container'
import { CreativeCommons, CreativeCommonsBy, Feed, Github, Twitter } from '../icons'

const LayoutFooter = () => (
  <Container
    tag="footer"
    className="flex justify-center sm:justify-between items-center flex-wrap gap-4 py-10 mt-20 text-grey border-t-2 border-t-border"
  >
    <div>
      <p className="flex items-center">
        Built with
        <a
          className="mx-2 text-link u-underline"
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          Next.js
        </a>
        <span>&</span>
        <a
          className="mx-2 text-link u-underline"
          href="https://www.notion.so/"
          target="_blank"
          rel="noreferrer"
        >
          Notion.
        </a>
        Hosted on
        <a
          className="mx-2 text-link u-underline"
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
        >
          Vercel.
        </a>
      </p>
      <p className="flex items-center text-sm">
        Thanks
        <a className="mx-2 text-link u-underline" href="https://twitter.com/RyanWarnerCodes">
          Ryan Warner
        </a>
        designed
        <a
          className="mx-2 text-link u-underline"
          href="https://www.figma.com/community/file/824810955262478067"
        >
          Blog theme.
        </a>
      </p>
    </div>
    <p className="flex items-center justify-end">
      <a
        className="mr-4 flex items-center hover:text-green text-xl"
        target="_blank"
        title="Creative Commons"
        href="https://creativecommons.org/"
        rel="noreferrer"
      >
        <CreativeCommons />
      </a>
      <a
        className="mr-4 flex items-center hover:text-green text-xl"
        target="_blank"
        title="Attribution 4.0 International"
        href="https://creativecommons.org/licenses/by/4.0/"
        rel="noreferrer"
      >
        <CreativeCommonsBy />
      </a>
      <a
        className="mr-4 flex items-center hover:text-green text-xl"
        href={`https://twitter.com/${twitter_name}`}
        title="Twitter"
        target="_blank"
        rel="noreferrer"
      >
        <Twitter />
      </a>
      <a
        className="mr-4 flex items-center hover:text-green text-xl"
        href={`https://github.com/${github_name}`}
        title="Github"
        target="_blank"
        rel="noreferrer"
      >
        <Github />
      </a>
      <a
        className="mr-4 flex items-center hover:text-green text-xl"
        href={`https://github.com/${github_name}`}
        title="RSS"
        target="_blank"
        rel="noreferrer"
      >
        <Feed />
      </a>
    </p>
  </Container>
)

export default LayoutFooter
