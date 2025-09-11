# Fix-AngularComponents.ps1
# Script per rinominare i file Angular e uniformarli con .component.*

$root = "src\app"

Write-Host "🔍 Scansione della cartella: $root"

# 1. Rinomina i file .ts (solo quelli che non hanno già .component.ts)
Get-ChildItem -Path $root -Recurse -Filter "*.ts" | Where-Object {
    $_.Name -notmatch "\.component\.ts$" -and $_.Name -notmatch "\.module\.ts$" -and $_.Name -notmatch "\.service\.ts$"
} | ForEach-Object {
    $newName = $_.FullName -replace '\.ts$', '.component.ts'
    Rename-Item -Path $_.FullName -NewName $newName -Force
    Write-Host "✅ Rinominato:" $_.FullName "->" $newName
}

# 2. Rinomina i file .html
Get-ChildItem -Path $root -Recurse -Filter "*.html" | Where-Object {
    $_.Name -notmatch "\.component\.html$"
} | ForEach-Object {
    $newName = $_.FullName -replace '\.html$', '.component.html'
    Rename-Item -Path $_.FullName -NewName $newName -Force
    Write-Host "✅ Rinominato:" $_.FullName "->" $newName
}

# 3. Rinomina i file .css e .scss
Get-ChildItem -Path $root -Recurse -Include "*.css","*.scss" | Where-Object {
    $_.Name -notmatch "\.component\.(css|scss)$"
} | ForEach-Object {
    if ($_.Extension -eq ".css") {
        $newName = $_.FullName -replace '\.css$', '.component.css'
    } else {
        $newName = $_.FullName -replace '\.scss$', '.component.scss'
    }
    Rename-Item -Path $_.FullName -NewName $newName -Force
    Write-Host "✅ Rinominato:" $_.FullName "->" $newName
}

# 4. Aggiorna i riferimenti in tutti i .ts
Get-ChildItem -Path $root -Recurse -Filter "*.ts" | ForEach-Object {
    (Get-Content $_.FullName) `
    -replace 'templateUrl:\s*''(.*?)(?<!\.component)\.html''', 'templateUrl: ''$1.component.html''' `
    -replace 'styleUrls:\s*\[\s*''(.*?)(?<!\.component)\.(css|scss)''\s*\]', 'styleUrls: [''$1.component.$2'']' `
    -replace 'from\s+''(.*?)(?<!\.component)''', 'from ''$1.component''' |
    Set-Content $_.FullName -Encoding UTF8
    Write-Host "🔧 Aggiornati i riferimenti in:" $_.FullName
}

Write-Host "🏁 Refactoring completato!"
