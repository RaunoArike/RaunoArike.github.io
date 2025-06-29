import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (tags && tags.length > 0) {
    return (
      <div class={classNames(displayClass, "tags-container")}>
        <span class="tags-label">Tags: </span>
        <ul class={classNames(displayClass, "tags")}>
          {tags.map((tag) => {
            const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
            return (
              <li>
                <a href={linkDest} class="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--gray);
}

.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 0;
  flex-wrap: wrap;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: var(--gray);
  background-color: transparent;
}

a.internal.tag-link:hover {
  color: var(--secondary);
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
