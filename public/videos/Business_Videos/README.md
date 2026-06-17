# ╔══════════════════════════════════════════════════════════════╗
# ║   Business — Video File  (1 video slot)                     ║
# ║   ADST-BiZ-VISUAL ARTS EXHIBITION · MLIA Shenzhen           ║
# ╚══════════════════════════════════════════════════════════════╝

## HOW THE FALLBACK SYSTEM WORKS
  1. Site tries YOUR local file first  → green badge  📁 Local File
  2. If NOT found                      → YouTube plays seamlessly ▶ YouTube
  The page NEVER breaks.

## EXACT FILENAME TO USE  (one file only)
  biz_video_01.mp4        ←  recommended
  biz_video_01.webm       ←  alternative
  biz_video_01.mov        ←  alternative
  (formats tried in that order — first one found is used)

  Title shown on site:  "Business Department Showcase"

## UPDATE YOUR YOUTUBE FALLBACK ID
  Open:   src/data/departments.ts
  Find:   businessVideos
  Change: youtubeId: 'YOUR_REAL_ID_HERE'
  (YouTube URL format: https://www.youtube.com/watch?v=YOUR_REAL_ID_HERE)

## NETLIFY DEPLOYMENT OPTIONS

  OPTION A — Small file (< 50 MB):
    git add public/videos/Business_Videos/biz_video_01.mp4
    git commit -m "Add Business video"
    git push

  OPTION B — Large file via Git LFS:
    git lfs install
    git lfs track "public/videos/**/*.mp4"
    git lfs track "public/videos/**/*.webm"
    git lfs track "public/videos/**/*.mov"
    git add .gitattributes && git commit -m "Track videos with LFS"
    Enable "Netlify Large Media" in your Netlify dashboard.

  OPTION C — YouTube only:
    Update youtubeId in departments.ts → businessVideos. Done.

## ENCODING RECOMMENDATION
  Tool:    HandBrake (free) — https://handbrake.fr
  Preset:  Fast 1080p30  |  MP4  |  H.264  |  AAC 160 kbps
  Target:  Under 80 MB
