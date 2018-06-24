import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    expect(1).toBe(1);
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Hello');
  });
});
