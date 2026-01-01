# =====================================================
# 🌟 Daily Commit Script - Duy trì chuỗi GitHub 2026
# =====================================================
# Script này tự động tạo commit mỗi ngày để duy trì streak

$projectPath = "d:\Code\01_Playground\chuoi-git-hub"
$logFile = "$projectPath\logs\commit-log.md"

# Đảm bảo thư mục logs tồn tại
if (-not (Test-Path "$projectPath\logs")) {
    New-Item -ItemType Directory -Path "$projectPath\logs" -Force
}

# Chuyển đến thư mục project
Set-Location $projectPath

# Lấy ngày hiện tại
$today = Get-Date -Format "dd/MM/yyyy"
$dayOfYear = (Get-Date).DayOfYear
$time = Get-Date -Format "HH:mm:ss"
$emoji = @("🌟", "💪", "🚀", "✨", "🎯", "🌱", "💡", "⚡", "🔥", "🎉")
$randomEmoji = $emoji | Get-Random

# Tạo nội dung log
$logEntry = @"

## $randomEmoji Ngày $dayOfYear/365 - $today

- ⏰ Thời gian: $time
- ✅ Auto commit thành công!

---
"@

# Thêm vào file log
Add-Content -Path $logFile -Value $logEntry -Encoding UTF8

# Git commands
git add .
git commit -m "$randomEmoji Day $dayOfYear/365 - $today - Keep the streak alive!"
git push origin main

Write-Host "✅ Đã commit và push thành công cho ngày $today!" -ForegroundColor Green
