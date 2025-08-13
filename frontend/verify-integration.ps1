# Verification Script - Run this to check if files are properly updated

Write-Host "?? Verifying Dashboard and Navigation integration..." -ForegroundColor Cyan
Write-Host ""

# Check if Dashboard.js exists and has the required functions
if (Test-Path "src\components\Dashboard.js") {
    $dashboardContent = Get-Content "src\components\Dashboard.js" -Raw
    
    if ($dashboardContent -match "showJournal" -and $dashboardContent -match "useLocation" -and $dashboardContent -match "Journal.*isEmbedded") {
        Write-Host "? Dashboard.js is properly configured" -ForegroundColor Green
    } else {
        Write-Host "? Dashboard.js may need updates" -ForegroundColor Red
    }
} else {
    Write-Host "? Dashboard.js not found" -ForegroundColor Red
}

# Check if Navigation.js exists and has the required functions  
if (Test-Path "src\components\Navigation.js") {
    $navigationContent = Get-Content "src\components\Navigation.js" -Raw
    
    if ($navigationContent -match "handleJournalClick" -and $navigationContent -match "showJournal" -and $navigationContent -match "dispatchEvent") {
        Write-Host "? Navigation.js is properly configured" -ForegroundColor Green
    } else {
        Write-Host "? Navigation.js may need updates" -ForegroundColor Red
    }
} else {
    Write-Host "? Navigation.js not found" -ForegroundColor Red
}

# Check if Journal.js exists
if (Test-Path "src\components\Journal.js") {
    $journalContent = Get-Content "src\components\Journal.js" -Raw
    
    if ($journalContent -match "isEmbedded" -and $journalContent -match "onNavigateBack") {
        Write-Host "? Journal.js is properly configured" -ForegroundColor Green
    } else {
        Write-Host "? Journal.js may need updates" -ForegroundColor Red
    }
} else {
    Write-Host "? Journal.js not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "?? Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Run: npm start" -ForegroundColor White
Write-Host "   2. Go to: http://localhost:3000/dashboard" -ForegroundColor White
Write-Host "   3. Click: Journal button in top navigation" -ForegroundColor White
Write-Host "   4. Verify: Journal content appears within Dashboard page" -ForegroundColor White
Write-Host ""
Write-Host "?? If you encounter any issues:" -ForegroundColor Magenta
Write-Host "   • Check browser console for errors" -ForegroundColor White
Write-Host "   • Ensure all files are saved" -ForegroundColor White
Write-Host "   • Restart development server" -ForegroundColor White
Write-Host "   • Clear browser cache" -ForegroundColor White
