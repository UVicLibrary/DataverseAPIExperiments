---
layout: default
---
# Zoom and Pan Image Viewer

<script src="https://zoomhub.net/2aMlm.js?width=750px&height=auto&border=none"></script>
<br/>
1. Visit the Borealis page for the image file you want to embed ([example](https://borealisdata.ca/file.xhtml?fileId=99467&datasetVersionId=19053)).
2. On the "Page Metadata" tab, copy the Download URL. It should look something like this: `https://borealisdata.ca/api/access/datafile/99467`.
3. Go to [Zoomhub.net](https://zoomhub.net/). Click "I have an image link" and paste the Download URL.
4. When Zoomhub is finished processing the image, open the link in your email.
5. Click the "embed" link at the bottom of the page. This will copy the link to your clipboard.
6. Paste it in your HTML or Markdown file. To edit the size of the embedded viewer, change the number after width (e.g. `width=500px`).

<span style="margin-left:2.5rem;">`<script src="https://zoomhub.net/2aMlm.js?width=500px&height=auto&border=none"></script>`</span>

For batches of images, see [Zoomable Viewer for All Images in a Dataset](#zoomable-viewer-for-all-images-in-a-dataset).

# Image Gallery

<div id="simple-thumb-gallery"></div>

1. If JQuery isn't already included in your site, copy/paste the following in your `<head>` tag in your HTML:
  `<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>`
2. Insert an `<div>` in your HTML where you want the images to render:
  `<div id="thumb-gallery"></div>`
3. Copy/paste the following Javascript and
  * replace `[pid]` with your dataset's unique, persistent identifier in Borealis.
  * replace `[base_url]` with `https://borealisdata.ca` (Borealis) or `https://demo.borealisdata.ca` (demo Borealis).

[Example on CodePen](https://codepen.io/eltiffster/pen/rNdadPK) &emsp; <img aria-hidden="true" src="assets/images/play.svg" class="arrow" /><a data-bs-toggle="collapse" role="button" href="#thumb-gallery-code" aria-controls="thumb-gallery-code" aria-expanded="false">Expand/collapse JavaScript</a>

<div class="collapse" id="thumb-gallery-code" markdown=1>
```javascript
$(document).ready(function() {

    var pid = "[pid]"; // the persistent ID for your dataset
    var baseUrl = "[base_url]"; // The domain of the dataverse site
    var url = baseUrl + "/api/datasets/:persistentId/?persistentId=" + pid // The url to make a request to

    // This is a call to the Borealis/Dataverse API to retrieve all datafiles in a dataset
    // See "List Files in a Dataset"
    // https://guides.dataverse.org/en/latest/api/native-api.html
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) { parseImageData(data); }
    });

    function parseImageData(response) {
        let files = response['data']['latestVersion']['files'];
        let arr = [];
        // Filter out everything except image files
        for(file in files) { arr.push(files[file]) }
        let images = arr.filter(file => file.dataFile.contentType.includes("image"));
        console.log(images);
        // generate the HTML for each thumbnail
        $('#thumb-gallery').append(images.map(im => thumbTemplate(im)));
    }

    function thumbTemplate(image) {
        // The streaming link for a file, used to display the image
        let fileLink = baseUrl + "/api/access/datafile/" + image.dataFile.id;
        // The link to that file's page in Borealis
        let pageLink = baseUrl + "/file.xhtml?fileId=" + image.dataFile.id;
        // The file title (taken from Dataverse)
        let title = image.label;
        return [
            '<a class="no-style" href="' + pageLink + '" target="_blank">',
                '<figure>',
                    '<img class="thumb" src="' + fileLink + '" alt="' + image.description + '"/>',
                    '<figcaption>' + title.split(".")[0].replace('_', ' ') + '</figcaption>',
                '</figure>',
            '</a>'
        ].join('\n');
    }

});
```
</div>

# Gallery with Pop-up Viewer

**Note:** If your dataset is mostly image-based, consider using [Wax](https://minicomp.github.io/wax/) or your institution's digital exhibit platform(s) instead (e.g. Omeka, Spotlight).

<div id="viewer-thumb-gallery">
</div>

<div class="modal-script" data-modal-id="modal-15173"><script src="https://zoomhub.net/zayJq.js?width=650px&height=auto&border=none"></script></div>
<div class="modal-script" data-modal-id="modal-15167"><script src="https://zoomhub.net/p5NJO.js?width=650px&height=auto&border=none"></script></div>
<div class="modal-script" data-modal-id="modal-15172"><script src="https://zoomhub.net/MVYq5.js?width=650px&height=auto&border=none"></script></div>
<div class="modal-script" data-modal-id="modal-15170"><script src="https://zoomhub.net/0wVl5.js?width=650px&height=auto&border=none"></script></div>
<div class="modal-script" data-modal-id="modal-15169"><script src="https://zoomhub.net/NVk0k.js?width=650px&height=auto&border=none"></script></div>
<div class="modal-script" data-modal-id="modal-15171"><script src="https://zoomhub.net/Zxqrk.js?width=650px&height=auto&border=none"></script></div>

<div class="modal-container">
</div>

[Example on CodePen](https://codepen.io/eltiffster/pen/MWVaEyZ) &emsp; <img aria-hidden="true" src="assets/images/play.svg" class="arrow" /><a data-bs-toggle="collapse" role="button" href="#viewer-gallery-code-0" aria-controls="thumb-gallery-code" aria-expanded="false">Expand/collapse JavaScript</a>

<div class="collapse" id="viewer-gallery-code-0" markdown=1>
```javascript
$(document).ready(function() {

    var pid = "[pid]"; // the persistent ID for your dataset
    var baseUrl = "[base_url]"; // The domain of the dataverse site
    var url = baseUrl + "/api/datasets/:persistentId/?persistentId=" + pid // The url to make a request to
    var idsAndLinks = [idsAndLinks] // Generated via a python script

    $.ajax({
        url: url,
        type: "GET",
        success: function(data) { parseImageData(data); }
    });

    function parseImageData(response) {
        let files = response['data']['latestVersion']['files'];
        console.log(files);
        let arr = [];
        // Filter that returns only image files
        for(file in files) { arr.push(files[file]) }
        let images = arr.filter(file => file.dataFile.contentType.includes("image"));
        // console.log(images);
        // generate a link and thumbnail to each file
        $('#thumb-gallery').append(images.map(im => viewerThumbTemplate(im)));
    }

    function viewerThumbTemplate(image) {
        let fileLink = baseUrl + "/api/access/datafile/" + image.dataFile.id;
        let pageLink = baseUrl + "/file.xhtml?fileId=" + image.dataFile.id;
        let title = image.label;
        return [
            '<a class="no-style" data-bs-toggle="modal" data-bs-target="#modal-' + image.dataFile.id + '">',
                '<figure>',
                    '<img class="thumb" src="' + fileLink + '" alt="' + image.description + '"/>',
                    '<figcaption>' + title.split(".")[0].replace('_', ' ') + '</figcaption>',
                '</figure>',
            '</a>'
        ].join('\n');
    }

    function viewerModalTemplate(idAndLink) {
        return [
            '<div class="modal fade viewer" id="modal-' + idAndLink.fileId + '" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false" aria-hidden="true">',
                '<div class="modal-dialog">',
                    '<div class="modal-header">',
                        '<h5>' + idAndLink.title + '</h5>',
                        '<a class="modal-link" href="' + (baseUrl + "/api/access/datafile/" + idAndLink.fileId) + '">Download image</a>',
                        '<a class="modal-link" href="' + (baseUrl + "/dataset.xhtml?persistentId=" + pid) + '" target="_blank">See dataset</a>',
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('\n');
    }

    function injectViewer(idAndLink) {
        let modal = $('#modal-' + idAndLink.fileId);
        let viewer = $('[data-modal-id="' + modal.attr('id') + '"]');
        modal.find('.modal-dialog').append(viewer);
    }

    for (index in idsAndLinks) {
        $('.modal-container').append(viewerModalTemplate(idsAndLinks[index]));
        injectViewer(idsAndLinks[index]);
    }

});
```
</div>



## Zoomable Viewer for All Images in a Dataset

We have two options:
1. Upload our images programmatically to Zoomhub using [their API](https://zoomhub.net/#api) (note that you need to request access to upload a large number of files).
2. Use a Python script (or another programming language) to create DZI (Deep Zoom Image) files and then store/serve them from your Github Pages site.

| Option | Pros | Cons |
|---|---|---|
| Zoomhub API | - Don't need to generate or host images yourself, or re-download content from Borealis/Dataverse | - Requires a stable internet connection to Zoomhub<br>- Need to wait for Zoomhub to process your images<br>- No control over whatever happens to Zoomhub (i.e. if Zoomhub disappears, so do your zoomable images) |
| Local Images | - Don't need to worry about Zoomhub going down<br>- Don't need a stable connection to Zoomhub | - Takes some work and time to generate images |  

### Option 1: Zoomhub

#### Upload to Zoomhub

Using Python (or another programming language of your choice), you can 
1. collect/loop through all images in your dataset
2. push their URLs to Zoomhub
3. collect the resulting URLs to use on your site. The result should be a list of dictionaries or JSON objects in this format:
```
[
    { 'fileId': '15173', 'title': 'Aconcagua', 'embedUrl': 'https://zoomhub.net/zayJq' },
    { 'fileId': '15167','title': 'Aoraki', 'embedUrl': 'https://zoomhub.net/p5NJO' },
    { 'fileId': '15172','title': 'Kilimanjaro', 'embedUrl': 'https://zoomhub.net/MVYq5' },
    { 'fileId': '15170', 'title': 'Mont Blanc', 'embedUrl': 'https://zoomhub.net/0wVl5' },
    { 'fileId': '15169', 'title': 'Sagarmatha','embedUrl': 'https://zoomhub.net/NVk0k' },
    { 'fileId': '15171', 'title': 'Tahoma','embedUrl': 'https://zoomhub.net/Zxqrk' }
]
```

You can use the following Python script.
  * replace `[pid]` with your dataset's unique, persistent identifier in Borealis.
  * replace `[base_url]` with `https://borealisdata.ca` (Borealis) or `https://demo.borealisdata.ca` (demo Borealis).
  * replace `[email]` with your email address.

Note that you will need to install [pyDataverse](https://pydataverse.readthedocs.io/en/latest/).

<img aria-hidden="true" src="assets/images/play.svg" class="arrow" /><a data-bs-toggle="collapse" role="button" href="#zoomhub-code" aria-controls="thumb-gallery-code" aria-expanded="false">Expand/collapse Python</a>

<div class="collapse" id="zoomhub-code" markdown=1>
```python
#!/usr/bin/env python3
import requests
import json
from pyDataverse.api import NativeApi

base_url = "[base_url]"
doi = "[pid]"
email = "[email]"

api = NativeApi(base_url)
dataset = api.get_dataset(doi)
files_list = dataset.json()['data']['latestVersion']['files']

ids_links_mapping = []

for file in files_list:
    file_id = file["dataFile"]["id"]
    dict = {}
    file_url = f'{base_url}/api/access/datafile/{file_id}'
    embed_url = requests.get(f'https://api.zoomhub.net/v1/content?url={file_url}&email={email}').json()['embedUrl']
    dict['fileId'] = file_id
    dict['title'] = file['dataFile']['label'].split('.')[0].capitalize()
    dict['embedUrl'] = embed_url
    ids_links_mapping.append(dict)

print(ids_links_mapping)
```
</div>

#### Serve the viewers via HTML and JavaScript

We'll need to write some HTML to embed each viewer. For every viewer we will need the following code:
* on line 1, replace `[fileId]` with the id of the file (you can get this from the python code in the previous step)
* inside the `src` attribute of the `script` tag on line 2:
  * replace `[zoomhubUrl]` with the embedUrl from the previous step
  * replace `[width]` with the desired width of the viewer, for example `650px`.

```html
<div class="modal-script" data-modal-id="modal-[fileId]">
    <script src="[zoomhubUrl].js?width=[width]&height=auto&border=none"></script>
</div>
```

1. If JQuery isn't already included in your site, copy/paste the following in your `<head>` tag:
  ```
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  ```
2. You'll also need to include Bootstrap 5 in `<head>`:
```
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
```
3. Insert a `<div>` in your HTML where you want the images to render:
  `<div id="thumb-gallery"></div>`
4. Insert a container for the generated popups:
  `<div class="modal-container"></div>`
5. Copy/paste the following Javascript and
  * replace `[pid]` with your dataset's unique, persistent identifier in Borealis.
  * replace `[base_url]` with `https://borealisdata.ca` (Borealis) or `https://demo.borealisdata.ca` (demo Borealis).
  * replace `[idsAndLinks]` with the the result from the Python script in the previous step.


[Example on CodePen](https://codepen.io/eltiffster/pen/MWVaEyZ) &emsp; <img aria-hidden="true" src="assets/images/play.svg" class="arrow" /><a data-bs-toggle="collapse" role="button" href="#viewer-gallery-code" aria-controls="thumb-gallery-code" aria-expanded="false">Expand/collapse JavaScript</a>

<div class="collapse" id="viewer-gallery-code" markdown=1>
```javascript
$(document).ready(function() {

    var pid = "[pid]"; // the persistent ID for your dataset
    var baseUrl = "[base_url]"; // The domain of the dataverse site
    var url = baseUrl + "/api/datasets/:persistentId/?persistentId=" + pid // The url to make a request to
    var idsAndLinks = [idsAndLinks] // Generated via a python script

    $.ajax({
        url: url,
        type: "GET",
        success: function(data) { parseImageData(data); }
    });

    function parseImageData(response) {
        let files = response['data']['latestVersion']['files'];
        console.log(files);
        let arr = [];
        // Filter that returns only image files
        for(file in files) { arr.push(files[file]) }
        let images = arr.filter(file => file.dataFile.contentType.includes("image"));
        // console.log(images);
        // generate a link and thumbnail to each file
        $('#thumb-gallery').append(images.map(im => viewerThumbTemplate(im)));
    }

    function viewerThumbTemplate(image) {
        let fileLink = baseUrl + "/api/access/datafile/" + image.dataFile.id;
        let pageLink = baseUrl + "/file.xhtml?fileId=" + image.dataFile.id;
        let title = image.label;
        return [
            '<a class="no-style" data-bs-toggle="modal" data-bs-target="#modal-' + image.dataFile.id + '">',
                '<figure>',
                    '<img class="thumb" src="' + fileLink + '" alt="' + image.description + '"/>',
                    '<figcaption>' + title.split(".")[0].replace('_', ' ') + '</figcaption>',
                '</figure>',
            '</a>'
        ].join('\n');
    }

    function viewerModalTemplate(idAndLink) {
        return [
            '<div class="modal fade viewer" id="modal-' + idAndLink.fileId + '" tabindex="-1" aria-labelledby="exampleModalLabel" data-backdrop="false" aria-hidden="true">',
                '<div class="modal-dialog">',
                    '<div class="modal-header">',
                        '<h5>' + idAndLink.title + '</h5>',
                        '<a class="modal-link" href="' + (baseUrl + "/api/access/datafile/" + idAndLink.fileId) + '">Download image</a>',
                        '<a class="modal-link" href="' + (baseUrl + "/dataset.xhtml?persistentId=" + pid) + '" target="_blank">See dataset</a>',
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('\n');
    }

    function injectViewer(idAndLink) {
        let modal = $('#modal-' + idAndLink.fileId);
        let viewer = $('[data-modal-id="' + modal.attr('id') + '"]');
        modal.find('.modal-dialog').append(viewer);
    }

    for (index in idsAndLinks) {
        $('.modal-container').append(viewerModalTemplate(idsAndLinks[index]));
        injectViewer(idsAndLinks[index]);
    }

});
```
</div>

### Option 2: Generate and host images locally

Here are the general steps for creating zoomable images and viewers that are stored locally:

1. We'll use the [Openseadragon](https://openseadragon.github.io/) viewer. Since it requires a file format called DZI, we need to create DZI files from images using Python or another programming language before pushing them to Github Pages (see this page on [Creating Zooming Images](https://openseadragon.github.io/examples/creating-zooming-images/)).
2. Include the Javascript code needed for Openseadragon.
3. Write some HTML/Javascript code that will include the viewer. See the example is below.

<div id="openseadragon1" style="width: 650px; height: 400px; margin-bottom:1rem;"></div>
<script src="assets/openseadragon/openseadragon.min.js"></script>
<script type="text/javascript">
    var viewer = OpenSeadragon({
        id: "openseadragon1",
        prefixUrl: "assets/openseadragon/images/",
        tileSources: "assets/images/aoraki.dzi"
    });
</script>  

```html
<div id="openseadragon1" style="width: 650px; height: 400px;"></div>
<script src="assets/openseadragon/openseadragon.min.js"></script>
<script type="text/javascript">
    var viewer = OpenSeadragon({
        id: "openseadragon1",
        prefixUrl: "assets/openseadragon/images/",
        tileSources: "assets/images/aoraki.dzi"
    });
</script>
```
