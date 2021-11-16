import { ICreateTagsDTO } from '../services/CreateTagsService';

function checkDuplicateTags(tags: ICreateTagsDTO[]) {
  return tags.some((tag, _, self) => {
    const filterList = self.filter((t) => t.title === tag.title);

    return filterList.length !== 1;
  });
}

export default checkDuplicateTags;
