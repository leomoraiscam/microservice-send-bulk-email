interface ICreateTagDTO {
  tags: Array<{
    title: string;
  }>;
  contact_id: string;
}

export default ICreateTagDTO;
