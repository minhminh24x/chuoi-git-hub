@echo off
echo =====================================================
echo   Cai dat Task Scheduler cho Auto Daily Commit
echo =====================================================
echo.

REM Tao scheduled task chay luc 9:00 PM moi ngay
schtasks /create /tn "GitHub-Daily-Commit-2026" /tr "powershell.exe -ExecutionPolicy Bypass -File \"d:\Code\01_Playground\chuoi-git-hub\daily-commit.ps1\"" /sc daily /st 21:00 /f

if %errorlevel% equ 0 (
    echo.
    echo ✅ Da tao task thanh cong!
    echo    - Ten task: GitHub-Daily-Commit-2026
    echo    - Thoi gian: 21:00 moi ngay
    echo.
    echo 💡 Luu y: Dam bao may tinh dang bat vao luc 9 gio toi!
) else (
    echo.
    echo ❌ Loi! Hay chay file nay voi quyen Administrator
)

echo.
pause
