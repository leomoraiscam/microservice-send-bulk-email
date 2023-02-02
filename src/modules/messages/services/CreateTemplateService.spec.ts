import InMemoryTemplatesRepository from '@modules/messages/repositories/in-memory/InMemoryTemplatesRepository';

import CreateTemplateService from './CreateTemplateService';

describe('CreateTemplateService', () => {
  let inMemoryTemplatesRepository: InMemoryTemplatesRepository;
  let createTemplateService: CreateTemplateService;

  beforeEach(async () => {
    inMemoryTemplatesRepository = new InMemoryTemplatesRepository();
    createTemplateService = new CreateTemplateService(
      inMemoryTemplatesRepository
    );
  });

  it('should be able to create new template when receive correct data', async () => {
    const template = await createTemplateService.execute({
      title: 'Hello Word to welcome',
      content: '<p>just testing the template email</p>',
      default: true,
    });

    expect(template).toHaveProperty('id');
  });
});
