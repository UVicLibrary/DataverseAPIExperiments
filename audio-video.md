---
layout: no_banner
---

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/css/green-audio-player.min.css">
<script src="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js"></script>

# Audio Player

1. Visit the page for the file you want to include ([example](https://borealisdata.ca/file.xhtml?fileId=223709&version=1.0)).
2. Note the file id in the URL where it says `?fileId=XXXXXXX`. For example, at the above page, the fileId is `223709`.
3. Where indicated in the code below, replace the text with `https://borealisdata.ca/api/access/datafile/` and then the file ID. For example, `https://borealisdata.ca/api/access/datafile/223709`

## Green audio player

<!-- <div class="green-player">
    <audio>
        <source src="https://borealisdata.ca/api/access/datafile/223709" type="audio/x-m4a">
    </audio>
</div> -->
<br/>
```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/css/green-audio-player.min.css">
<script src="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js"></script>
<div class="green-player">
    <audio>
        <source src="[Replace with file link]" type="audio/mpeg">
    </audio>
</div>
```

## Paper audio player

## Other audio players

* [Ableplayer](https://ableplayer.github.io/ableplayer/demos/) - An accessible audio/video player with support for captions and interactive transcripts. Captions and transcripts are generated from [VTT files](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API).
* [Podlove Web Player](https://docs.podlove.org/podlove-web-player/v5/features) - designed for podcasts.

# Audio Playlist from a Dataset

# Audio Gallery

# Video Player