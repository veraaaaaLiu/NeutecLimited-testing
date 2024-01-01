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

### 切版說明
1. 因為樣式不多就不使用 tailwind，手切樣式為主

### todo
- [x] 100 顆球，使用 canvas
- [x] 確認球的隨機位置不超過 main
- [ ] 側邊欄的 select bug
- [ ] 加入註解
- [ ] 選擇 dropdownMenu，selector 也同步替換
- [ ] 側邊欄 isAsideOpened 狀態也寫入 storage
- [ ] 因為目前是 watch ballType 觸發，如果一樣的 ballType 值就無法觸發，因此希望之後能改成加入一個隨機變數，讓一樣的情況也能觸發
