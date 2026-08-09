$src = "C:\Users\user\Downloads\interactive-image-editor (1)"
$dst = "C:\Users\user\OneDrive\Desktop\creatorsfree.in\creators-free-website\image-editor-app"
if (-Not (Test-Path $src)) {
    Write-Error "Source not found: $src"
    exit 1
}
if (Test-Path $dst) {
    Write-Output "Destination already exists: $dst"
} else {
    Copy-Item -LiteralPath $src -Destination $dst -Recurse -Force
    Write-Output "Copied to $dst"
}
