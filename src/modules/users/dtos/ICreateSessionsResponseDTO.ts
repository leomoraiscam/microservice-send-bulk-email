import User from '../infra/typeorm/entities/User';

interface ICreateSessionsResponseDTO {
  user: User;
  token: string;
}

export default ICreateSessionsResponseDTO;
