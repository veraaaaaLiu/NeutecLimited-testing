# 日新軟體測驗 

12/26 ~

## run
```
node 18^
npm install
npm run dev
```

### 執行環境需求
- [x] vue 版本 3.3.4 以上
- [x] vite 版本 4.4.5 以上
- [x] 保留完整 git commit 紀錄

### 切版前判斷
1. 因為樣式不多就不使用 tailwind，手切樣式為主

### 繼續的 todo
- [ ] 請在效能考量下，設計可同時存在一百顆球、且指定飛行起終點的結構
這一題因為球的數量龐大，所以如果要設計，我會
- [ ] 選擇 dropdownMenu，selector 也同步替換
- [ ] 側邊欄 isAsideOpened 狀態也寫入 storage
- [ ] 因為目前是 watch ballType 觸發，如果一樣的 ballType 值就無法觸發，因此希望之後能改成加入一個隨機變數
