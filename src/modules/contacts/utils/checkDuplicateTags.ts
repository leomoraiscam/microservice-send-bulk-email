import ICreateTagsDTO from '../dtos/ICreateTagsDTO';

function checkDuplicateTags({ tags }: Partial<ICreateTagsDTO>) {
  return tags.some((tag, _, self) => {
    const filterList = self.filter((selfTag) => selfTag.title === tag.title);

    return filterList.length !== 1;
  });
}

export default checkDuplicateTags;
