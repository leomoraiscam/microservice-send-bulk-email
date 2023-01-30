interface ICreateTagDTO {
  tags: Array<{
    title: string;
  }>;
  user_id: string;
}

export default ICreateTagDTO;
