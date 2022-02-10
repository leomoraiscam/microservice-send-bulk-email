interface ICreateTags {
  title: string;
}

interface ICreateTagDTO {
  tags: ICreateTags[];
  user_id: string;
}

export default ICreateTagDTO;
