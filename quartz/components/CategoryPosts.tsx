import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { Date, getDate } from "./Date"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface CategoryPostsOptions {
  categories: {
    name: string
    tags: string[]
    limit?: number
    description?: string
  }[]
}

export default ((userOpts?: CategoryPostsOptions) => {
  const CategoryPosts: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (!userOpts?.categories) {
      return null
    }

    const categories = userOpts.categories

    return (
      <div class={classNames(displayClass, "category-posts")}>
        {categories.map((category) => {
          // Filter posts that have any of the category's tags
          const postsInCategory = allFiles.filter((file) => {
            const fileTags = file.frontmatter?.tags ?? []
            const hasMatchingTag = category.tags.some((tag) => fileTags.includes(tag))
            const isNotIndex = file.slug !== "index"
            return hasMatchingTag && isNotIndex
          })
          .sort((a, b) => {
            const dateA = getDate(cfg, a)
            const dateB = getDate(cfg, b)
            if (!dateA && !dateB) return 0
            if (!dateA) return 1
            if (!dateB) return -1
            return dateB.getTime() - dateA.getTime()
          })
          .slice(0, category.limit || 5)

          if (postsInCategory.length === 0) {
            return null
          }

          return (
            <div class="category-section">
              <h2>{category.name}</h2>
              {category.description && <p class="category-description">{category.description}</p>}
              <ul class="category-posts-list">
                {postsInCategory.map((post) => {
                  const title = post.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
                  const postDate = getDate(cfg, post)

                  return (
                    <li class="category-post-item">
                      <div class="post-content">
                        <a href={resolveRelative(fileData.slug!, post.slug!)} class="internal post-link">
                          {title}
                        </a>
                        {postDate && (
                          <span class="post-meta">
                            <Date date={postDate} locale={cfg.locale} />
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }

  CategoryPosts.css = `
    .category-posts {
      margin: 2rem 0;
    }

    .category-section {
      margin-bottom: 2rem;
    }

    .category-section h2 {
      color: var(--dark);
      font-size: 1.75rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .category-description {
      color: var(--gray);
      margin-bottom: 1rem;
      font-style: italic;
    }

    .category-posts-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-post-item {
      margin-bottom: 0.5rem;
      border: none;
      padding: 0;
      box-shadow: none;
    }

    .post-content {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
    }

    .post-link {
      text-decoration: none;
      color: var(--dark);
      font-size: 1.25rem;
      font-weight: 500;
      flex-grow: 1;
      background: transparent !important;
    }

    .post-link:hover {
      color: var(--secondary);
    }

    .post-meta {
      color: var(--gray);
      font-size: 0.9rem;
      white-space: nowrap;
    }

    @media (max-width: 600px) {
      .post-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .post-meta {
        font-size: 0.85rem;
      }
    }
  `

  return CategoryPosts
}) satisfies QuartzComponentConstructor 