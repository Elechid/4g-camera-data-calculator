# Elechid 4G Camera SIM Data Calculator｜4G 攝影機 SIM 用量估算器

[English calculator](https://elechid.github.io/4g-camera-data-calculator/) · [繁體中文計算器](https://elechid.github.io/4g-camera-data-calculator/?lang=zh)

Estimate remote viewing and separate clip uploads over a SIM billing period. Enter minutes per camera per day and average Mbps for each type of traffic. Calculate each group separately if its usage differs. Only combine cameras on the same data plan.

Each stream uses **minutes/day × Mbps × 60 × cameras × days ÷ 8,000** in decimal GB. For one camera over 30 days, daily viewing of 10 min at 2 Mbps plus separate uploads of 5 min at 1 Mbps uses **5.625 GB**. With 20% extra the estimate is **6.75 GB**. Remote playback also uses data. Check actual SIM usage after the first week.

分開估算遙距睇片及另行上傳的影片用量。每項用量（GB）＝每日分鐘 × 平均 Mbps × 60 × 鏡頭數 × 日數 ÷ 8,000。同一數據計劃內的鏡頭可合計，用量不同就分組計算。

以一部鏡頭、30 日計，每日遙距睇片 10 分鐘（2 Mbps）及另行上傳 5 分鐘（1 Mbps），約需 **5.625 GB**，加 20% 預留為 **6.75 GB**。遙距回放也會用數據，建議首週查 SIM 實際用量。

Inputs stay in the browser. Serve locally with `python3 -m http.server` and test with `node calculator.test.mjs`. [MIT licence](LICENSE).

[Elechid 香港 4G 攝影機及 SIM 指南](https://elechid.com/blogs/news/4g-camera-data-usage-sim-hong-kong) · [English guide](https://elechid.com/en/blogs/news/4g-camera-data-usage-sim-hong-kong)
