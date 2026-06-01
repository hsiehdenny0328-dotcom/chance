# 標題左側加入 Logo 任務成果說明

本任務已完成！我們成功生成了一張符合「機率與統計」主題的高質感 3D 渲染 Logo，並將其放置於網頁的主標題左側。透過優雅的 Flexbox 排版、毛玻璃（Glassmorphism）特效、滑鼠懸停微動畫以及響應式設計（RWD），大幅度提升了整體網頁的視覺美感與互動體驗。

---

## 具體修改細節

### 1. 圖片資源生成
- **檔案名稱**：[probability_logo.png](file:///c:/Users/USER/Downloads/chance/probability_logo.png)
- **設計風格**：3D 立體微縮模型風格。包含炫彩骰子與高斯鐘形曲線等統計元素，色彩鮮明且細節精緻。

### 2. 網頁結構修改
- **檔案路徑**：[index.html](file:///c:/Users/USER/Downloads/chance/index.html)
- **修改內容**：
  - 在 `<h1>` 標籤中加入 `.hero-title` 類別，並在其左側插入 `<img>` 標籤，將原標題文字包裹於 `<span>` 中。
  - 增加教學註解，幫助學生理解此區塊的 HTML 架構與 CSS 排版目的。

### 3. 樣式設計與動畫效果
- **檔案路徑**：[style.css](file:///c:/Users/USER/Downloads/chance/style.css)
- **核心技術介紹**：
  - **Flexbox 對齊**：使用 `display: flex` 與 `align-items: center`，使 Logo 圖標與文字完美的水平置中對齊，並透過 `gap: 20px` 留出舒適間距。
  - **玻璃擬態 (Glassmorphism)**：使用 `background: rgba(255, 255, 255, 0.2)`、`border: 2px solid rgba(255, 255, 255, 0.45)` 與 `backdrop-filter: blur(8px)`，讓 Logo 帶有半透明毛玻璃邊框，柔和地與藍色漸層背景融合。
  - **立體陰影**：`box-shadow` 給予圖示輕微的漂浮感。
  - **彈性懸停微互動 (Micro-animations)**：當滑鼠懸停於 Logo 上時，會套用 `transform: scale(1.08) rotate(5deg)`。我們特別選用了 `cubic-bezier(0.34, 1.56, 0.64, 1)`（回彈貝氏曲線）來控制 `transition`，讓縮放與輕微旋轉具有活潑的彈性回饋。
  - **響應式適配 (RWD)**：在小於 600px 的行動裝置螢幕下，自動將排列模式轉為垂直（`flex-direction: column`），並縮小 Logo 尺寸至 `56px`，防止標題文字在窄螢幕上受到擠壓或不自然斷行。

---

## 驗證與結果

1. **視覺效果與對齊**：Logo 與文字排列和諧，半透明毛玻璃外框和陰影使其融入感極佳，設計極具高級感。
2. **動態微互動**：滑鼠移入時，Logo 產生平滑且有回彈效果的縮放與旋轉，增強了頁面的靈動性。
3. **響應式排版**：經不同視窗寬度測試，寬螢幕下水平排版良好，窄螢幕下自動切換為優雅的垂直排版。
