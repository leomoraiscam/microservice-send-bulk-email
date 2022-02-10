import TemplatesRepositoryInMemory from '@modules/messages/repositories/in-memory/TemplatesRepositoryInMemory';

import CreateTemplateService from './CreateTemplateService';

let templatesRepositoryInMemory: TemplatesRepositoryInMemory;
let createTemplateService: CreateTemplateService;

describe('Create Template', () => {
  beforeEach(async () => {
    templatesRepositoryInMemory = new TemplatesRepositoryInMemory();
    createTemplateService = new CreateTemplateService(
      templatesRepositoryInMemory
    );
  });

  it('should be able to create new template', async () => {
    const template = await createTemplateService.execute({
      title: 'Hello Word',
      content: '<p>just testing the email</p>',
    });

    expect(template).toHaveProperty('id');
  });
});
