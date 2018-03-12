import { TdwhoswhoPage } from './app.po';

describe('tdwhoswho App', function() {
  let page: TdwhoswhoPage;

  beforeEach(() => {
    page = new TdwhoswhoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
