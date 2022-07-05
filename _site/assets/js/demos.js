$(document).ready(function() {

    var pid = "doi:10.80240/FK2/HN5ZDN"; // the persistent ID for your dataset
    var baseUrl = "https://demo.borealisdata.ca"; // The domain of your site
    var url = baseUrl + "/api/datasets/:persistentId/?persistentId=" + pid // The url to make a request to

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
        $('#simple-thumb-gallery').append(images.map(im => thumbTemplate(im)));
        $('#viewer-thumb-gallery').append(images.map(im => viewerThumbTemplate(im)));
    }

    function thumbTemplate(image) {
        let fileLink = baseUrl + "/api/access/datafile/" + image.dataFile.id;
        let pageLink = baseUrl + "/file.xhtml?fileId=" + image.dataFile.id;
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

    // Generated via a python script
    var idsAndLinks = [
        { 'fileId': '15173', 'title': 'Aconcagua', 'embedUrl': 'https://zoomhub.net/zayJq' },
        { 'fileId': '15167','title': 'Aoraki', 'embedUrl': 'https://zoomhub.net/p5NJO' },
        { 'fileId': '15172','title': 'Kilimanjaro', 'embedUrl': 'https://zoomhub.net/MVYq5' },
        { 'fileId': '15170', 'title': 'Mont Blanc', 'embedUrl': 'https://zoomhub.net/0wVl5' },
        { 'fileId': '15169', 'title': 'Sagarmatha','embedUrl': 'https://zoomhub.net/NVk0k' },
        { 'fileId': '15171', 'title': 'Tahoma','embedUrl': 'https://zoomhub.net/Zxqrk' }
    ]

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

