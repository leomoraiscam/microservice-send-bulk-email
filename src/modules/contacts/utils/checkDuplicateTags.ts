interface ICreateTags {
  title: string;
}

function checkDuplicateTags(tags: ICreateTags[]) {
  return tags.some((tag, _, self) => {
    const filterList = self.filter((t) => t.title === tag.title);

    return filterList.length !== 1;
  });
}

export default checkDuplicateTags;
