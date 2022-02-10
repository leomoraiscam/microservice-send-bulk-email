import TemplatesRepositoryInMemory from '@modules/messages/repositories/in-memory/TemplatesRepositoryInMemory';

import ListTemplatesService from './ListTemplatesService';

let listTemplatesService: ListTemplatesService;
let templatesRepositoryInMemory: TemplatesRepositoryInMemory;

describe('List Templates', () => {
  beforeEach(() => {
    templatesRepositoryInMemory = new TemplatesRepositoryInMemory();
    listTemplatesService = new ListTemplatesService(
      templatesRepositoryInMemory
    );
  });

  it('should be able to list templates', async () => {
    await templatesRepositoryInMemory.create({
      title: 'Hello Word',
      content: '<p>just testing the email</p>',
    });

    await templatesRepositoryInMemory.create({
      title: 'Hello Word',
      content: '<p>just testing the email</p>',
    });

    await templatesRepositoryInMemory.create({
      title: 'Hello Word',
      content: '<p>just testing the email</p>',
    });

    const contacts = await listTemplatesService.execute({
      take: 1,
      skip: 2,
      page: 1,
    });

    expect(contacts.length).toBe(2);
  });
});
