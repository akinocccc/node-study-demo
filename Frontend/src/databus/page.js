class Page{
  constructor() {
    this.curPage = 1;
    this.PAGESIZE = 5;
  }
  setCurPage(curPage) {
    this.curPage = curPage;
  }
}

export default new Page();