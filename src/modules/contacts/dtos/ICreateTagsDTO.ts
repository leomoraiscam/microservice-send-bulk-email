interface ICreateTagsDTO {
  tags: Array<{
    title: string;
  }>;
  contact_id: string;
}

export default ICreateTagsDTO;
