# 機率與統計教學網頁 - 標題左側加入 Logo 實作計畫

本計畫預計在網頁的主標題（`<h1>`）左側加入一個專屬的「機率與統計」主題 Logo。我們將使用圖像生成技術產生高品質的圖示，並修改 HTML 與 CSS，以現代且美觀的 Glassmorphism 質感與動態微互動來呈現，提升整體的學習體驗。

## 使用者審查請求

> [!IMPORTANT]
> 1. **Logo 圖片生成**：我們將生成一張具備 3D 質感、結合骰子與高斯鐘形曲線概念的 Logo 圖片（`probability_logo.png`），並置於專案根目錄。
> 2. **RWD 版面配置**：在窄螢幕（行動裝置）下，我們設計了自動調整尺寸與排列的機制，以確保文字不會被擠壓或斷行。
> 3. **微動畫互動**：當使用者將滑鼠懸停在 Logo 上時，會觸發精緻的放大與旋轉效果，增強互動樂趣。

## 預計變更內容

### 1. 圖片資源

#### [NEW] [probability_logo.png](file:///c:/Users/USER/Downloads/chance/probability_logo.png)
- 使用 `generate_image` 生成融合「機率與統計」元素的精美 3D 微縮模型風格 Logo，大小為 512x512 像素，並儲存於專案根目錄。

---

### 2. 網頁結構與樣式變更

#### [MODIFY] [index.html](file:///c:/Users/USER/Downloads/chance/index.html)
- 修改 `<h1>` 結構，加入 `<img>` 標籤，並將文字包裹在 `<span>` 中以便進行 Flexbox 對齊控制。
- 程式碼結構調整範例：
  ```html
  <h1 class="hero-title">
    <img src="probability_logo.png" alt="機率與統計 Logo" class="hero-logo" />
    <span>機率與統計互動教學</span>
  </h1>
  ```

#### [MODIFY] [style.css](file:///c:/Users/USER/Downloads/chance/style.css)
- 新增 `.hero-title` 的 Flexbox 樣式，使圖片與標題文字水平置中對齊，並設定適當間距。
- 新增 `.hero-logo` 樣式：
  - 設定精確的寬高（如 `64px`）。
  - 套用圓角（`border-radius`）。
  - 加入半透明的白色邊框與背景，配合 `backdrop-filter: blur(8px)` 形成高質感的玻璃擬態。
  - 加入柔和的陰影 `box-shadow`。
  - 設計滑鼠懸停（`:hover`）時的平滑放大（`scale`）與輕微旋轉（`rotate`）微動畫。
- 新增 RWD 媒體查詢（`@media`），確保在行動裝置或窄螢幕下 Logo 尺寸會適度縮小（如 `50px`），確保標題文字排版流暢。

---

## 驗證計畫

### 1. 視覺與排版檢查
- 確認 Logo 與標題文字在水平方向完美對齊，且行高與間距舒適。
- 檢查 Logo 是否有正確套用圓角、陰影、以及精美的玻璃邊框。

### 2. 動態效果驗證
- 測試將滑鼠移至 Logo 上時，是否有平滑的放大與微旋轉動畫（`transition` 效果）。

### 3. RWD 回應式測試
- 縮小瀏覽器視窗，驗證標題在行動裝置尺寸（如 375px、414px）下的顯示效果，確認 Logo 與文字不會有溢出或重疊的現象。
