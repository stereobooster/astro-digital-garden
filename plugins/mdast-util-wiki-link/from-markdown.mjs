// interface FromMarkdownOptions {
//  linkResolver
//  linkTemplate
// }

export function fromMarkdown(opts = {}) {
  const linkTemplate = opts.linkTemplate || defaultLinkTemplate;
  let node;

  function defaultLinkTemplate({ permalink, alias }) {
    return {
      hName: "a",
      hProperties: {
        //   className: '',
        href: permalink,
      },
      hChildren: [
        {
          type: "text",
          value: alias,
        },
      ],
    };
  }

  function enterWikiLink(token) {
    node = {
      type: "wikiLink",
      value: null,
      data: {
        alias: null,
        permalink: null,
      },
    };
    this.enter(node, token);
  }

  function top(stack) {
    return stack[stack.length - 1];
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.stack);
    current.data.alias = alias;
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.stack);
    current.value = target;
  }

  function exitWikiLink(token) {
    this.exit(token);
    const wikiLink = node;

    const data = {
      permalink: opts.linkResolver
        ? opts.linkResolver(wikiLink.value)
        : wikiLink.value,
      alias: wikiLink.data.alias || wikiLink.value,
    };

    wikiLink.data = {
      ...wikiLink.data,
      ...data,
      ...linkTemplate(data),
    };
  }

  return {
    enter: {
      wikiLink: enterWikiLink,
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink,
    },
  };
}
