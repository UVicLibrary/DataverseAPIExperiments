---
layout: default
---
# Zoom and Pan Image Viewer

## Individual or small number of images

<script src="https://zoomhub.net/2aMlm.js?width=750px&height=auto&border=none"></script>
<br/>
1. Visit the Borealis page for the image file you want to embed ([example](https://borealisdata.ca/file.xhtml?fileId=99467&datasetVersionId=19053)).
2. On the "Page Metadata" tab, copy the Download URL. It should look something like this: `https://borealisdata.ca/api/access/datafile/99467`.
3. Go to [Zoomhub.net](https://zoomhub.net/). Click "I have an image link" and paste the Download URL.
4. When Zoomhub is finished processing the image, open the link in your email.
5. Click the "embed" link at the bottom of the page. This will copy the link to your clipboard.
6. Paste it in your HTML or Markdown file. To edit the size of the embedded viewer, change the value in width (e.g. `width=500px`).

`<script src="https://zoomhub.net/2aMlm.js?width=500px&height=auto&border=none"></script>`

## All images in a dataset

In order to make our images work with the [Openseadragon](https://openseadragon.github.io/) image viewer, we need to create DZI files from our images.
