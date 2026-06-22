# Logo 變更與排版確認

本文件記錄了將機率與統計互動教學網頁的主標題 Logo 更換為「高雄市立楠梓高級中學校徽」的調整內容。

## 變更項目

1. **Logo 圖片替換**：
   - 刪除原本專案中的舊標誌 `probability_logo.png`。
   - 將新上傳的楠梓高中校徽圖片存為 `nzsh_logo.png` 並置於專案根目錄。

2. **HTML 修改**：
   - 修改 [index.html](file:///c:/Users/USER/Downloads/chance/index.html) 第 18 行的 `<img>` 標籤，將 `src` 指向新圖片 `nzsh_logo.png`，並更新其 `alt` 屬性為「楠梓高中 Logo」。

3. **環境配置**：
   - 建立 [.gitignore](file:///c:/Users/USER/Downloads/chance/.gitignore) 排除 `.agent/` 目錄，避免代理程式產生的工作文件被提交。

## 驗證

- 檢查標題的 CSS 排版結構：
  - 標題與 Logo 維持使用 Flexbox 排版（在 [style.css](file:///c:/Users/USER/Downloads/chance/style.css) 中設定），Logo 依然位於標題「機率與統計互動教學」的左邊，並帶有圓角與精緻的懸停動態效果。
